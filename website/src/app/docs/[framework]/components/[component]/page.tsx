import { Markdown } from '@/components/Markdown'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { Footer } from '@/components/navigation/Footer'
import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { Showcase } from '@/components/Showcase'
import {
  findComponentDocumentById,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'
import { Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = (props: any) => {
  const { params } = props
  const document = findComponentDocumentById(params.component)

  if (!document) {
    return notFound()
  }

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)

  return (
    <>
      <Stack gap="10">
        <Stack gap="5">
          <Stack gap="3">
            <Text color="accent.default" fontWeight="semibold" textStyle="sm">
              Component
            </Text>
            <Heading as="h1" textStyle="3xl" fontWeight="semibold">
              {document.name}
            </Heading>
          </Stack>
          <Text color="fg.muted" textStyle="md">
            {document.description}
          </Text>
        </Stack>
        <ComponentTabs
          // @ts-expect-error either use a string or cast the document id @tim
          showcase={<Showcase preset={document.id} />}
          overview={<Markdown markdown={document.body.code} />}
        />
      </Stack>
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
      component: component.id,
    })),
  )
}
