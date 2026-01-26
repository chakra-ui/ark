import {
  type ApiDocKey,
  type CssVarDocKey,
  type DataAttrDocKey,
  getApiDoc,
  getCssVarDoc,
  getDataAttrDoc,
} from '@zag-js/docs'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const frameworks = ['react', 'solid', 'vue', 'svelte'] as const

function getFrameworkExtension(framework: string): string {
  if (framework === 'vue') return 'vue'
  if (framework === 'svelte') return 'svelte'
  return 'tsx'
}

function getExamplePath(component: string): string {
  if (['progress-circular', 'progress-linear'].includes(component)) {
    return `components/progress/examples/${component.split('-')[1]}`
  }
  if (['environment', 'locale'].includes(component)) {
    return `providers/${component}/examples`
  }
  return `components/${component}/examples`
}

function readExampleFile(framework: string, component: string, id: string): string | null {
  const extension = getFrameworkExtension(framework)
  const examplePath = getExamplePath(component)
  const srcPath = framework === 'svelte' ? 'src/lib' : 'src'
  const basePath = join(process.cwd(), '..', 'packages', framework, srcPath)
  const filePath = join(basePath, examplePath, `${id}.${extension}`)

  try {
    const content = readFileSync(filePath, 'utf-8')
    return content.replaceAll(/from '\.\/icons'/g, `from 'lucide-react'`).replace(/.*@ts-expect-error.*\n/g, '')
  } catch {
    return null
  }
}

export function replaceExample(text: string, componentFromPath: string): string {
  const matches = text.matchAll(/<Example\s+id="([^"]+)"(?:\s+component="([^"]+)")?\s*\/>/g)

  if (!matches) return text

  for (const match of matches) {
    const id = match[1]
    const component = match[2] || componentFromPath

    if (!component) {
      console.log('[velite] no component for example:', id)
      continue
    }

    const codeBlocks: string[] = []

    for (const framework of frameworks) {
      const code = readExampleFile(framework, component, id)
      if (code) {
        const extension = getFrameworkExtension(framework)
        const frameworkLabel = framework.charAt(0).toUpperCase() + framework.slice(1)
        codeBlocks.push(`#### ${frameworkLabel}\n\n\`\`\`${extension}\n${code}\n\`\`\``)
      }
    }

    if (codeBlocks.length > 0) {
      const replacement = `**Example: ${id}**\n\n${codeBlocks.join('\n\n')}`
      text = text.replace(match[0], replacement)
    } else {
      console.log('[velite] no examples found for:', component, id)
    }
  }

  return text
}

export function replaceComponentTypes(text: string): string {
  const matches = text.matchAll(/<ComponentTypes\s+id="([^"]+)"\s*\/>/g)

  if (!matches) return text

  for (const match of matches) {
    const id = match[1]
    const sections: string[] = []

    for (const framework of frameworks) {
      const typesPath = join(process.cwd(), 'src', 'content', 'types', framework, `${id}.types.json`)

      try {
        const typesContent = readFileSync(typesPath, 'utf-8')
        const typesData = JSON.parse(typesContent)

        const frameworkLabel = framework.charAt(0).toUpperCase() + framework.slice(1)
        const tables: string[] = []

        // Sort to put Root first
        const sortedParts = Object.entries(typesData).sort(([keyA], [keyB]) => {
          if (keyA === 'Root') return -1
          if (keyB === 'Root') return 1
          return 0
        })

        for (const [partName, partData] of sortedParts) {
          const propsEntries = Object.entries((partData as any).props || {})

          if (propsEntries.length > 0) {
            let table = `**${partName} Props:**\n\n`
            table += '| Prop | Type | Required | Description |\n'
            table += '|------|------|----------|-------------|\n'

            for (const [propName, propData] of propsEntries) {
              const data = propData as any
              const required = data.isRequired ? 'Yes' : 'No'
              const description = data.description || ''
              table += `| \`${propName}\` | \`${data.type}\` | ${required} | ${description} |\n`
            }

            tables.push(table)
          }

          // Add data attributes
          try {
            const dataAttrs = getDataAttrDoc(id as DataAttrDocKey)[partName]
            if (dataAttrs && Object.keys(dataAttrs).length > 0) {
              let dataTable = `**${partName} Data Attributes:**\n\n`
              dataTable += '| Attribute | Value |\n'
              dataTable += '|-----------|-------|\n'

              for (const [attr, value] of Object.entries(dataAttrs)) {
                dataTable += `| \`[${attr}]\` | ${value} |\n`
              }

              tables.push(dataTable)
            }
          } catch {
            // No data attributes for this part, skip
          }

          // Add CSS variables
          try {
            const cssVars = getCssVarDoc(id as CssVarDocKey)[partName]
            if (cssVars && Object.keys(cssVars).length > 0) {
              let cssTable = `**${partName} CSS Variables:**\n\n`
              cssTable += '| Variable | Description |\n'
              cssTable += '|----------|-------------|\n'

              for (const [varName, description] of Object.entries(cssVars)) {
                cssTable += `| \`${varName}\` | ${description} |\n`
              }

              tables.push(cssTable)
            }
          } catch {
            // No CSS variables for this part, skip
          }
        }

        if (tables.length > 0) {
          sections.push(`#### ${frameworkLabel}\n\n${tables.join('\n\n')}`)
        }
      } catch {
        // Type file doesn't exist for this framework, skip silently
      }
    }

    if (sections.length > 0) {
      const replacement = `**Component API Reference**\n\n${sections.join('\n\n')}`
      text = text.replace(match[0], replacement)
    }
  }

  return text
}

export function replaceContextType(text: string): string {
  const matches = text.matchAll(/<ContextType\s+id="([^"]+)"\s*\/>/g)

  if (!matches) return text

  for (const match of matches) {
    const id = match[1]

    try {
      const apiDoc = getApiDoc(id as ApiDocKey)

      // Generate API table only
      if (apiDoc.api && Object.keys(apiDoc.api).length > 0) {
        let apiTable = '**API:**\n\n'
        apiTable += '| Property | Type | Description |\n'
        apiTable += '|----------|------|-------------|\n'

        for (const [propName, propData] of Object.entries(apiDoc.api)) {
          const description = propData.description || ''
          apiTable += `| \`${propName}\` | \`${propData.type}\` | ${description} |\n`
        }

        text = text.replace(match[0], apiTable)
      }
    } catch {
      console.log('[velite] no context/api found for:', id)
    }
  }

  return text
}
