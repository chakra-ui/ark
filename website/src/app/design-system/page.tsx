import { ColorModeButton } from '@/components/navigation/navbar/ColorModeButton'
import { Button } from '@/components/shared/Button'
import { IconButton } from '@/components/shared/IconButton'
import { Box, Flex, panda, Stack } from '@/panda/jsx'
import { FiCircle } from 'react-icons/fi'

export default function Page() {
  return (
    <>
      <ControlBar />
      <Box py={{ base: '12', md: '24' }} px={{ base: '4', md: '6' }}>
        <Stack gap="12">
          <Buttons />
          <IconButtons />
        </Stack>
      </Box>
    </>
  )
}

const ControlBar = () => (
  <panda.nav role="navigation" position="sticky" top="0" zIndex={100} py="4">
    <Flex justify="center" align="center">
      <ColorModeButton />
    </Flex>
  </panda.nav>
)

const Buttons = () => (
  <Stack direction="row" gap="8">
    <Button size="xs" leftIcon={<FiCircle />} rightIcon={<FiCircle />}>
      Button
    </Button>
    <Button size="sm" leftIcon={<FiCircle />} rightIcon={<FiCircle />}>
      Button
    </Button>
    <Button size="md" leftIcon={<FiCircle />} rightIcon={<FiCircle />}>
      Button
    </Button>
    <Button size="lg" leftIcon={<FiCircle />} rightIcon={<FiCircle />}>
      Button
    </Button>
    <Button size="xl" leftIcon={<FiCircle />} rightIcon={<FiCircle />}>
      Button
    </Button>
    <Button size="2xl" leftIcon={<FiCircle />} rightIcon={<FiCircle />}>
      Button
    </Button>
  </Stack>
)

const IconButtons = () => (
  <Stack direction="row" gap="8">
    <IconButton variant="tertiary" size="xs" icon={<FiCircle />} aria-label="Circle" />
    <IconButton size="sm" icon={<FiCircle />} aria-label="Circle" />
    <IconButton size="md" icon={<FiCircle />} aria-label="Circle" />
    <IconButton size="lg" icon={<FiCircle />} aria-label="Circle" />
    <IconButton size="xl" icon={<FiCircle />} aria-label="Circle" />
    <IconButton size="2xl" icon={<FiCircle />} aria-label="Circle" />
  </Stack>
)
