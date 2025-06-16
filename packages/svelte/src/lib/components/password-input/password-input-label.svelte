<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface PasswordInputLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface PasswordInputLabelProps extends Assign<HTMLProps<'label'>, PasswordInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePasswordInputContext } from './use-password-input-context'

  const props: PasswordInputLabelProps = $props()
  const passwordInput = usePasswordInputContext()
  const mergedProps = $derived(mergeProps(passwordInput().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
