<script lang="ts">
  import { ColorPicker, parseColor } from '@ark-ui/svelte/color-picker'
  import { Check } from 'lucide-svelte'
  import styles from 'styles/color-picker.module.css'

  const swatches = ['red', 'pink', 'orange', 'purple']
</script>

<ColorPicker.Root class={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
  <output>
    Selected color: <ColorPicker.ValueText class={styles.ValueText} />
  </output>
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
