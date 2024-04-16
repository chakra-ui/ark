import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Tooltip } from '../..'

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen())}>
        Toggle
      </button>
      <Tooltip.Root open={isOpen()}>
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    </>
  )
}
