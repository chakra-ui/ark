import { QrCode } from '@ark-ui/solid/qr-code'

export const WithOverlay = () => {
  return (
    <QrCode.Root value="http://ark-ui.com">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>
        <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
