import { MobileNavbar } from '@/components/navigation/navbar/MobileNavbar'
import { MobileSidebarContainer } from '@/components/navigation/sidebar/MobileSidebarContainer'
import { Sidebar } from '@/components/navigation/sidebar/Sidebar'
import { SidebarContainer } from '@/components/navigation/sidebar/SidebarContainer'
import { getComponentDocuments, getGeneralDocuments } from '@/lib/contentlayer'
import { Container, panda, Stack } from '@/panda/jsx'

const DocsLayout = (props: any) => {
  const {
    params: { framework },
  } = props

  const overview = {
    heading: 'Overview',
    items: getGeneralDocuments(framework).map((doc) => ({
      label: doc.name,
      href: doc.route,
    })),
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
          <panda.main py={{ base: '10', lg: '12' }} flex={1}>
            {props.children}
          </panda.main>
        </Stack>
      </Container>
    </>
  )
}

export default DocsLayout
