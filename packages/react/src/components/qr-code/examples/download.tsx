import { QrCode } from '@ark-ui/react/qr-code'
import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

export const Download = () => {
  return (
    <QrCode.Root className={styles.Root} defaultValue="http://ark-ui.com">
      <QrCode.Frame className={styles.Frame}>
        <QrCode.Pattern className={styles.Pattern} />
      </QrCode.Frame>
      <QrCode.DownloadTrigger className={button.Root} fileName="qr-code.png" mimeType="image/png">
        Download
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  )
}
