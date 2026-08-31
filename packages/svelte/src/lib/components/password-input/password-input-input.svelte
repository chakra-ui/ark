<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PasswordInputInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface PasswordInputInputProps extends Assign<HTMLProps<'input'>, PasswordInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { usePasswordInputContext } from './use-password-input-context.ts'

  let { ref = $bindable(null), value = $bindable(), ...props }: PasswordInputInputProps = $props()

  const passwordInput = usePasswordInputContext()
  const field = useFieldContext()

  const nativeInputProps: HTMLProps<'input'> = $derived({
    value,
    oninput(e) {
      value = e.currentTarget.value
    },
  })

  const mergedProps = $derived(mergeProps(passwordInput().getInputProps(), nativeInputProps, props))
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
