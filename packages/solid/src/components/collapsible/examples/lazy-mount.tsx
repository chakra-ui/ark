import { Collapsible } from '@ark-ui/solid/collapsible'
import { ChevronDownIcon } from 'lucide-solid'

export const LazyMount = () => (
  <Collapsible.Root lazyMount>
    <Collapsible.Trigger>
      Toggle
      <Collapsible.Indicator>
        <ChevronDownIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
)
