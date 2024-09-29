import { Volume, VolumeOff } from 'lucide-solid'
import { Show, createSignal } from 'solid-js'
import { Toggle } from '../'

export const Controlled = () => {
  const [pressed, setPressed] = createSignal(false)
  return (
    <div>
      <Toggle.Root pressed={pressed} onPressedChange={setPressed}>
        <Show when={pressed()} fallback={<VolumeOff />}>
          <Volume />
        </Show>
      </Toggle.Root>
      <p>Volume is {pressed() ? 'unmuted' : 'muted'}</p>
    </div>
  )
}
