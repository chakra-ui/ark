<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFieldReturn } from './use-field.svelte'

  export interface FieldRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseFieldReturn
  }
  export interface FieldRootProviderProps extends Assign<HTMLProps<'div'>, FieldRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { FieldProvider } from './use-field-context'

  const props: FieldRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), props))

  FieldProvider(props.value)
</script>

<Ark as="div" {...mergedProps} />
