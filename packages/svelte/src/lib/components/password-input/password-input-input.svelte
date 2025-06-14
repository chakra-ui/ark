<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PasswordInputInputBaseProps extends PolymorphicProps<'input'> {}
  export interface PasswordInputInputProps extends Assign<HTMLProps<'input'>, PasswordInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePasswordInputContext } from './use-password-input-context'

  const props: PasswordInputInputProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getInputProps(), props))
</script>

<Ark as="input" {...mergedProps} />
