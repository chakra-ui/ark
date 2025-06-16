<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PasswordInputControlBaseProps extends PolymorphicProps<'div'> {}
  export interface PasswordInputControlProps extends Assign<HTMLProps<'div'>, PasswordInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePasswordInputContext } from './use-password-input-context'

  const props: PasswordInputControlProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
