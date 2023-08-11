import { Box, Container, Flex } from 'styled-system/jsx'
import { Navbar } from '~/components/layout/navbar'
import { Sidebar } from '~/components/layout/sidebar'

const DocsLayout = (props: any) => {
  const {
    params: { framework },
  } = props

  return (
    <>
      <Navbar framework={framework} />
      <Container flex="1">
        <Flex
          display={{ base: 'none', lg: 'flex' }}
          position="fixed"
          width="60"
          top="16"
          bottom="0"
          pt="10"
          overflowY="auto"
        >
          <Sidebar framework={framework} />
        </Flex>
        <Flex flex="1" pl={{ base: 'none', lg: '15rem' }}>
          <Box
            pb={{ base: '12', md: '24' }}
            pl={{ base: 'none', lg: '16' }}
            mt={{ base: '6', md: '35px' }}
            width="full"
          >
            {props.children}
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default DocsLayout
