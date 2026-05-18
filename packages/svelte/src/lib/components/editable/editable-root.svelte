<script module lang="ts">
  import type { Assign, HTMLProps, RefAttribute } from '$lib/types'
  import type { UseEditableProps } from './use-editable.svelte.ts'

  export interface EditableRootBaseProps extends UseEditableProps, RefAttribute {}
  export interface EditableRootProps extends Assign<HTMLProps<'div'>, EditableRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { splitEditableProps } from './editable-split-props.ts'
  import { EditableProvider } from './use-editable-context.ts'
  import { useEditable } from './use-editable.svelte.ts'

  let { ref = $bindable(null), value = $bindable(), ...props }: EditableRootProps = $props()

  const providedId = $props.id()

  const [useEditableProps, localProps] = $derived(splitEditableProps(props))

  const machineProps = $derived.by<UseEditableProps>(() => {
    return {
      ...useEditableProps,
      id: useEditableProps.id ?? providedId,
      value,
      onValueChange(details) {
        useEditableProps.onValueChange?.(details)
        if (value !== undefined) value = details.value
      },
    }
  })

  const editable = useEditable(() => machineProps)
  const mergedProps = $derived(mergeProps(editable().getRootProps(), localProps))

  EditableProvider(editable)
</script>

<Ark as="div" bind:ref {...mergedProps} />
