import { QrCode } from '../..'

export const ComponentUnderTest = () => {
  return (
    <QrCode.Root value="http://ark-ui.com" encoding={{ ecc: 'H' }}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
      <QrCode.Overlay>
        <img src="https://ark-ui.com/icon-192.png" alt="" />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
