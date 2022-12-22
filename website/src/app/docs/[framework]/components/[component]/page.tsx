import { Markdown } from '@/components/Markdown'
import { allComponentDocuments } from '@/contentlayer'

const Page = (props) => {
  const { params } = props
  const document = allComponentDocuments.find((document) => document.name === params.component)

  return <Markdown markdown={document.body.code} />
}

export default Page

export const generateStaticParams = () => {
  const frameworks = ['react', 'solid', 'vue']
  return allComponentDocuments.flatMap((component) =>
    frameworks.map((framework) => ({
      framework,
      component: component.name,
    })),
  )
}
