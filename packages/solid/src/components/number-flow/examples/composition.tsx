import { NumberFlow } from '@ark-ui/solid/number-flow'
import { Match, Switch, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const asDigit = (segment: NumberFlow.Segment) => (segment.kind === 'digit' ? segment : undefined)
const asSymbol = (segment: NumberFlow.Segment) => (segment.kind === 'symbol' ? segment : undefined)

export const Composition = () => {
  const [value, setValue] = createSignal(1299.99)

  return (
    <div class={styles.Card}>
      <span class={styles.Label}>Total due</span>
      <NumberFlow.Root
        value={value()}
        formatOptions={{ style: 'currency', currency: 'USD' }}
        class={`${styles.Root} ${styles.Display}`}
      >
        <NumberFlow.Segments>
          {(segment) => (
            <Switch>
              <Match when={asDigit(segment())}>
                {(digit) => (
                  <NumberFlow.Digit segment={digit()} class={digit().place < 0 ? styles.Fraction : undefined} />
                )}
              </Match>
              <Match when={asSymbol(segment())}>
                {(symbol) => (
                  <NumberFlow.Symbol
                    segment={symbol()}
                    class={symbol().type === 'currency' ? styles.Currency : undefined}
                  />
                )}
              </Match>
            </Switch>
          )}
        </NumberFlow.Segments>
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <button type="button" class={button.Root} onClick={() => setValue(Math.round(Math.random() * 500_000) / 100)}>
        Update total
      </button>
    </div>
  )
}
