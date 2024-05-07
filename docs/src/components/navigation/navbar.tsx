import { SiGithub } from '@icons-pack/react-simple-icons'
import { Box, Divider, HStack } from 'styled-system/jsx'
import { ColorModeButton } from '~/components/color-mode-button'
import { FrameworkSelect } from '../framework-select'
import { Logo } from '../logo'
import { IconButton } from '../ui'

export const Navbar = () => {
  return (
    <HStack justifyContent="space-between" h="16" px={{ base: '4', md: '8' }}>
      <Box>
        <Logo display={{ md: 'none' }} />
      </Box>
      <HStack gap="3">
        <FrameworkSelect />
        <Divider orientation="vertical" h="6" />
        <HStack gap="1">
          <ColorModeButton />
          <IconButton asChild variant="ghost">
            <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
              <SiGithub />
            </a>
          </IconButton>
        </HStack>
      </HStack>
    </HStack>
  )
}
