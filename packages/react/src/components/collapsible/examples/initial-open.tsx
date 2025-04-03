import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronDownIcon } from 'lucide-react'

export const InitialOpen = () => (
  <Collapsible.Root defaultOpen>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
