<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerContentProps extends Assign<HTMLProps<'div'>, ColorPickerContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerContentProps = $props()

  const colorPicker = useColorPickerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(colorPicker().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
