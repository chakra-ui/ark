<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PasswordInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PasswordInputControlProps extends Assign<HTMLProps<'div'>, PasswordInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePasswordInputContext } from './use-password-input-context.ts'

  let { ref = $bindable(null), ...props }: PasswordInputControlProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
