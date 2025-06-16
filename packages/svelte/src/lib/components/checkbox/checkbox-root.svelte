<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseCheckboxProps } from './use-checkbox.svelte'

  export interface CheckboxRootBaseProps extends UseCheckboxProps, PolymorphicProps<'label'> {}
  export interface CheckboxRootProps extends Assign<HTMLProps<'label'>, CheckboxRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { CheckboxProvider } from './use-checkbox-context'
  import { splitCheckboxProps } from './split-checkbox-props.svelte'
  import { useCheckbox } from './use-checkbox.svelte'

  let { checked = $bindable(), ...props }: CheckboxRootProps = $props()
  const providedId = $props.id()

  const [useCheckboxProps, localProps] = $derived(splitCheckboxProps(props))

  const resolvedProps = $derived<UseCheckboxProps>({
    ...useCheckboxProps,
    id: useCheckboxProps.id ?? providedId,
    checked,
    onCheckedChange(details) {
      useCheckboxProps.onCheckedChange?.(details)
      checked = details.checked
    },
  })

  const checkbox = useCheckbox(() => resolvedProps)
  const mergedProps = $derived(mergeProps(checkbox().getRootProps(), localProps))

  CheckboxProvider(checkbox)
</script>

<Ark as="label" {...mergedProps} />
