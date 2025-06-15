<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps<'div'> {}
  export interface ColorPickerAreaBackgroundProps
    extends Assign<HTMLProps<'div'>, ColorPickerAreaBackgroundBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'

  const props: ColorPickerAreaBackgroundProps = $props()

  const colorPicker = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()

  const mergedProps = $derived(mergeProps(colorPicker().getAreaBackgroundProps(areaProps()), props))
</script>

<Ark as="div" {...mergedProps} />
