<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps<'select'> {}
  export interface ColorPickerFormatSelectProps extends Assign<HTMLProps<'select'>, ColorPickerFormatSelectBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerFormatSelectProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getFormatSelectProps(), props))
</script>

<Ark as="select" {...mergedProps} value={colorPicker().format}>
  {#each ['rgba', 'hsla', 'hsba'] as format}
    <option value={format}>{format}</option>
  {/each}
</Ark>
