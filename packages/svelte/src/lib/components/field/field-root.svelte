<script module lang="ts">
  import type { RootState } from '@zag-js/field'
  import type { Assign, HTMLProps, Optional, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseFieldProps } from './use-field.svelte.ts'

  export interface FieldRootState extends RootState {}
  export interface FieldRootBaseProps
    extends Optional<UseFieldProps, 'id'>, PolymorphicProps<'div', FieldRootState>, RefAttribute {}
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
    createSplitProps<Optional<UseFieldProps, 'id'>>()(props, [
      'id',
      'ids',
      'disabled',
      'invalid',
      'errors',
      'dirty',
      'touched',
      'readOnly',
      'required',
      'target',
      'validate',
      'validationMode',
      'onValidityChange',
    ]),
  )

  const providedId = $props.id()

  const machineProps = $derived.by<UseFieldProps>(() => ({
    ...useFieldProps,
    id: useFieldProps.id ?? providedId,
  }))

  const field = useField(() => machineProps)
  const mergedProps = $derived(mergeProps(field().getRootProps(), localProps))

  FieldProvider(field)
</script>

<Ark as="div" bind:ref {...mergedProps} state={field().getRootState()} />
