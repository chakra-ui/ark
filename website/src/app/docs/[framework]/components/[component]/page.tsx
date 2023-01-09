import { ComponentAPIReference } from '@/components/docs/ComponentAPIReference'
import { Markdown } from '@/components/docs/Markdown'
import { Playground } from '@/components/docs/Playground'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { Footer } from '@/components/navigation/Footer'
import { Text } from '@/components/shared/Text'
import {
  findComponentDocumentById,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'
import { Box, panda, Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = async (props: any) => {
  const { params } = props
  const document = findComponentDocumentById(params.component)

  if (!document) {
    return notFound()
  }

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)

  return (
    <Stack gap="12">
      <Stack gap="5">
        <Stack gap="3">
          <Text color="accent.default" fontWeight="semibold" textStyle="sm">
            Component
          </Text>
          <panda.h1 textStyle="3xl" fontWeight="semibold">
            {document.name}
          </panda.h1>
        </Stack>
        <Text color="fg.muted" textStyle="md" lineHeight="relaxed" maxW="xl">
          {document.description}
        </Text>
      </Stack>
      <Stack direction="row" gap="24" width="full">
        <Box maxWidth={{ xl: '43rem' }}>
          <ComponentTabs
            playground={<Playground component={document.id} />}
            overview={<Markdown markdown={document.body.code} />}
            properties={
              <ComponentAPIReference componentName={document.name} types={document.types} />
            }
          />
        </Box>
        <TableOfContent />
      </Stack>
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
      component: component.id,
    })),
  )
}
