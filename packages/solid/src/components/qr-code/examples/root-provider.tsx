import { QrCode, useQrCode } from '@ark-ui/solid/qr-code'
import styles from 'styles/qr-code.module.css'

export const RootProvider = () => {
  const qrCode = useQrCode({ value: 'http://ark-ui.com' })

  return (
    <div class="stack">
      <QrCode.RootProvider class={styles.Root} value={qrCode}>
        <QrCode.Frame class={styles.Frame}>
          <QrCode.Pattern class={styles.Pattern} />
        </QrCode.Frame>
      </QrCode.RootProvider>
      <output>{qrCode().value}</output>
    </div>
  )
}
