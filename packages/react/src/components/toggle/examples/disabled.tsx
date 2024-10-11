import { Toggle } from '@ark-ui/react/toggle'
import { BoldIcon } from 'lucide-react'

export const Disabled = () => {
  return (
    <Toggle.Root disabled>
      <BoldIcon />
    </Toggle.Root>
  )
}
