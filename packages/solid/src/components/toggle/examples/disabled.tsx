import { Toggle } from '@ark-ui/solid/toggle'
import { BoldIcon } from 'lucide-solid'

export const Disabled = () => {
  return (
    <Toggle.Root disabled>
      <BoldIcon />
    </Toggle.Root>
  )
}
