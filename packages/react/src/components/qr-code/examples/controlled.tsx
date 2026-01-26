import { QrCode } from '@ark-ui/react/qr-code'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/qr-code.module.css'

export const Controlled = () => {
  const [value, setValue] = useState('http://ark-ui.com')

  return (
    <div className="stack">
      <QrCode.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
        <QrCode.Frame className={styles.Frame}>
          <QrCode.Pattern className={styles.Pattern} />
        </QrCode.Frame>
      </QrCode.Root>
      <button className={button.Root} onClick={() => setValue('https://chakra-ui.com')}>
        Set to chakra-ui.com
      </button>
    </div>
  )
}
