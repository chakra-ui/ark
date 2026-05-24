<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseCheckboxReturn } from './use-checkbox.svelte.ts'

  export interface CheckboxRootProviderBaseProps extends PolymorphicProps<'label'>, RefAttribute {
    value: UseCheckboxReturn
  }
  export interface CheckboxRootProviderProps extends Assign<HTMLProps<'label'>, CheckboxRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { CheckboxProvider } from './use-checkbox-context.ts'

  let { ref = $bindable(null), value, ...props }: CheckboxRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  CheckboxProvider(() => value())
</script>

<Ark as="label" bind:ref {...mergedProps} />
