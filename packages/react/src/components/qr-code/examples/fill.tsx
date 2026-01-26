import { QrCode } from '@ark-ui/react/qr-code'
import styles from 'styles/qr-code.module.css'

export const Fill = () => {
  return (
    <div className="hstack">
      {['#5417D7', '#EC5D5E'].map((fill) => (
        <QrCode.Root key={fill} className={styles.Root} defaultValue="http://ark-ui.com">
          <QrCode.Frame className={styles.Frame} style={{ fill }}>
            <QrCode.Pattern className={styles.Pattern} />
          </QrCode.Frame>
        </QrCode.Root>
      ))}
    </div>
  )
}
