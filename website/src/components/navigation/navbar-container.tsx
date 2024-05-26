import { type BoxProps, Container, Flex } from 'styled-system/jsx'

export const NavbarContainer = (props: BoxProps) => {
  return (
    <Flex
      alignItems="center"
      position="fixed"
      top="0"
      width="full"
      background="bg.canvas"
      zIndex="1"
      borderBottomWidth="1px"
      borderColor={{ base: 'border.subtle', _dark: 'black' }}
    >
      <Container py="2.5" {...props} />
    </Flex>
  )
}
