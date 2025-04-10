import { QrCode } from '@ark-ui/react/qr-code'
import { useState } from 'react'

export const Controlled = () => {
  const [value, setValue] = useState('http://ark-ui.com')

  return (
    <QrCode.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
