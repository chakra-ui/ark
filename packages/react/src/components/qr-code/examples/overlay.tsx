import { QrCode } from '@ark-ui/react/qr-code'
import styles from 'styles/qr-code.module.css'

export const Overlay = () => {
  return (
    <QrCode.Root className={styles.Root} defaultValue="http://ark-ui.com" encoding={{ ecc: 'H' }}>
      <QrCode.Frame className={styles.Frame}>
        <QrCode.Pattern className={styles.Pattern} />
      </QrCode.Frame>
      <QrCode.Overlay className={styles.Overlay}>
        <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
