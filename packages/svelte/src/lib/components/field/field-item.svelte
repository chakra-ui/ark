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
  import { parts } from './field.anatomy'
  import { FieldProvider, useFieldContext } from './use-field-context'

  let { value, children }: FieldItemProps = $props()
  const parentField = useFieldContext()

  const itemField = $derived.by(() => {
    const parent = parentField?.()
    if (!parent) {
      throw new Error('Field.Item must be used within Field.Root')
    }

    const controlId = `${parent.ids.root}::item::${value}`
    const labelId = `${controlId}::label`

    const getControlProps = () =>
      ({
        ...parent.getInputProps(),
        id: controlId,
      }) as HTMLProps<'input'>

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
          ...getControlProps(),
          ...parts.input.attrs,
        }) as HTMLProps<'input'>,
      getSelectProps: () =>
        ({
          ...getControlProps(),
          ...parts.select.attrs,
        }) as HTMLProps<'select'>,
      getTextareaProps: () =>
        ({
          ...getControlProps(),
          ...parts.textarea.attrs,
        }) as HTMLProps<'textarea'>,
    }
  })

  FieldProvider(() => itemField)
</script>

{#if children}
  {@render children()}
{/if}
