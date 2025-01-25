import { Tooltip } from '@ark-ui/react/tooltip'

export const Multiple = () => (
  <div>
    {Array.from({ length: 2 }).map((_, index) => (
      <Tooltip.Root key={index}>
        <Tooltip.Trigger>Tooltip {index}</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    ))}
  </div>
)
