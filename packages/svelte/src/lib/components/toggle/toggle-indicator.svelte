<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { Snippet } from 'svelte'

  export interface ToggleIndicatorBaseProps extends PolymorphicProps<'div'> {
    /**
     * The fallback content to render when the toggle is not pressed.
     */
    fallback?: Snippet
  }

  export interface ToggleIndicatorProps extends Assign<HTMLProps<'div'>, ToggleIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useToggleContext } from './use-toggle-context'

  let { children, fallback, ...props }: ToggleIndicatorProps = $props()

  const toggle = useToggleContext()
  const mergedProps = $derived(mergeProps(toggle().getIndicatorProps(), props))
</script>

<Ark as="div" {...mergedProps}>
  {#if toggle().pressed}
    {@render children?.()}
  {:else if fallback}
    {@render fallback()}
  {/if}
</Ark>
