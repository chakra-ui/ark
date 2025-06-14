<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFieldProps } from './use-field.svelte'

  export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps<'div'> {
    ref?: Element | null
  }
  export interface FieldRootProps extends Assign<HTMLProps<'div'>, FieldRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { FieldProvider } from './use-field-context'
  import { useField } from './use-field.svelte'
  import { composeRefs } from '$lib/utils/compose-refs'

  let { ref = $bindable<Element | null>(null), ...props }: FieldRootProps = $props()

  const [useFieldProps, localProps] = $derived(
    createSplitProps<UseFieldProps>()(props, ['id', 'ids', 'disabled', 'invalid', 'readOnly', 'required']),
  )

  const providedId = $props.id()

  const machineProps = $derived.by(() => {
    return {
      ...useFieldProps,
      id: useFieldProps.id ?? providedId,
    }
  })

  const field = useField(() => machineProps)
  const mergedProps = $derived(mergeProps(field().getRootProps(), localProps))

  FieldProvider(field)
</script>

<Ark
  as="div"
  {...mergedProps}
  {...composeRefs((node) => {
    field().setRootRef(node)
    ref = node
  })}
/>
