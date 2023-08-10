import type { PropsWithChildren } from 'react'
import { Box, Container, Flex } from 'styled-system/jsx'
import { Sidebar } from '~/components/docs/sidebar'

const DocsLayout = (props: PropsWithChildren) => {
  const { children } = props
  return (
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
        <Sidebar />
      </Flex>
      <Flex flex="1" pl={{ base: 'none', lg: '15rem' }}>
        <Box
          pb={{ base: '12', md: '24' }}
          pl={{ base: 'none', lg: '16' }}
          mt={{ base: '6', md: '35px' }}
          width="full"
        >
          {children}
        </Box>
      </Flex>
    </Container>
  )
}

export default DocsLayout
