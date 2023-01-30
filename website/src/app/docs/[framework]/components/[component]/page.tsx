import { ComponentAPIReference } from '@/components/docs/ComponentAPIReference'
import { Markdown } from '@/components/docs/Markdown'
import { Playground } from '@/components/docs/Playground'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { Footer } from '@/components/navigation/Footer'
import { Text } from '@/components/shared/Text'
import {
  findComponentDocumentByFrameworkAndId,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'
import { Box, panda, Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = async (props: any) => {
  const { params } = props
  const document = findComponentDocumentByFrameworkAndId(params.framework, params.component)

  if (!document) {
    return notFound()
  }

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)

  return (
    <Stack direction="row" gap="16" flex="1" justifyContent="flex-end">
      <Box flex="1" maxW={{ base: 'unset', lg: '3xl' }}>
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
          <ComponentTabs
            playground={<Playground component={document.id} />}
            overview={<Markdown markdown={document.body.code} />}
            properties={
              <ComponentAPIReference componentName={document.name} types={document.types} />
            }
          />
          <Footer prevPage={prevDocument} nextPage={nextDocument} />
        </Stack>
      </Box>
      <TableOfContent entries={document.toc} />
    </Stack>
  )
}

export default Page

export const generateStaticParams = () => {
  const frameworks = ['react', 'solid', 'vue']
  return frameworks.flatMap((framework) =>
    getComponentDocuments(framework).map((component) => ({
      framework,
      component: component.id,
    })),
  )
}
