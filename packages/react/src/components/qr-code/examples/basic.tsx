import { QrCode } from '@ark-ui/react/qr-code'

export const Basic = () => {
  return (
    <QrCode.Root value="http://ark-ui.com">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
