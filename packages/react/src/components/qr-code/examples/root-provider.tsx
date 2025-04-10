import { QrCode, useQrCode } from '@ark-ui/react/qr-code'
import { useState } from 'react'

export const RootProvider = () => {
  const [value, setValue] = useState('http://ark-ui.com')
  const qrCode = useQrCode({ value })

  return (
    <>
      <button
        onClick={() => {
          setValue('https://chakra-ui.com')
        }}
      >
        Set Value
      </button>
      <QrCode.RootProvider value={qrCode}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.RootProvider>
    </>
  )
}
