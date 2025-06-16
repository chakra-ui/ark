<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFieldsetReturn } from './use-fieldset.svelte'

  export interface FieldsetRootProviderBaseProps extends PolymorphicProps<'fieldset'> {
    value: UseFieldsetReturn
  }
  export interface FieldsetRootProviderProps extends Assign<HTMLProps<'fieldset'>, FieldsetRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { FieldsetProvider } from './use-fieldset-context'

  const props: FieldsetRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), props))

  FieldsetProvider(props.value)
</script>

<Ark as="fieldset" {...mergedProps} />
