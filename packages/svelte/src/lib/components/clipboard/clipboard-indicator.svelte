<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface ClipboardIndicatorBaseProps extends PolymorphicProps<'div'> {
    copied?: Snippet
  }
  export interface ClipboardIndicatorProps extends Assign<HTMLProps<'div'>, ClipboardIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  const { children, copied, ...localProps }: ClipboardIndicatorProps = $props()

  const clipboard = useClipboardContext()
  const mergedProps = $derived(mergeProps(clipboard().getIndicatorProps({ copied: clipboard().copied }), localProps))
</script>

<Ark as="div" {...mergedProps}>
  {#if clipboard().copied && copied}
    {@render copied()}
  {:else if children}
    {@render children()}
  {/if}
</Ark>
