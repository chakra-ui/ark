import { Meter, useMeter } from '@ark-ui/react/meter'
import button from 'styles/button.module.css'
import styles from 'styles/meter.module.css'

export const RootProvider = () => {
  const meter = useMeter({ defaultValue: 40 })

  return (
    <div className={styles.Stack}>
      <Meter.RootProvider className={styles.Root} value={meter}>
        <Meter.Label className={styles.Label}>Daily goal</Meter.Label>
        <Meter.ValueText className={styles.ValueText} />
        <Meter.Track className={styles.Track}>
          <Meter.Indicator className={styles.Indicator} />
        </Meter.Track>
      </Meter.RootProvider>
      <div className="hstack">
        <button type="button" className={button.Root} onClick={() => meter.setValue(meter.value - 10)}>
          -10
        </button>
        <button type="button" className={button.Root} onClick={() => meter.setValue(meter.value + 10)}>
          +10
        </button>
        <button type="button" className={button.Root} onClick={() => meter.setToMax()}>
          Complete
        </button>
      </div>
    </div>
  )
}
