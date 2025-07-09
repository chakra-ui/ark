<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ColorStringFormat } from '@zag-js/color-utils'

  export interface ColorPickerValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    format?: ColorStringFormat
  }
  export interface ColorPickerValueTextProps extends Assign<HTMLProps<'span'>, ColorPickerValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(null), children, format, ...props }: ColorPickerValueTextProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getValueTextProps(), props))
  const valueAsString = $derived(format ? colorPicker().value.toString(format) : colorPicker().valueAsString)
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if children}
    {@render children()}
  {:else}
    {valueAsString}
  {/if}
</Ark>
