'use client'
import { useWindowScroll } from '@uidotdev/usehooks'
import { Box, type BoxProps, Container } from 'styled-system/jsx'

export const NavbarContainer = (props: BoxProps) => {
  const [{ y }] = useWindowScroll()
  const isScrolled = y && y > 32

  return (
    <Box position="fixed" top="0" width="full" borderBottomWidth="1px">
      <Container
        py="3"
        background="bg.canvas"
        // shadow={isScrolled ? 'xs' : 'none'}
        // borderBottomWidth={{ base: isScrolled ? '0' : '1px', md: '0' }}
        // background={isScrolled ? 'bg.default' : 'bg.canvas'}
        // transitionProperty="background, box-shadow"
        // transitionDuration="normal"
        // transitionTimingFunction="default"
        {...props}
      />
    </Box>
  )
}
