<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { AreaProps } from '@zag-js/color-picker'

  export interface ColorPickerAreaBaseProps extends AreaProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerAreaProps extends Assign<HTMLProps<'div'>, ColorPickerAreaBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context'

  let { ref = $bindable(), ...props }: ColorPickerAreaProps = $props()

  const [areaProps, localProps] = $derived(createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel']))

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getAreaProps(areaProps), localProps))

  ColorPickerAreaPropsProvider(() => areaProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
