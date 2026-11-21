<script module lang="ts">
  import type { RootState } from '@zag-js/fieldset'
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFieldsetProps } from './use-fieldset.svelte.ts'

  export interface FieldsetRootState extends RootState {}
  export interface FieldsetRootBaseProps
    extends Optional<UseFieldsetProps, 'id'>, PolymorphicProps<'fieldset', FieldsetRootState>, RefAttribute {}
  export interface FieldsetRootProps extends Assign<HTMLProps<'fieldset'>, FieldsetRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { FieldsetProvider } from './use-fieldset-context.ts'
  import { useFieldset } from './use-fieldset.svelte.ts'

  let { ref = $bindable(null), ...props }: FieldsetRootProps = $props()

  const [useFieldsetProps, localProps] = $derived(
    createSplitProps<Optional<UseFieldsetProps, 'id'>>()(props, ['id', 'ids', 'disabled', 'invalid']),
  )

  const providedId = $props.id()

  const machineProps = $derived.by<UseFieldsetProps>(() => ({
    ...useFieldsetProps,
    id: useFieldsetProps.id ?? providedId,
  }))

  const fieldset = useFieldset(() => machineProps)
  const mergedProps = $derived(mergeProps(fieldset().getRootProps(), localProps))

  FieldsetProvider(fieldset)
</script>

<Ark as="fieldset" bind:ref {...mergedProps} state={fieldset().getRootState()} />
