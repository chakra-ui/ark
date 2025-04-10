import { Tooltip, useTooltip } from '@ark-ui/react/tooltip'

export const RootProvider = () => {
  const tooltip = useTooltip()

  return (
    <>
      <button onClick={() => tooltip.setOpen(true)}>Open</button>

      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger disabled>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.RootProvider>
    </>
  )
}
