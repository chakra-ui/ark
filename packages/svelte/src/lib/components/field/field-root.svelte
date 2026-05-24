<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFieldProps } from './use-field.svelte.ts'

  export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface FieldRootProps extends Assign<HTMLProps<'div'>, FieldRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { FieldProvider } from './use-field-context.ts'
  import { useField } from './use-field.svelte.ts'

  let { ref = $bindable(null), ...props }: FieldRootProps = $props()

  const [useFieldProps, localProps] = $derived(
    createSplitProps<UseFieldProps>()(props, ['id', 'ids', 'disabled', 'invalid', 'readOnly', 'required', 'target']),
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

  function setNode(node: Element | null) {
    field().setRootRef(node)
  }
</script>

<Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
