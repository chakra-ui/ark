import { getHighlighter } from 'shiki'

interface Props {
  component: string
  framework: string
  id: string
}

const highlighter = await getHighlighter({
  themes: ['github-dark-default'],
  langs: ['tsx', 'vue'],
})

const { ARK_PLUS_API_KEY, ARK_PLUS_URL } = process.env

export const fetchExample = async (props: Props) => {
  const { component, framework, id } = props
  const sources = await fetch(`${ARK_PLUS_URL}/api/${framework}/examples/${component}/${id}`, {
    headers: {
      Authorization: ARK_PLUS_API_KEY,
    },
    cache: 'no-cache',
  }).then((res) => res.json())

  // @ts-expect-error
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
