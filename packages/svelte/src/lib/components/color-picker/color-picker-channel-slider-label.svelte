<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerChannelSliderLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface ColorPickerChannelSliderLabelProps
    extends Assign<HTMLProps<'label'>, ColorPickerChannelSliderLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
  import { useColorPickerContext } from './use-color-picker-context'

  const props: ColorPickerChannelSliderLabelProps = $props()

  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = $derived(mergeProps(colorPicker().getChannelSliderLabelProps(channelProps()), props))
</script>

<Ark as="label" {...mergedProps} />
