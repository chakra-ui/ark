import { NumberInput } from '@ark-ui/react/number-input'
import { Slider } from '@ark-ui/react/slider'
import { useState } from 'react'
import numberInput from 'styles/number-input.module.css'
import styles from 'styles/slider.module.css'

const min = 0
const max = 1000
const step = 10
const minStepsBetweenThumbs = 5
const gap = step * minStepsBetweenThumbs

export const WithNumberInput = () => {
  const [value, setValue] = useState<(number | null)[]>([200, 600])
  const start = value[0] ?? min
  const end = value[1] ?? max

  const setValueAt = (index: number, next: number | null) => {
    setValue((prev) => prev.map((v, i) => (i === index ? next : v)))
  }

  return (
    <div className="stack">
      <Slider.Root
        className={styles.Root}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        value={[Math.min(Math.max(start, min), max - gap), Math.min(Math.max(end, start + gap), max)]}
        onValueChange={(details) => setValue(details.value)}
        getAriaLabel={({ index }) => (index === 0 ? 'Minimum price' : 'Maximum price')}
      >
        <Slider.Label className={styles.Label}>Price range</Slider.Label>
        <Slider.Control className={styles.Control}>
          <Slider.Track className={styles.Track}>
            <Slider.Range className={styles.Range} />
          </Slider.Track>
          <Slider.Thumb index={0} className={styles.Thumb}>
            <Slider.HiddenInput />
          </Slider.Thumb>
          <Slider.Thumb index={1} className={styles.Thumb}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
      <div className={styles.NumberInputs}>
        <NumberInput.Root
          className={numberInput.Root}
          value={value[0]}
          min={min}
          max={end - gap}
          step={step}
          onValueChange={(details) => setValueAt(0, details.value)}
        >
          <NumberInput.Label className={numberInput.Label}>Min</NumberInput.Label>
          <NumberInput.Control className={numberInput.Control}>
            <NumberInput.Input className={numberInput.Input} />
          </NumberInput.Control>
        </NumberInput.Root>
        <NumberInput.Root
          className={numberInput.Root}
          value={value[1]}
          min={start + gap}
          max={max}
          step={step}
          onValueChange={(details) => setValueAt(1, details.value)}
        >
          <NumberInput.Label className={numberInput.Label}>Max</NumberInput.Label>
          <NumberInput.Control className={numberInput.Control}>
            <NumberInput.Input className={numberInput.Input} />
          </NumberInput.Control>
        </NumberInput.Root>
      </div>
    </div>
  )
}
