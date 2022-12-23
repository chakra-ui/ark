import { Markdown } from '@/components/Markdown'
import { Footer } from '@/components/navigation/Footer'
import {
  findComponentDocumentByName,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'

const Page = (props) => {
  const { params } = props
  const document = findComponentDocumentByName(params.component)

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)

  return (
    <>
      <Markdown markdown={document.body.code} />
      <Footer prevPage={prevDocument} nextPage={nextDocument} />
    </>
  )
}

export default Page

export const generateStaticParams = () => {
  const frameworks = ['react', 'solid', 'vue']
  return getComponentDocuments().flatMap((component) =>
    frameworks.map((framework) => ({
      framework,
      component: component.name,
    })),
  )
}
