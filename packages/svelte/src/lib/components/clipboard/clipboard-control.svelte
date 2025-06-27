<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ClipboardControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ClipboardControlProps extends Assign<HTMLProps<'div'>, ClipboardControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  let { ref = $bindable(), ...props }: ClipboardControlProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
