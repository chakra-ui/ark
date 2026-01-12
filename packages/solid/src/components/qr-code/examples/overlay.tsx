import { QrCode } from '@ark-ui/solid/qr-code'
import styles from 'styles/qr-code.module.css'

export const Overlay = () => {
  return (
    <QrCode.Root class={styles.Root} defaultValue="http://ark-ui.com" encoding={{ ecc: 'H' }}>
      <QrCode.Frame class={styles.Frame}>
        <QrCode.Pattern class={styles.Pattern} />
      </QrCode.Frame>
      <QrCode.Overlay class={styles.Overlay}>
        <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
