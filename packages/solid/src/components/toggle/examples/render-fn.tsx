import { Toggle } from '@ark-ui/solid/toggle'
import { Bold } from 'lucide-solid'

export const RenderFn = () => (
  <Toggle.Root>
    <Bold />
    <Toggle.Context>{(toggle) => <span>State: {toggle().pressed ? 'pressed' : 'not pressed'}</span>}</Toggle.Context>
  </Toggle.Root>
)
