import { Toggle } from '@ark-ui/solid/toggle'
import { Volume, VolumeOff } from 'lucide-solid'

export const Indicator = () => {
  return (
    <Toggle.Root>
      <Toggle.Indicator fallback={<Volume />}>
        <VolumeOff />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
