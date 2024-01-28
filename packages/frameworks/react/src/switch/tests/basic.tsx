import { Switch, type SwitchRootProps } from '../'

export const ComponentUnderTest = (props: SwitchRootProps) => {
  return (
    <Switch.Root {...props}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}
