<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFieldsetReturn } from './use-fieldset.svelte'

  export interface FieldsetRootProviderBaseProps extends PolymorphicProps<'fieldset'>, RefAttribute {
    value: UseFieldsetReturn
  }
  export interface FieldsetRootProviderProps extends Assign<HTMLProps<'fieldset'>, FieldsetRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { FieldsetProvider } from './use-fieldset-context'

  let { ref = $bindable(null), value, ...props }: FieldsetRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  FieldsetProvider(() => value())
</script>

<Ark as="fieldset" bind:ref {...mergedProps} />
