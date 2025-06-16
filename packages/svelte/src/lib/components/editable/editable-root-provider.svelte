<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseEditableReturn } from './use-editable.svelte'

  export interface EditableRootProviderBaseProps extends PolymorphicProps<'div'> {
    value: UseEditableReturn
  }
  export interface EditableRootProviderProps extends Assign<HTMLProps<'div'>, EditableRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { EditableProvider } from './use-editable-context'

  let { value, ...props }: EditableRootProviderProps = $props()

  EditableProvider(value)

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
</script>

<Ark as="div" {...mergedProps} />
