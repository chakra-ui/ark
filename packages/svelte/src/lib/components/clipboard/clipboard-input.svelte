<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ClipboardInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface ClipboardInputProps extends Assign<HTMLProps<'input'>, ClipboardInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  let { ref = $bindable(null), ...props }: ClipboardInputProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
