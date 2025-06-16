<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ColorPickerPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface ColorPickerPositionerProps extends Assign<HTMLProps<'div'>, ColorPickerPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useColorPickerContext } from './use-color-picker-context'
  import { usePresenceContext } from '../presence'

  const props: ColorPickerPositionerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getPositionerProps(), props))

  const presence = usePresenceContext()
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
