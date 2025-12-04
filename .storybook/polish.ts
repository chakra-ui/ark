import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const defaultVariants: Record<string, Record<string, string>> = {
  avatar: {
    size: 'md',
    shape: 'full',
    variant: 'subtle',
  },
  // Add more components here as needed
}

const recipesDir = join(import.meta.dir, 'styles-v2/recipes')

const files = await readdir(recipesDir)

// Convert camelCase to kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// Check if a selector is a base selector (no variant, like .avatar__root)
function isBaseSelector(selector: string): boolean {
  // Matches .component__part but NOT .component__part--variant_value
  return /\.[a-zA-Z][a-zA-Z0-9-]*__[a-zA-Z][a-zA-Z0-9-]*/.test(selector) && !selector.includes('--')
}

// Transform base selector to data-scope/data-part format
function transformBaseSelector(selector: string): string {
  return selector.replace(/\.([a-zA-Z][a-zA-Z0-9-]*)__([a-zA-Z][a-zA-Z0-9-]*)/g, (_match, component, part) => {
    const kebabComponent = toKebabCase(component)
    const kebabPart = toKebabCase(part)
    return `[data-scope="${kebabComponent}"][data-part="${kebabPart}"]`
  })
}

// Check if a selector matches a default variant
function isDefaultVariantSelector(
  selector: string,
  componentName: string,
  defaults: Record<string, string>,
): { isDefault: boolean; part: string } | null {
  // Match pattern like .avatar__root--variant_subtle or .avatar__fallback--size_md
  const variantMatch = selector.match(/\.([a-zA-Z][a-zA-Z0-9-]*)__([a-zA-Z][a-zA-Z0-9-]*)--([a-zA-Z]+)_([a-zA-Z0-9]+)/)

  if (!variantMatch) return null

  const [, component, part, variantType, variantValue] = variantMatch
  const kebabComponent = toKebabCase(component)

  if (kebabComponent !== componentName) return null

  // Check if this matches a default variant
  const defaultValue = defaults[variantType]
  if (defaultValue && defaultValue === variantValue) {
    return { isDefault: true, part: toKebabCase(part) }
  }

  return { isDefault: false, part: toKebabCase(part) }
}

// Check if selector is a variant selector (has --)
function isVariantSelector(selector: string): boolean {
  return /\.[a-zA-Z][a-zA-Z0-9-]*__[a-zA-Z][a-zA-Z0-9-]*--/.test(selector)
}

// Transform default variant selector to data-scope/data-part format
function transformVariantToDataSelector(selector: string): string {
  // Handle pseudo-elements and pseudo-classes in the selector
  // e.g., .avatar__fallback--size_md :where(svg) -> [data-scope="avatar"][data-part="fallback"] :where(svg)
  return selector.replace(
    /\.([a-zA-Z][a-zA-Z0-9-]*)__([a-zA-Z][a-zA-Z0-9-]*)--[a-zA-Z]+_[a-zA-Z0-9]+/g,
    (_match, component, part) => {
      const kebabComponent = toKebabCase(component)
      const kebabPart = toKebabCase(part)
      return `[data-scope="${kebabComponent}"][data-part="${kebabPart}"]`
    },
  )
}

// Process a single CSS file
async function processFile(filePath: string, componentName: string) {
  const content = await Bun.file(filePath).text()
  const defaults = defaultVariants[componentName]

  if (!defaults) {
    console.log(`Skipping ${componentName}: no default variants defined`)
    return
  }

  const lines = content.split('\n')
  const result: string[] = []

  let braceDepth = 0
  let skipUntilBraceDepth = -1 // -1 means not skipping

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Count braces to track nesting depth
    const openBraces = (line.match(/\{/g) || []).length
    const closeBraces = (line.match(/\}/g) || []).length

    // Check if we're currently skipping a block
    if (skipUntilBraceDepth >= 0) {
      braceDepth += openBraces - closeBraces
      if (braceDepth <= skipUntilBraceDepth) {
        skipUntilBraceDepth = -1 // Stop skipping
      }
      continue // Skip this line
    }

    // Check if this line starts a new rule block (has a selector followed by {)
    const selectorMatch = line.match(/^\s*([^{}]+)\{/)

    if (selectorMatch && openBraces > 0) {
      const selector = selectorMatch[1].trim()

      // Always keep @layer declarations
      if (selector.startsWith('@layer')) {
        result.push(line)
        braceDepth += openBraces - closeBraces
        continue
      }

      // Check what kind of selector this is
      if (isVariantSelector(selector)) {
        // It's a variant selector - check if it matches default
        const check = isDefaultVariantSelector(selector, componentName, defaults)
        if (check?.isDefault) {
          // Transform and keep default variant selectors
          const transformedSelector = transformVariantToDataSelector(selector)
          result.push(line.replace(selector, transformedSelector))
          braceDepth += openBraces - closeBraces
        } else {
          // Skip non-default variant selectors
          skipUntilBraceDepth = braceDepth
          braceDepth += openBraces - closeBraces
        }
      } else if (isBaseSelector(selector)) {
        // Transform base selectors like .avatar__root to [data-scope][data-part]
        const transformedSelector = transformBaseSelector(selector)
        result.push(line.replace(selector, transformedSelector))
        braceDepth += openBraces - closeBraces
      } else {
        // Keep other selectors as-is
        result.push(line)
        braceDepth += openBraces - closeBraces
      }
    } else {
      // Not a selector line, just keep it
      result.push(line)
      braceDepth += openBraces - closeBraces
    }
  }

  // Clean up multiple consecutive empty lines
  const cleaned = result.join('\n').replace(/\n{3,}/g, '\n\n')

  await Bun.write(filePath, cleaned)
  console.log(`Processed: ${componentName}.css`)
}

// Main execution
for (const file of files) {
  if (!file.endsWith('.css')) continue

  const componentName = file.replace('.css', '')
  const filePath = join(recipesDir, file)

  await processFile(filePath, componentName)
}

console.log(`\nDone! Processed ${files.filter((f) => f.endsWith('.css')).length} files.`)
