<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface FieldItemBaseProps {
    value: string
  }

  export interface FieldItemProps extends FieldItemBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import type { ItemProps } from '@zag-js/field'
  import { FieldProvider, useFieldContext } from './use-field-context.ts'

  let { value, children }: FieldItemProps = $props()
  const parentField = useFieldContext()

  const itemField = $derived.by(() => {
    const parent = parentField?.()
    if (!parent) {
      throw new Error('Field.Item must be used within Field.Root')
    }

    const control = parent.getItemControlId(value)
    const label = `${control}:label`
    const item = (itemProps?: ItemProps) => ({ item: value, ...itemProps })

    return {
      ...parent,
      ids: { ...parent.ids, control, label },
      getLabelProps: (itemProps?: ItemProps) => ({ ...parent.getLabelProps(item(itemProps)), id: label }),
      getControlProps: (itemProps?: ItemProps) => parent.getControlProps(item(itemProps)),
      getInputProps: (itemProps?: ItemProps) => parent.getInputProps(item(itemProps)),
      getTextareaProps: (itemProps?: ItemProps) => parent.getTextareaProps(item(itemProps)),
      getSelectProps: (itemProps?: ItemProps) => parent.getSelectProps(item(itemProps)),
    }
  })

  FieldProvider(() => itemField)
</script>

{#if children}
  {@render children()}
{/if}
