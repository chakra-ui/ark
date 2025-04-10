import { Tabs } from '@ark-ui/react/tabs'
import { useState } from 'react'

let i = 0

export const ControlledForced = () => {
  const [value, setValue] = useState<string | null>('first')

  return (
    <Tabs.Root
      value={value}
      onValueChange={(e) => {
        if (i === 0) {
          i++
        } else {
          setValue(e.value)
        }
      }}
    >
      <Tabs.List>
        <Tabs.Trigger value="first">First tab</Tabs.Trigger>
        <Tabs.Trigger value="second">Second tab</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="first">First panel</Tabs.Content>
      <Tabs.Content value="second">Second panel</Tabs.Content>
    </Tabs.Root>
  )
}
