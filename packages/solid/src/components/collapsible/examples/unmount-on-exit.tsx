import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronDownIcon } from 'lucide-solid'

export const UnmountOnExit = () => (
  <Collapsible.Root unmountOnExit>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
