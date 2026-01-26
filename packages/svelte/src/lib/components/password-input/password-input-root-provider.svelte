<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UsePasswordInputReturn } from './use-password-input.svelte'

  interface RootProviderProps {
    value: UsePasswordInputReturn
  }

  export interface PasswordInputRootProviderBaseProps extends RootProviderProps, RefAttribute {}
  export interface PasswordInputRootProviderProps extends Assign<HTMLProps<'div'>, PasswordInputRootProviderBaseProps> {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PasswordInputProvider } from './use-password-input-context'

  let { ref = $bindable(null), ...props }: PasswordInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), props))

  PasswordInputProvider(() => props.value())
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {@render props.children?.()}
</Ark>
