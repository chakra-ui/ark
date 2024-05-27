import { getHighlighter } from 'shiki'

interface Props {
  component: string
  framework: string
  id: string
}

const highlighter = await getHighlighter({
  themes: ['github-dark-default'],
  langs: ['tsx'],
})

export const fetchExample = async (props: Props) => {
  const { component, framework, id } = props
  const sources = await fetch(
    `http://localhost:3001/api/${framework}/examples/${component}/${id}`,
    {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    },
  ).then((res) => res.json())

  // @ts-expect-error
  return sources.map((source) => ({
    value: source.name,
    label: source.name,
    code: source.content,
    html: highlighter.codeToHtml(source.content, {
      lang: 'tsx',
      theme: 'github-dark-default',
    }),
  }))
}
