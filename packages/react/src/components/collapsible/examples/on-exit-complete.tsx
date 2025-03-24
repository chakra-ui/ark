import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronDownIcon } from 'lucide-react'

export const OnExitComplete = () => (
  <Collapsible.Root onExitComplete={() => alert('on exit')}>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
