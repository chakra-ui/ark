import { TableOfContent } from '@/components/docs/TableOfContent'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { Footer } from '@/components/navigation/Footer'
import { MobileNavbar } from '@/components/navigation/navbar/MobileNavbar'
import { MobileSidebarContainer } from '@/components/navigation/sidebar/MobileSidebarContainer'
import { Sidebar } from '@/components/navigation/sidebar/Sidebar'
import { SidebarContainer } from '@/components/navigation/sidebar/SidebarContainer'
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

  const overview = {
    heading: 'Overview',
    items: [
      { href: '/docs/react/overview/introduction', label: 'Introduction' },
      { href: '/docs/react/overview/getting-started', label: 'Getting started' },
      { href: '/docs/react/overview/styling', label: 'Styling' },
      { href: '/docs/react/overview/changelog', label: 'Changelog' },
    ],
  }

  const components = {
    heading: 'Components',
    items: getComponentDocuments(framework).map((doc) => ({
      label: doc.name,
      href: doc.route,
    })),
  }

  const prevDocument = findPreviousComponentDocument(document)
  const nextDocument = findNextComponentDocument(document)
  const pathName = `/docs/${framework}/components/${component}`

  return (
    <>
      <MobileNavbar>
        <MobileSidebarContainer>
          <Sidebar entries={[overview, components]} />
        </MobileSidebarContainer>
      </MobileNavbar>
      <Container>
        <Stack gap="8" direction="row" height="100%" position="relative">
          <SidebarContainer>
            <Sidebar entries={[overview, components]} />
          </SidebarContainer>
          <panda.main flex="1" overflow="hidden" py="12">
            <Stack direction="row" gap="16" flex="1" justifyContent="flex-end">
              <Box flex="1" maxW={{ base: 'unset', lg: '3xl' }}>
                <Stack gap="12" alignItems="stretch">
                  <PageHeader
                    subHeading="Component"
                    heading={document.name}
                    supportingText={document.description}
                  />
                  <ComponentTabs basePath={pathName} />
                  {props.children}
                  <Footer prevPage={prevDocument} nextPage={nextDocument} />
                </Stack>
              </Box>
              <TableOfContent entries={document.toc} />
            </Stack>
          </panda.main>
        </Stack>
      </Container>
    </>
  )
}

export default DocsLayout
