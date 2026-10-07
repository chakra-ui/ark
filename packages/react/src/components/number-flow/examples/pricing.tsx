import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const prices = { monthly: 24, yearly: 19.2 }

type Billing = keyof typeof prices

export const Pricing = () => {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <div className={styles.Card}>
      <div className={styles.Header}>
        <span className={styles.Label}>Pro plan</span>
        <div className={styles.Toggle}>
          {(['monthly', 'yearly'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={styles.ToggleItem}
              aria-pressed={billing === option}
              onClick={() => setBilling(option)}
            >
              {option === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.Price}>
        <NumberFlow.Root
          value={prices[billing]}
          trend={true}
          formatOptions={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
          className={styles.Root}
        >
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
        <span className={styles.Period}>/ month</span>
      </div>
      <span className={styles.Caption}>
        {billing === 'yearly' ? 'Billed $230.40 a year. You save 20%.' : 'Billed monthly. Cancel anytime.'}
      </span>
      <button type="button" className={button.Root} data-variant="solid">
        Get started
      </button>
    </div>
  )
}
