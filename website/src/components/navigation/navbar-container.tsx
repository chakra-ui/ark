import { type BoxProps, Container, Flex } from 'styled-system/jsx'

export const NavbarContainer = (props: BoxProps) => {
  return (
    <Flex
      alignItems="center"
      position="fixed"
      top="0"
      width="full"
      minH="var(--navbar-height, 4rem)"
      bg="bg.canvas"
      zIndex="20"
      borderBottomWidth="1px"
      borderColor={{ _light: 'border.subtle', _dark: 'black' }}
      pe="var(--scrollbar-width, 0)"
    >
      <Container py="2.5" {...props} />
    </Flex>
  )
}
