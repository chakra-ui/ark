<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ClipboardTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface ClipboardTriggerProps extends Assign<HTMLProps<'button'>, ClipboardTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  const props: ClipboardTriggerProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
