<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { Check } from 'lucide-svelte'
  import styles from 'styles/color-picker.module.css'

  const swatches = ['red', 'blue', 'green', 'orange']
</script>

<ColorPicker.Root class={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
  <ColorPicker.Area class={styles.Area}>
    <ColorPicker.AreaBackground class={styles.AreaBackground} />
    <ColorPicker.AreaThumb class={styles.AreaThumb} />
  </ColorPicker.Area>

  <ColorPicker.SwatchGroup class={styles.SwatchGroup}>
    {#each swatches as color}
      <ColorPicker.SwatchTrigger class={styles.SwatchTrigger} value={color}>
        <ColorPicker.Swatch class={styles.Swatch} value={color}>
          <ColorPicker.SwatchIndicator class={styles.SwatchIndicator}>
            <Check />
          </ColorPicker.SwatchIndicator>
        </ColorPicker.Swatch>
      </ColorPicker.SwatchTrigger>
    {/each}
  </ColorPicker.SwatchGroup>
</ColorPicker.Root>
