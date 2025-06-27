<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerTransparencyGridBaseProps
    extends TransparencyGridProps,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface ColorPickerTransparencyGridProps
    extends Assign<HTMLProps<'div'>, ColorPickerTransparencyGridBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import type { TransparencyGridProps } from '@zag-js/color-picker'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: ColorPickerTransparencyGridProps = $props()

  const [gridProps, localProps] = $derived(createSplitProps<TransparencyGridProps>()(props, ['size']))

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getTransparencyGridProps(gridProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
