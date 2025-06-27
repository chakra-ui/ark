<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ChannelProps } from '@zag-js/color-picker'

  export interface ColorPickerChannelSliderBaseProps extends ChannelProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerChannelSliderProps extends Assign<HTMLProps<'div'>, ColorPickerChannelSliderBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

  let { ref = $bindable(null), ...props }: ColorPickerChannelSliderProps = $props()

  const [channelProps, localProps] = $derived(createSplitProps<ChannelProps>()(props, ['channel', 'orientation']))

  const colorPicker = useColorPickerContext()

  const formatProps = useColorPickerFormatPropsContext()
  const channelSliderProps = $derived({ ...channelProps, ...formatProps() })

  const mergedProps = $derived(mergeProps(colorPicker().getChannelSliderProps(channelSliderProps), localProps))

  ColorPickerChannelPropsProvider(() => channelProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
