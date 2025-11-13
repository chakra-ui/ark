import { type AccessibilityDocKey, type DataAttrDocKey, getAccessibilityDoc, getDataAttrDoc } from '@zag-js/docs'
import { frameworkExample } from '~/components/example'
import { cmdMap } from '~/components/install-cmd'
import type { Page } from '~/lib/source'
import { types } from '@/.source'

// Constants for regex patterns
const PATTERNS = {
  EXAMPLE: /<Example\s+(?:(?:id="[^"]*"|component="[^"]*")\s*)+\s*\/>/g,
  EXAMPLE_ID: /id="([^"]*)"/,
  EXAMPLE_COMPONENT: /component="([^"]*)"/,
  ANATOMY: /<Anatomy\s+id="[^"]*"\s*\/>/g,
  COMPONENT_PREVIEW: /<ComponentPreview\s+id="[^"]*"\s*\/>/g,
  FAQ: /## FAQ\s*<Faq\s*\/>/g,
  IMAGES: /\/images/g,
} as const

// Quick links and templates
const TEMPLATES = {
  NEXTJS: 'https://stackblitz.com/edit/github-qcm2dskf',
  SOLID: 'https://stackblitz.com/edit/github-1hgkbbln',
  NUXT: 'https://stackblitz.com/edit/github-s3sg6syq',
} as const

// Component replacement functions
const replaceQuickstart = () =>
  [
    `- [Next.js Template](${TEMPLATES.NEXTJS})`,
    `- [Solid Start Template](${TEMPLATES.SOLID})`,
    `- [Nuxt Template](${TEMPLATES.NUXT})`,
  ].join('\n')

const replaceInstallCmd = (framework: string) =>
  [
    '```bash',
    Object.values(cmdMap)
      .map((cmd) => `${cmd} @ark-ui/${framework}`)
      .join('\n// or\n'),
    '```',
  ].join('\n')

// Accessibility documentation
const replaceKeyboardTable = (id: string) => {
  try {
    const keyboardDoc = getAccessibilityDoc(id as AccessibilityDocKey)
    return keyboardDoc.keyboard
      .map((item) => {
        return [`**\`${item.keys.join(' + ')}\`**`, `Description: ${item.description}`].join('\n')
      })
      .join('\n\n')
  } catch {
    return ''
  }
}

type Part = (typeof types)[number]['parts'][keyof (typeof types)[number]['parts']]

// Component type formatting
const formatPropTypes = (props: NonNullable<Part['props']>) =>
  Object.entries(props ?? {}).map(([propName, propDetails]) =>
    [
      `**\`${propName}\`**`,
      `Type: \`${propDetails.type}\``,
      `Required: ${propDetails.isRequired ? 'true' : 'false'}`,
      `Default Value: \`${propDetails.defaultValue}\``,
      `Description: ${propDetails.description}`,
    ].join('\n'),
  )

const formatEmitTypes = (emits: NonNullable<Part['emits']>) =>
  Object.entries(emits ?? {}).map(([emitName, emitDetails]) =>
    [`**\`${emitName}\`**`, `Type: \`${emitDetails.type}\``, `Description: ${emitDetails.description}`].join('\n'),
  )

const formatDataAttributes = (key: string, id: string) => {
  try {
    const dataAttrDoc = getDataAttrDoc(id as DataAttrDocKey)
    const dataAttrForPart = dataAttrDoc[key as DataAttrDocKey]
    return Object.entries(dataAttrForPart)
      .map(([key, value]) => `**\`${key}\`**: ${value}`)
      .join('\n')
  } catch {
    return ''
  }
}

const formatComponentType = (key: string, part: Part, id: string) => {
  const lines = [`### ${key}`, '#### Props', ...formatPropTypes(part.props)]

  if (part.emits) {
    lines.push('#### Emits', ...formatEmitTypes(part.emits))
  }

  const dataAttrItems = formatDataAttributes(key, id)
  if (dataAttrItems) {
    lines.push('#### Data Attributes', dataAttrItems)
  }

  return lines.join('\n\n')
}

const replaceComponentTypes = (id: string, framework: string) => {
  const api = types.find((type) => type.component === id && type.framework === framework)
  if (!api) return ''

  return Object.entries(api.parts)
    .sort(([key]) => (key === 'Root' ? -1 : 1))
    .map(([key, part]) => formatComponentType(key, part, id))
    .join('\n\n')
}

const replaceExamples = async (content: string, page: Page, framework: string) => {
  const examples = content.match(PATTERNS.EXAMPLE) || []
  let res = content

  for (const example of examples) {
    const idMatch = example.match(PATTERNS.EXAMPLE_ID)
    const componentMatch = example.match(PATTERNS.EXAMPLE_COMPONENT)

    const id = idMatch?.[1]
    if (!id) continue

    const component = componentMatch?.[1] || page.slugs[1]
    const { code, extension } = await frameworkExample(framework, component, id)
    res = res.replace(example, `\`\`\`${extension}\n${code}\`\`\``)
  }

  return res
}

export const cleanupPageContent = async (page: Page, framework: 'react' | 'solid' | 'vue' | 'svelte') => {
  if (!page.data.llm) return ''
  let res = page.data.llm

  // Remove unwanted components
  res = res.replace(PATTERNS.ANATOMY, '')
  res = res.replace(PATTERNS.COMPONENT_PREVIEW, '')
  res = res.replace(PATTERNS.FAQ, '')
  res = res.replace(PATTERNS.IMAGES, 'https://ark-ui.com/images')

  // Replace components with their content
  res = res.replace(/<Quickstart\s*\/>/g, replaceQuickstart())
  res = res.replace(/<InstallCmd\s*\/>/g, replaceInstallCmd(framework))
  res = res.replace(/<KeyBindingsTable\s+id="([^"]*)"\s*\/>/g, (_, id) => replaceKeyboardTable(id))
  res = res.replace(/<ComponentTypes\s+id="([^"]*)"\s*\/>/g, (_, id) => replaceComponentTypes(id, framework))

  res = await replaceExamples(res, page, framework)

  return res
}
