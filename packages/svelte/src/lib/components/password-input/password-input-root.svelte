<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePasswordInputProps } from './use-password-input.svelte.ts'

  export interface PasswordInputRootBaseProps extends UsePasswordInputProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface PasswordInputRootProps extends Assign<HTMLProps<'div'>, PasswordInputRootBaseProps> {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.ts'
  import { Ark } from '../factory/index.ts'
  import { PasswordInputProvider } from './use-password-input-context.ts'
  import { usePasswordInput } from './use-password-input.svelte.ts'

  let { ref = $bindable(null), visible = $bindable(), ...props }: PasswordInputRootProps = $props()
  const providedId = $props.id()

  const [usePasswordInputProps, localProps] = $derived(
    createSplitProps<UsePasswordInputProps>()(props, [
      'autoComplete',
      'defaultVisible',
      'disabled',
      'id',
      'ids',
      'ignorePasswordManagers',
      'invalid',
      'name',
      'onVisibilityChange',
      'readOnly',
      'required',
      'translations',
      'visible',
    ]),
  )

  const resolvedProps = $derived<UsePasswordInputProps>({
    ...usePasswordInputProps,
    id: usePasswordInputProps.id ?? providedId,
    visible,
    onVisibilityChange(details) {
      usePasswordInputProps.onVisibilityChange?.(details)
      if (visible !== undefined) visible = details.visible
    },
  })

  const passwordInput = usePasswordInput(() => resolvedProps)
  const mergedProps = $derived(mergeProps(passwordInput().getRootProps(), localProps))

  PasswordInputProvider(passwordInput)
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {@render props.children?.()}
</Ark>
