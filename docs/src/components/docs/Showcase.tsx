import { AbsoluteCenter, Box, Stack } from '../../../panda/jsx'
import { DemoTooltip } from '../demo/Tooltip'
import { Input } from '../shared/Input'
import { Text } from '../shared/Text'

export const Showcase = () => (
  <Box
    display="flex"
    bg="bg.surface"
    borderRadius="lg"
    boxShadow="sm"
    width="full"
    minHeight="320px"
    position="relative"
  >
    <Box
      position="relative"
      flex="1"
      bgImage={{
        base: 'radial-gradient(circle,var(--colors-gray-200) 1px, transparent 1px)',
        _dark: 'radial-gradient(circle,var(--colors-gray-800) 1px, transparent 1px)',
      }}
      bgSize="16px 16px"
    >
      <AbsoluteCenter>
        <DemoTooltip />
      </AbsoluteCenter>
    </Box>
    <Box borderLeftWidth="1px" p="4" maxWidth="256px" flex="1">
      <Stack gap="6">
        <Stack gap="1">
          <Text textStyle="md" fontWeight="medium">
            Properties
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Lorem ipsum dolor sit amet.
          </Text>
        </Stack>
        {/* <Box h="1px" width="full" bg="border.default" /> */}
        <Stack gap="4">
          <Stack gap="10" direction="row" align="center">
            <Text textStyle="sm" fontWeight="medium" color="fg.emphasized" whiteSpace="nowrap">
              Open delay
            </Text>
            <Input variant="outline" size="sm" defaultValue="200" />
          </Stack>
          <Stack gap="10" direction="row" align="center">
            <Text textStyle="sm" fontWeight="medium" color="fg.emphasized" whiteSpace="nowrap">
              Close delay
            </Text>
            <Input variant="outline" size="sm" defaultValue="200" />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </Box>
)
