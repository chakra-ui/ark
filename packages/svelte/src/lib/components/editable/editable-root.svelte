<script module lang="ts">
  import type { Assign, HTMLProps } from '$lib/types'
  import type { UseEditableProps } from './use-editable.svelte'

  export interface EditableRootBaseProps extends UseEditableProps {}
  export interface EditableRootProps extends Assign<HTMLProps<'div'>, EditableRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { splitEditableProps } from './editable-split-props'
  import { EditableProvider } from './use-editable-context'
  import { useEditable } from './use-editable.svelte'

  let { value = $bindable(), ...props }: EditableRootProps = $props()

  const providedId = $props.id()

  const [useEditableProps, localProps] = splitEditableProps(props)

  const machineProps = $derived.by<UseEditableProps>(() => {
    return {
      ...useEditableProps,
      id: useEditableProps.id ?? providedId,
      value,
      onValueChange(details) {
        useEditableProps.onValueChange?.(details)
        value = details.value
      },
    }
  })

  const editable = useEditable(() => machineProps)
  const mergedProps = $derived(mergeProps(editable().getRootProps(), localProps))

  EditableProvider(editable)
</script>

<Ark as="div" {...mergedProps} />
