import { Volume, VolumeOff } from 'lucide-react'
import { Toggle } from '../'

export const Indicator = () => {
  return (
    <Toggle.Root>
      <Toggle.Indicator fallback={<Volume />}>
        <VolumeOff />
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
