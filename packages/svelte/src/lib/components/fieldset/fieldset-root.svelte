<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseFieldsetProps } from './use-fieldset.svelte'

  export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps<'fieldset'> {
    ref?: Element | null
  }
  export interface FieldsetRootProps extends Assign<HTMLProps<'fieldset'>, FieldsetRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { FieldsetProvider } from './use-fieldset-context'
  import { useFieldset } from './use-fieldset.svelte'

  let { ref = $bindable<Element | null>(null), ...props }: FieldsetRootProps = $props()

  const [useFieldsetProps, localProps] = $derived(
    createSplitProps<UseFieldsetProps>()(props, ['id', 'disabled', 'invalid']),
  )

  const providedId = $props.id()

  const machineProps = $derived.by<UseFieldsetProps>(() => {
    return {
      ...useFieldsetProps,
      id: useFieldsetProps.id ?? providedId,
    }
  })

  const fieldset = useFieldset(() => machineProps)
  const mergedProps = $derived(mergeProps(fieldset().getRootProps(), localProps))

  FieldsetProvider(fieldset)

  function setNode(node: Element | null) {
    fieldset().setRootRef(node)
    ref = node
  }
</script>

<Ark as="fieldset" {...mergedProps} {@attach setNode} />
