interface Props {
  component: string
  framework: string
  id: string
}

export const fetchExample = async (props: Props) => {
  const { component, framework, id } = props
  const sourceFiles = await fetch(
    `http://localhost:3001/api/${framework}/examples/${component}/${id}`,
    {
      headers: {
        Authorization: 'Basic YWRtaW46YWRtaW4=',
      },
    },
  ).then((res) => res.json())

  //   const html = await codeToHtml(code, {
  //     lang: 'tsx',
  //     theme: 'github-dark-default',
  //   })

  return [
    {
      label: 'index.tsx',
      value: 'index.tsx',
      code: '<div>hi</div>',
      html: '<div>hi</div>',
    },
  ]
}
