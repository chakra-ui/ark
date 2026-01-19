<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerChannelSliderTrackBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerChannelSliderTrackProps extends Assign<
    HTMLProps<'div'>,
    ColorPickerChannelSliderTrackBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

  let { ref = $bindable(null), ...props }: ColorPickerChannelSliderTrackProps = $props()

  const colorPicker = useColorPickerContext()

  const channelProps = useColorPickerChannelPropsContext()
  const formatProps = useColorPickerFormatPropsContext()
  const channelSliderProps = $derived({ ...channelProps(), ...formatProps() })

  const mergedProps = $derived(mergeProps(colorPicker().getChannelSliderTrackProps(channelSliderProps), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
