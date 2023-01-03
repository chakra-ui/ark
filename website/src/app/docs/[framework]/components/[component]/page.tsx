import { Markdown } from '@/components/Markdown'
import { Footer } from '@/components/navigation/Footer'
import { Table } from '@/components/Table'
import {
  findComponentDocumentByName,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'
import { Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = (props: any) => {
  const { params } = props
  const document = findComponentDocumentByName(params.component)

  if (!document) {
    return notFound()
  }

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)

  // TODO replace with actual props
  const properties = [
    {
      name: 'mutliple',
      type: 'boolean',
      default: 'false',
      description: 'Whether multple accordion items can be open at the same time.',
    },
    {
      name: 'collapsible',
      type: 'boolean',
      default: 'false',
      description: 'Whether an accordion item can be collapsed after it has been opened.',
    },
  ]

  return (
    <Stack gap="10">
      <Table properties={properties} />
      <Markdown markdown={document.body.code} />
      <Footer prevPage={prevDocument} nextPage={nextDocument} />
    </Stack>
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
