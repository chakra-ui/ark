import { Collapsible, useCollapsible } from '@ark-ui/react/collapsible'
import { ChevronDownIcon } from 'lucide-react'

export const RootProvider = () => {
  const collapsible = useCollapsible()

  return (
    <>
      <span>{collapsible.visible ? 'Visible' : 'Hidden'}</span>

      <Collapsible.RootProvider value={collapsible}>
        <Collapsible.Trigger>
          Toggle
          <Collapsible.Indicator>
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible.RootProvider>
    </>
  )
}
