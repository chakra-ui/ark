<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ClipboardControlBaseProps extends PolymorphicProps<'div'> {}
  export interface ClipboardControlProps extends Assign<HTMLProps<'div'>, ClipboardControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  const props: ClipboardControlProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
