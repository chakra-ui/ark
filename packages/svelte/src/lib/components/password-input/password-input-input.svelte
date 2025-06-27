<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PasswordInputInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface PasswordInputInputProps extends Assign<HTMLProps<'input'>, PasswordInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePasswordInputContext } from './use-password-input-context'

  let { ref = $bindable(null), ...props }: PasswordInputInputProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
