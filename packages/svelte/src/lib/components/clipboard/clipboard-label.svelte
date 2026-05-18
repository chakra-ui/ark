<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ClipboardLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface ClipboardLabelProps extends Assign<HTMLProps<'label'>, ClipboardLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useClipboardContext } from './use-clipboard-context.ts'

  let { ref = $bindable(null), ...props }: ClipboardLabelProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
