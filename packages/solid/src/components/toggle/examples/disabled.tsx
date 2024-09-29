import { BoldIcon } from 'lucide-solid'
import { Toggle } from '../'

export const Disabled = () => {
  return (
    <Toggle.Root disabled>
      <BoldIcon />
    </Toggle.Root>
  )
}
