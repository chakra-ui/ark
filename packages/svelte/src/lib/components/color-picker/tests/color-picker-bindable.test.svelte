<script lang="ts">
  import type { ColorFormat } from '@zag-js/color-utils'
  import { ColorPicker, parseColor } from '../index.ts'

  let format = $state<ColorFormat>('rgba')
</script>

<ColorPicker.Root defaultValue={parseColor('#eb5e41')} bind:format>
  <ColorPicker.Label>Color</ColorPicker.Label>
  <ColorPicker.FormatTrigger>Toggle format</ColorPicker.FormatTrigger>
  <ColorPicker.Context>
    {#snippet render(colorPicker)}
      <button type="button" onclick={() => colorPicker().setFormat('hsla')}>hsla</button>
    {/snippet}
  </ColorPicker.Context>
</ColorPicker.Root>
<output data-testid="format">{format}</output>
