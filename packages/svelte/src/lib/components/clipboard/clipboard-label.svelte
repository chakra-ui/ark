<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ClipboardLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface ClipboardLabelProps extends Assign<HTMLProps<'label'>, ClipboardLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  const props: ClipboardLabelProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
