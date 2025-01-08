import { QrCode } from '@ark-ui/react/qr-code'
import { DownloadIcon } from 'lucide-react'
import { sva } from 'styled-system/css'
import { Button } from '~/components/ui/button'

const styles = sva({
  className: 'qr-code',
  slots: ['root', 'frame', 'pattern', 'overlay', 'img'],
  base: {
    root: {
      width: 'fit-content',
      display: 'flex',
      flexDir: 'column',
      gap: '3',
    },
    frame: {
      width: '32',
      height: '32',
      bg: 'white',
    },
    pattern: {
      fill: 'black',
    },
    overlay: {
      outline: '2px solid white',
      height: '9',
      width: '9',
      borderRadius: 'full',
    },
    img: {
      width: 'full',
      height: 'full',
    },
  },
})()

export const Demo = () => {
  return (
    <QrCode.Root value="http://ark-ui.com" encoding={{ ecc: 'H' }} className={styles.root}>
      <div style={{ position: 'relative' }}>
        <QrCode.Frame className={styles.frame}>
          <QrCode.Pattern className={styles.pattern} />
        </QrCode.Frame>
        <QrCode.Overlay className={styles.overlay}>
          <img src="https://ark-ui.com/icon-192.png" alt="" className={styles.img} />
        </QrCode.Overlay>
      </div>

      <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png" asChild>
        <Button size="sm">
          <DownloadIcon /> Download
        </Button>
      </QrCode.DownloadTrigger>
    </QrCode.Root>
  )
}
