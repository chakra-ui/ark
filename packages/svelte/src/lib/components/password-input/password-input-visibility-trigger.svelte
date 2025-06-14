<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface PasswordInputVisibilityTriggerProps
    extends Assign<HTMLProps<'button'>, PasswordInputVisibilityTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePasswordInputContext } from './use-password-input-context'

  const props: PasswordInputVisibilityTriggerProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getVisibilityTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
