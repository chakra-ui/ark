<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PasswordInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface PasswordInputLabelProps extends Assign<HTMLProps<'label'>, PasswordInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePasswordInputContext } from './use-password-input-context.ts'

  let { ref = $bindable(null), ...props }: PasswordInputLabelProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
