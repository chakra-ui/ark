'use client'
import { useWindowScroll } from '@uidotdev/usehooks'
import { Box, type BoxProps } from 'styled-system/jsx'

export const NavbarContainer = (props: BoxProps) => {
  const [{ y }] = useWindowScroll()
  const isScrolled = y && y > 32

  return (
    <Box
      shadow={isScrolled ? 'xs' : 'none'}
      transitionProperty="box-shadow"
      transitionDuration="normal"
      transitionTimingFunction="default"
      {...props}
    />
  )
}
