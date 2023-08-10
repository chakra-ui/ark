import { type PropsWithChildren } from 'react'
import { Box, Container, HStack } from 'styled-system/jsx'
import { Breadcrumbs } from './breadcrumbs'

export const MobileNavbar = (props: PropsWithChildren) => {
  return (
    <Box borderBottomWidth="1px" display={{ base: 'block', lg: 'none' }}>
      <Container py="1">
        <HStack gap="2">
          {props.children}
          <Breadcrumbs />
        </HStack>
      </Container>
    </Box>
  )
}
