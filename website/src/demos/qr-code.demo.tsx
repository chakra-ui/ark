import { QrCode } from '@ark-ui/react/qr-code'
import { sva } from 'styled-system/css'

const styles = sva({
  className: 'qr-code',
  slots: ['root', 'frame', 'pattern', 'overlay', 'img'],
  base: {
    root: {
      width: 'fit-content',
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
      <QrCode.Frame className={styles.frame}>
        <QrCode.Pattern className={styles.pattern} />
      </QrCode.Frame>
      <QrCode.Overlay className={styles.overlay}>
        <img src="https://ark-ui.com/icon-192.png" alt="" className={styles.img} />
      </QrCode.Overlay>
    </QrCode.Root>
  )
}
