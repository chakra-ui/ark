import { NumberFlow } from '@ark-ui/solid/number-flow'
import { For, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const prices = { monthly: 24, yearly: 19.2 }

type Billing = keyof typeof prices

export const Pricing = () => {
  const [billing, setBilling] = createSignal<Billing>('monthly')

  return (
    <div class={styles.Card}>
      <div class={styles.Header}>
        <span class={styles.Label}>Pro plan</span>
        <div class={styles.Toggle}>
          <For each={['monthly', 'yearly'] as const}>
            {(option) => (
              <button
                type="button"
                class={styles.ToggleItem}
                aria-pressed={billing() === option}
                onClick={() => setBilling(option)}
              >
                {option === 'monthly' ? 'Monthly' : 'Yearly'}
              </button>
            )}
          </For>
        </div>
      </div>
      <div class={styles.Price}>
        <NumberFlow.Root
          value={prices[billing()]}
          trend={true}
          formatOptions={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
          class={styles.Root}
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
        <span class={styles.Period}>/ month</span>
      </div>
      <span class={styles.Caption}>
        {billing() === 'yearly' ? 'Billed $230.40 a year. You save 20%.' : 'Billed monthly. Cancel anytime.'}
      </span>
      <button type="button" class={button.Root} data-variant="solid">
        Get started
      </button>
    </div>
  )
}
