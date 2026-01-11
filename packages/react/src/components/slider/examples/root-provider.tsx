import { Slider, useSlider } from '@ark-ui/react/slider'
import button from 'styles/button.module.css'
import styles from 'styles/slider.module.css'

export const RootProvider = () => {
  const slider = useSlider()

  return (
    <>
      <button className={button.Root} onClick={() => slider.focus()}>
        Focus
      </button>

      <Slider.RootProvider value={slider} className={styles.Root}>
        <Slider.Label className={styles.Label}>Label</Slider.Label>
        <Slider.ValueText className={styles.ValueText} />
        <Slider.Control className={styles.Control}>
          <Slider.Track className={styles.Track}>
            <Slider.Range className={styles.Range} />
          </Slider.Track>
          <Slider.Thumb index={0} className={styles.Thumb}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.RootProvider>
    </>
  )
}
