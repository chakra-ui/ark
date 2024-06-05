import { getHighlighter } from 'shiki'

export interface Example {
  id: string
  title: string
  description: string
  previewUrl: string
  category: string
  relatedComponents: string[]
  relatedExamples: Example[]
  accessLevel: 'free' | 'paid'
}

export interface SourceFile {
  name: string
  content: string
}

export interface ExampleGroup {
  id: string
  title: string
  items: Example[]
}

const { ARK_PLUS_API_KEY, ARK_PLUS_URL } = process.env

export const fetchExamples = async (): Promise<Example[]> => {
  const examples = await fetch(`${ARK_PLUS_URL}/api/examples`, {
    cache: 'no-cache',
    headers: {
      Authorization: ARK_PLUS_API_KEY,
    },
  })
    .then((res) => res.json())
    .catch(() => [])

  return examples
}

export const fetchExample = async (id: string): Promise<Example> => {
  const example: Example = await fetch(`${ARK_PLUS_URL}/api/examples/${id}`, {
    headers: {
      Authorization: ARK_PLUS_API_KEY,
    },
    cache: 'no-cache',
  }).then((res) => res.json())

  return {
    ...example,
    previewUrl: [ARK_PLUS_URL, example.previewUrl].join(''),
  }
}

interface CodeExample {
  label: string
  value: string
  code: string
  html: string
}

interface FetchCodeExamplesParams {
  id: string
  framework: string
}

const highlighter = await getHighlighter({
  themes: ['github-dark-default'],
  langs: ['tsx', 'vue'],
})

export const fetchCodeExamples = async (props: FetchCodeExamplesParams): Promise<CodeExample[]> => {
  const { id, framework } = props
  const sources: SourceFile[] = await fetch(
    `${ARK_PLUS_URL}/api/examples/${id}/sources/${framework}`,
    {
      headers: {
        Authorization: ARK_PLUS_API_KEY,
      },
      cache: 'no-cache',
    },
  ).then((res) => res.json())

  return sources.map((source) => ({
    value: source.name,
    label: source.name,
    code: source.content,
    html: highlighter.codeToHtml(source.content, {
      lang: framework === 'vue' ? 'vue' : 'tsx',
      theme: 'github-dark-default',
    }),
  }))
}

export const fetchExamplesGroupedByCategory = async (): Promise<ExampleGroup[]> => {
  const examples = await fetchExamples()
  return examples
    .reduce(
      (acc, example) => {
        const group = acc.find((group) => group.id === example.category)
        if (group) {
          group.items.push(example)
        } else {
          acc.push({ id: example.category, title: example.category, items: [example] })
        }
        return acc
      },
      [] as { id: string; title: string; items: Example[] }[],
    )
    .sort((a, b) => a.title.localeCompare(b.title))
}
