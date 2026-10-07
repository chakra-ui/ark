<script lang="ts">
  import { Meter, useMeter } from '@ark-ui/svelte/meter'
  import button from 'styles/button.module.css'
  import styles from 'styles/meter.module.css'

  const id = $props.id()
  const meter = useMeter({ id, defaultValue: 40 })
</script>

<div class={styles.Stack}>
  <Meter.RootProvider class={styles.Root} value={meter}>
    <Meter.Label class={styles.Label}>Daily goal</Meter.Label>
    <Meter.ValueText class={styles.ValueText} />
    <Meter.Track class={styles.Track}>
      <Meter.Indicator class={styles.Indicator} />
    </Meter.Track>
  </Meter.RootProvider>
  <div class="hstack">
    <button type="button" class={button.Root} onclick={() => meter().setValue(meter().value - 10)}>-10</button>
    <button type="button" class={button.Root} onclick={() => meter().setValue(meter().value + 10)}>+10</button>
    <button type="button" class={button.Root} onclick={() => meter().setToMax()}>Complete</button>
  </div>
</div>
