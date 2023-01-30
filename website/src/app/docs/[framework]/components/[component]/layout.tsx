import { TableOfContent } from '@/components/docs/TableOfContent'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { Footer } from '@/components/navigation/Footer'
import { Sidebar } from '@/components/navigation/Sidebar'
import { PageHeader } from '@/components/shared/PageHeader'
import {
  findComponentDocumentByFrameworkAndId,
  findNextComponentDocument,
  findPreviousComponentDocument,
  getComponentDocuments,
} from '@/lib/contentlayer'
import { Box, Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const { params } = props
  const { framework, component } = params

  const document = findComponentDocumentByFrameworkAndId(framework, component)
  if (!document) return null

  const sidebarItems = getComponentDocuments(framework).map((doc) => ({
    name: doc.name,
    route: doc.route,
  }))

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)
  const pathName = `/docs/${framework}/components/${component}`

  return (
    <Container>
      <Stack gap="8" direction="row" height="100%" position="relative">
        <Sidebar framework={framework} items={sidebarItems} activePath={pathName} />
        <panda.main flex="1" overflow="hidden" py="12">
          <Stack direction="row" gap="16" flex="1" justifyContent="flex-end">
            <Box flex="1" maxW={{ base: 'unset', lg: '3xl' }}>
              <Stack gap="12">
                <PageHeader
                  subHeading="Component"
                  heading={document.name}
                  supportingText={document.description}
                />
                <ComponentTabs basePath={pathName} />
                <Box>{props.children}</Box>
                <Footer prevPage={prevDocument} nextPage={nextDocument} />
              </Stack>
            </Box>
            <TableOfContent entries={document.toc} />
          </Stack>
        </panda.main>
      </Stack>
    </Container>
  )
}

export default DocsLayout
