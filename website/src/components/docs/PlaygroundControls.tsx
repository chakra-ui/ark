import { Checkbox } from '@/components/shared/Checkbox'
import { Text } from '@/components/shared/Text'
import { HStack } from 'panda/jsx/hstack'
import { Stack } from 'panda/jsx/stack'
import { match } from 'ts-pattern'

type Controls = {
  [key: string]: {
    type: 'boolean'
  }
}

type PlaygroundControlsProps = {
  controls: Controls
}

export const PlaygroundControls = (props: PlaygroundControlsProps) => (
  <Stack gap="3" flex="1" alignItems="stretch">
    {Object.entries(props.controls).map(([key, control]) => (
      <HStack key={key} justify="space-between">
        <Text textStyle="sm" color="fg.muted">
          {key}
        </Text>
        {match(control)
          .with({ type: 'boolean' }, () => <Checkbox size="sm" />)
          .exhaustive()}
      </HStack>
    ))}
  </Stack>
)
