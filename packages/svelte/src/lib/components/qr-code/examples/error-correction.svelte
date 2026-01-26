<script lang="ts">
  import { QrCode } from '@ark-ui/svelte/qr-code'
  import { RadioGroup } from '@ark-ui/svelte/radio-group'
  import styles from 'styles/qr-code.module.css'
  import radio from 'styles/radio-group.module.css'

  type ErrorLevel = 'L' | 'M' | 'Q' | 'H'
  let errorLevel = $state<ErrorLevel>('L')
  const levels: ErrorLevel[] = ['L', 'M', 'Q', 'H']
</script>

<div class="stack">
  <QrCode.Root class={styles.Root} defaultValue="http://ark-ui.com" encoding={{ ecc: errorLevel }}>
    <QrCode.Frame class={styles.Frame}>
      <QrCode.Pattern class={styles.Pattern} />
    </QrCode.Frame>
  </QrCode.Root>
  <RadioGroup.Root
    class={radio.Root}
    defaultValue="L"
    orientation="horizontal"
    onValueChange={(e) => (errorLevel = e.value as ErrorLevel)}
  >
    <div class="hstack">
      {#each levels as level}
        <RadioGroup.Item class={radio.Item} value={level}>
          <RadioGroup.ItemControl class={radio.ItemControl} />
          <RadioGroup.ItemText class={radio.ItemText}>{level}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      {/each}
    </div>
  </RadioGroup.Root>
</div>
