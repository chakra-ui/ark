import { allComponentDocuments } from '@/contentlayer'
import { panda } from '@/panda/jsx'
import { markdown } from '@/panda/recipes'

const Page = (props) => {
  const { params } = props
  const document = allComponentDocuments.find((document) => document.name === params.component)

  return (
    <panda.article
      className={markdown()}
      dangerouslySetInnerHTML={{ __html: document.body.html }}
    />
  )
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
