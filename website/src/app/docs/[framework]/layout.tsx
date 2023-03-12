import { ColorModeButton } from '@/components/navigation/navbar/ColorModeButton'
import { Logo } from '@/components/navigation/navbar/Logo'
import { MobileNavbar } from '@/components/navigation/navbar/MobileNavbar'
import { MobileSidebarContainer } from '@/components/navigation/sidebar/MobileSidebarContainer'
import { Sidebar } from '@/components/navigation/sidebar/Sidebar'
import { IconButton } from '@/components/shared/IconButton'
import { Link } from '@/components/shared/Link'
import { getComponentDocuments, getGeneralDocuments } from '@/lib/contentlayer'
import { Box, Container, Flex, HStack, Stack } from '@/panda/jsx'
import { RiGithubFill } from 'react-icons/ri'

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
      <Box bg="bg.canvas" position="sticky" top="0" borderBottomWidth="1px" zIndex={10}>
        <Container>
          <Stack direction="row" align="center" h="16" justify="space-between">
            <Link href="/" aria-label="Back home">
              <Logo />
            </Link>
            <HStack gap="1">
              <Link target="_blank" href="https://github.com/chakra-ui/ark">
                <IconButton
                  size="sm"
                  variant="tertiary"
                  icon={<RiGithubFill />}
                  aria-label="GitHub"
                />
              </Link>
              <ColorModeButton />
            </HStack>
          </Stack>
        </Container>
      </Box>
      <MobileNavbar>
        <MobileSidebarContainer>
          <Sidebar entries={[overview, components]} />
        </MobileSidebarContainer>
      </MobileNavbar>
      <Container flex="1">
        <Flex
          display={{ base: 'none', lg: 'flex' }}
          position="fixed"
          width="15rem"
          top="16"
          bottom="0"
          overflowY="auto"
          py="8"
        >
          <Sidebar entries={[overview, components]} />
        </Flex>
        <Flex flex="1" pl={{ base: 'none', lg: '15rem' }}>
          <Box pt="8" pl={{ base: 'none', lg: '16' }}>
            {props.children}
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default DocsLayout
