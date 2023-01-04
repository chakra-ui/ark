import { Markdown } from '@/components/Markdown'
import { Footer } from '@/components/navigation/Footer'
import { Styleguide } from '@/components/Styleguide'
import {
  findComponentDocumentByName,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'
import { notFound } from 'next/navigation'

const Page = (props: any) => {
  const { params } = props
  const document = findComponentDocumentByName(params.component)

  if (!document) {
    return notFound()
  }

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)

  return (
    <>
      <Markdown markdown={document.body.code} />
      <Styleguide component={params.component} />
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
