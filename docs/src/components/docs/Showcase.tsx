import { AbsoluteCenter, Box, Stack } from '../../../panda/jsx'
import { DemoTooltip } from '../demo/Tooltip'
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
          <Text textStyle="sm" fontWeight="medium">
            Properties
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Double click to edit values
          </Text>
        </Stack>
        <Stack gap="3" width="full">
          <Stack gap="10" direction="row" align="center" justify="space-between" width="full">
            <Text textStyle="sm" color="fg.muted" whiteSpace="nowrap">
              Open delay:
            </Text>
            <Text textStyle="sm" fontWeight="medium" color="fg.emphasized" whiteSpace="nowrap">
              150
            </Text>
          </Stack>
          <Stack gap="10" direction="row" align="center" justify="space-between" width="full">
            <Text textStyle="sm" color="fg.muted" whiteSpace="nowrap">
              Close delay:
            </Text>
            <Text textStyle="sm" fontWeight="medium" color="fg.emphasized" whiteSpace="nowrap">
              100
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </Box>
)
