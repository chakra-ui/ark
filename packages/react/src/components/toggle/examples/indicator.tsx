import { Toggle } from '@ark-ui/react/toggle'
import { Volume, VolumeOff } from 'lucide-react'

export const Indicator = () => {
  return (
    <Toggle.Root>
      <Toggle.Indicator fallback={<Volume />}>
        <VolumeOff />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
