<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerAreaThumbBaseProps extends PolymorphicProps<'div'> {}
  export interface ColorPickerAreaThumbProps extends Assign<HTMLProps<'div'>, ColorPickerAreaThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'

  const props: ColorPickerAreaThumbProps = $props()

  const colorPicker = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()

  const mergedProps = $derived(mergeProps(colorPicker().getAreaThumbProps(areaProps()), props))
</script>

<Ark as="div" {...mergedProps} />
