import { NumberFlow, useNumberFlow } from '@ark-ui/react/number-flow'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const RootProvider = () => {
  const numberFlow = useNumberFlow({ defaultValue: 6800 })

  return (
    <div className={styles.Card}>
      <span className={styles.Label}>Daily steps</span>
      <NumberFlow.RootProvider value={numberFlow} className={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.RootProvider>
      <div className={styles.Actions}>
        <button type="button" className={button.Root} onClick={() => numberFlow.setValue(numberFlow.value - 500)}>
          -500
        </button>
        <button type="button" className={button.Root} onClick={() => numberFlow.setValue(numberFlow.value + 500)}>
          +500
        </button>
      </div>
    </div>
  )
}
