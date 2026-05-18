<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerAreaThumbBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerAreaThumbProps extends Assign<HTMLProps<'div'>, ColorPickerAreaThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'
  import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerAreaThumbProps = $props()

  const colorPicker = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()

  const mergedProps = $derived(mergeProps(colorPicker().getAreaThumbProps(areaProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
