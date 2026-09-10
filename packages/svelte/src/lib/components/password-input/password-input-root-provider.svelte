<script module lang="ts">
  import type { RootState } from '@zag-js/password-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePasswordInputReturn } from './use-password-input.svelte.ts'

  export interface PasswordInputRootProviderState extends RootState {}
  export interface PasswordInputRootProviderBaseProps
    extends PolymorphicProps<'div', PasswordInputRootProviderState>, RefAttribute {
    value: UsePasswordInputReturn
  }
  export interface PasswordInputRootProviderProps extends Assign<
    HTMLProps<'div'>,
    PasswordInputRootProviderBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { PasswordInputProvider } from './use-password-input-context.ts'

  let { ref = $bindable(null), value, ...props }: PasswordInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  PasswordInputProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} state={value().getRootState()} />
