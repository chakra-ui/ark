import { Box, type BoxProps, Container } from 'styled-system/jsx'

export const NavbarContainer = (props: BoxProps) => {
  return (
    <Box
      position="fixed"
      top="0"
      width="full"
      background="bg.canvas"
      zIndex="1"
      borderBottomWidth="1px"
      borderColor={{ base: 'border.subtle', _dark: 'black' }}
    >
      <Container py="3" {...props} />
    </Box>
  )
}
