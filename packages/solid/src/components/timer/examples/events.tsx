import { Timer } from '@ark-ui/solid/timer'
import { PlayIcon, RotateCcwIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

export const Events = () => {
  const [ticks, setTicks] = createSignal(0)

  return (
    <Timer.Root
      class="stack"
      targetMs={60 * 1000}
      onComplete={() => console.log('Timer completed')}
      onTick={() => setTicks((t) => t + 1)}
    >
      <Timer.Area class={styles.Area}>
        <div class={styles.ItemGroup}>
          <Timer.Item class={styles.Item} type="minutes" />
          <span class={styles.ItemLabel}>minutes</span>
        </div>
        <Timer.Separator class={styles.Separator}>:</Timer.Separator>
        <div class={styles.ItemGroup}>
          <Timer.Item class={styles.Item} type="seconds" />
          <span class={styles.ItemLabel}>seconds</span>
        </div>
      </Timer.Area>

      <Timer.Control class="hstack">
        <Timer.ActionTrigger class={button.Root} action="start">
          <PlayIcon /> Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger class={button.Root} action="reset">
          <RotateCcwIcon /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>

      <output>Ticks: {ticks()}</output>
    </Timer.Root>
  )
}
