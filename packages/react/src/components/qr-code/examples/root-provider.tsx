import { QrCode, useQrCode } from '@ark-ui/react/qr-code'
import styles from 'styles/qr-code.module.css'

export const RootProvider = () => {
  const qrCode = useQrCode({ value: 'http://ark-ui.com' })

  return (
    <div className="stack">
      <QrCode.RootProvider className={styles.Root} value={qrCode}>
        <QrCode.Frame className={styles.Frame}>
          <QrCode.Pattern className={styles.Pattern} />
        </QrCode.Frame>
      </QrCode.RootProvider>
      <output>{qrCode.value}</output>
    </div>
  )
}
