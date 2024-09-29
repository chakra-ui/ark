import { BoldIcon } from 'lucide-react'
import { Toggle } from '../'

export const Disabled = () => {
  return (
    <Toggle.Root disabled>
      <BoldIcon />
    </Toggle.Root>
  )
}
