<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ClipboardValueTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ClipboardValueTextProps extends Assign<HTMLProps<'span'>, ClipboardValueTextBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { useClipboardContext } from './use-clipboard-context'

  let { ref = $bindable(null), children, ...props }: ClipboardValueTextProps = $props()

  const clipboard = useClipboardContext()
</script>

<Ark as="span" bind:ref {...props}>
  {#if children}
    {@render children()}
  {:else}
    {clipboard().value}
  {/if}
</Ark>
