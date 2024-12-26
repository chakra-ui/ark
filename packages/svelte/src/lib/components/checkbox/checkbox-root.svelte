<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseCheckboxProps } from './use-checkbox.svelte'

  export interface CheckboxRootBaseProps extends UseCheckboxProps, PolymorphicProps<'label'> {}
  export interface CheckboxRootProps extends Assign<HTMLProps<'label'>, CheckboxRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { CheckboxProvider } from './use-checkbox-context'
  import { useCheckbox } from './use-checkbox.svelte'

  const props: CheckboxRootProps = $props()
  const [useCheckboxProps, localProps] = $derived(
    createSplitProps<UseCheckboxProps>()(props, [
      'checked',
      'defaultChecked',
      'disabled',
      'form',
      'id',
      'ids',
      'invalid',
      'name',
      'onCheckedChange',
      'readOnly',
      'required',
      'value',
    ]),
  )

  const checkbox = useCheckbox(reflect(() => useCheckboxProps))
  const mergedProps = $derived(mergeProps(checkbox().getRootProps(), localProps))

  CheckboxProvider(checkbox)
</script>

<Ark as="label" {...mergedProps} />
