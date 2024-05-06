import { Box, Divider, HStack, styled } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'

export const Navbar = () => {
  return (
    <HStack justifyContent="space-between" h="16" ps="8">
      <Box>Search</Box>
      <HStack gap="4">
        <HStack gap="6">
          <styled.a color="fg.muted" fontWeight="medium" textStyle="sm" href="/">
            Examples
          </styled.a>
          <styled.a color="fg.muted" fontWeight="medium" textStyle="sm" href="/">
            Roadmap
          </styled.a>
        </HStack>

        <Divider orientation="vertical" height="6" />
        <ColorModeButton />
        <Divider orientation="vertical" height="6" />
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
