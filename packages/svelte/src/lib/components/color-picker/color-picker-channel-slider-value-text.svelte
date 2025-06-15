<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps<'span'> {}
  export interface ColorPickerChannelSliderValueTextProps
    extends Assign<HTMLProps<'span'>, ColorPickerChannelSliderValueTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
  import { useColorPickerContext } from './use-color-picker-context'
  import { useLocaleContext } from '$lib/providers'

  const props: ColorPickerChannelSliderValueTextProps = $props()

  const locale = useLocaleContext()

  const colorPicker = useColorPickerContext()
  const channelProps = useColorPickerChannelPropsContext()
  const mergedProps = $derived(mergeProps(colorPicker().getChannelSliderValueTextProps(channelProps()), props))
</script>

<Ark as="span" {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {colorPicker().getChannelValueText(channelProps().channel, locale().locale)}
  {/if}
</Ark>
