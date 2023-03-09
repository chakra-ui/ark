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
      <Box
        height="14"
        backdropFilter="blur(10px)"
        position="sticky"
        top="0"
        zIndex={10}
        borderBottomWidth="1px"
      >
        <Container>
          <Stack direction="row" align="center" h="14" justify="space-between">
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
          width="250px"
          top="14"
          bottom="0px"
          overflowY="auto"
          pt="8"
        >
          <Sidebar entries={[overview, components]} />
        </Flex>
        <Flex flex="1" pl={{ base: 'none', lg: '250px' }} pt="8">
          {props.children}
        </Flex>
        <Flex
          display={{ base: 'none', xl: 'flex' }}
          position="fixed"
          width="250px"
          top="14"
          pt="8"
          bottom="0px"
          right="max(0px, calc(100vw / 2 - 640px))"
        ></Flex>
      </Container>
    </>
  )
}

export default DocsLayout
