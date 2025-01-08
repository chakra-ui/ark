import { QrCode } from '@ark-ui/solid/qr-code'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal('http://ark-ui.com')

  return (
    <QrCode.Root value={value()} onValueChange={(e) => setValue(e.value)}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
