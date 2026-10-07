import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const locales = [
  { locale: 'en-US', label: 'English' },
  { locale: 'de-DE', label: 'Deutsch' },
  { locale: 'ar-EG', label: 'العربية' },
  { locale: 'hi-IN-u-nu-deva', label: 'हिन्दी' },
]

export const Locale = () => {
  const [value, setValue] = useState(1_234_567.89)

  return (
    <div className="stack">
      <div className={styles.Grid}>
        {locales.map(({ locale, label }) => (
          <div key={locale} className={styles.Stat}>
            <span className={styles.Label}>{label}</span>
            <NumberFlow.Root value={value} locale={locale} className={styles.Root}>
              <NumberFlow.Segments />
              <NumberFlow.HiddenValueText />
            </NumberFlow.Root>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={button.Root}
        onClick={() => setValue(Math.round(Math.random() * 10_000_000) / 100)}
      >
        Randomize
      </button>
    </div>
  )
}
