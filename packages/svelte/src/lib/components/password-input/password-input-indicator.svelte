<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PasswordInputIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    /**
     * The fallback content to display when the password is not visible.
     */
    fallback?: Snippet
  }
  export interface PasswordInputIndicatorProps extends Assign<HTMLProps<'span'>, PasswordInputIndicatorBaseProps> {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePasswordInputContext } from './use-password-input-context'

  let { ref = $bindable(null), fallback, children, ...props }: PasswordInputIndicatorProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getIndicatorProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {#if passwordInput().visible}
    {@render children?.()}
  {:else}
    {@render fallback?.()}
  {/if}
</Ark>
