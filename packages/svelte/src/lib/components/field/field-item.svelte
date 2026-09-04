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
  import type { HTMLProps } from '$lib/types'
  import { parts } from './field.anatomy.ts'
  import { FieldProvider, useFieldContext } from './use-field-context.ts'

  let { value, children }: FieldItemProps = $props()
  const parentField = useFieldContext()

  const itemField = $derived.by(() => {
    const parent = parentField?.()
    if (!parent) {
      throw new Error('Field.Item must be used within Field.Root')
    }

    const controlId = `${parent.ids.root}::item::${value}`
    const labelId = `${controlId}::label`

    const getControlProps = <T extends object>(getParentProps: () => T) => ({
      ...getParentProps(),
      id: controlId,
    })

    return {
      ...parent,
      ids: {
        ...parent.ids,
        control: controlId,
        label: labelId,
      },
      getLabelProps: () =>
        ({
          ...parent.getLabelProps(),
          id: labelId,
          for: controlId,
        }) as HTMLProps<'label'>,
      getInputProps: () =>
        ({
          ...getControlProps(parent.getInputProps),
          ...parts.input.attrs(controlId),
        }) as HTMLProps<'input'>,
      getSelectProps: () =>
        ({
          ...getControlProps(parent.getSelectProps),
          ...parts.select.attrs(controlId),
        }) as HTMLProps<'select'>,
      getTextareaProps: () =>
        ({
          ...getControlProps(parent.getTextareaProps),
          ...parts.textarea.attrs(controlId),
        }) as HTMLProps<'textarea'>,
    }
  })

  FieldProvider(() => itemField)
</script>

{#if children}
  {@render children()}
{/if}
