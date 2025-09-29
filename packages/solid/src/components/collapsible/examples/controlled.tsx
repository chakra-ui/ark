import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronDown } from 'lucide-solid'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <Collapsible.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
      <Collapsible.Trigger>
        Toggle
        <Collapsible.Indicator>
          <ChevronDown />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>Content</Collapsible.Content>
    </Collapsible.Root>
  )
}
