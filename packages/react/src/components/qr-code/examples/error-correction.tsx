import { QrCode } from '@ark-ui/react/qr-code'
import { RadioGroup } from '@ark-ui/react/radio-group'
import { useState } from 'react'
import styles from 'styles/qr-code.module.css'
import radio from 'styles/radio-group.module.css'

type ErrorLevel = 'L' | 'M' | 'Q' | 'H'

export const ErrorCorrection = () => {
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('L')

  return (
    <div className="stack">
      <QrCode.Root className={styles.Root} defaultValue="http://ark-ui.com" encoding={{ ecc: errorLevel }}>
        <QrCode.Frame className={styles.Frame}>
          <QrCode.Pattern className={styles.Pattern} />
        </QrCode.Frame>
      </QrCode.Root>
      <RadioGroup.Root
        className={radio.Root}
        defaultValue="L"
        orientation="horizontal"
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      >
        <div className="hstack">
          {['L', 'M', 'Q', 'H'].map((level) => (
            <RadioGroup.Item className={radio.Item} key={level} value={level}>
              <RadioGroup.ItemControl className={radio.ItemControl} />
              <RadioGroup.ItemText className={radio.ItemText}>{level}</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          ))}
        </div>
      </RadioGroup.Root>
    </div>
  )
}
