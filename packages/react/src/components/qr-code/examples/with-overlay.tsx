import { QrCode } from '@ark-ui/react/qr-code'

export const WithOverlay = () => {
  return (
    <QrCode.Root defaultValue="http://ark-ui.com" encoding={{ ecc: 'H' }}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>
        <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
