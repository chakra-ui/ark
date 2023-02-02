import { MobileNavbar } from '@/components/navigation/navbar/MobileNavbar'
import { MobileSidebarContainer } from '@/components/navigation/sidebar/MobileSidebarContainer'
import { Sidebar } from '@/components/navigation/sidebar/Sidebar'
import { SidebarContainer } from '@/components/navigation/sidebar/SidebarContainer'
import { getComponentDocuments } from '@/lib/contentlayer'
import { Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const {
    params: { framework },
  } = props

  // TODO resolve overview links for framework
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

  return (
    <>
      <MobileNavbar>
        <MobileSidebarContainer>
          <Sidebar entries={[overview, components]} />
        </MobileSidebarContainer>
      </MobileNavbar>
      <Container>
        <Stack gap="8" direction="row" height="100%" position="relative" justify="space-between">
          <SidebarContainer>
            <Sidebar entries={[overview, components]} />
          </SidebarContainer>
          <Stack gap="12" py={{ base: '10', lg: '12' }}>
            <panda.main>{props.children}</panda.main>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default DocsLayout
