import { Button } from '@/components/shared/Button'
import { Text } from '@/components/shared/Text'
import { Box, Stack } from '@/panda/jsx'
import { usePressable } from '@ark-ui/react'
import { useCallback, useState } from 'react'

export const DemoPressable = () => {
  const [timesPressed, setTimesPressed] = useState(0)
  const [timesLongPressed, setTimesLongPressed] = useState(0)

  const onPress = useCallback(() => setTimesPressed((current) => current + 1), [])
  const onLongPress = useCallback(() => setTimesLongPressed((current) => current + 1), [])

  const { isPressed, pressableProps } = usePressable({
    onPress,
    onLongPress,
  })
  return (
    <Stack gap="10" width="full" alignItems="center">
      <Button size="lg" variant="primary" {...pressableProps}>
        {isPressed ? 'Pressed' : 'Press me'}
      </Button>
      <Stack direction="row" gap="8">
        <MetricCard label="Pressed" metric={timesPressed} />
        <MetricCard label="Long Pressed" metric={timesLongPressed} />
      </Stack>
    </Stack>
  )
}

type StatProps = {
  label: string
  metric: number
}

const MetricCard = (props: StatProps) => (
  <Box
    px="4"
    py="5"
    background="bg.surface"
    borderRadius="lg"
    borderWidth="1px"
    boxShadow="xs"
    minWidth="8rem"
  >
    <Stack alignItems="center">
      <Text as="span" textStyle="sm" fontWeight="medium" color="fg.muted">
        {props.label}
      </Text>
      <Text as="span" fontWeight="semibold" textStyle="3xl">
        {props.metric}
      </Text>
    </Stack>
  </Box>
)
