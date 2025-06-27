<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ChannelInputProps } from '@zag-js/color-picker'

  export interface ColorPickerChannelInputBaseProps
    extends ChannelInputProps,
      PolymorphicProps<'input'>,
      RefAttribute {}
  export interface ColorPickerChannelInputProps extends Assign<HTMLProps<'input'>, ColorPickerChannelInputBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'

  let { ref = $bindable(null), ...props }: ColorPickerChannelInputProps = $props()

  const [channelProps, localProps] = $derived(createSplitProps<ChannelInputProps>()(props, ['channel', 'orientation']))

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getChannelInputProps(channelProps), localProps))
</script>

<Ark as="input" bind:ref {...mergedProps} />
