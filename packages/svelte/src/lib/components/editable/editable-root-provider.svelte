<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseEditableReturn } from './use-editable.svelte.ts'

  export interface EditableRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseEditableReturn
  }
  export interface EditableRootProviderProps extends Assign<HTMLProps<'div'>, EditableRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { EditableProvider } from './use-editable-context.ts'

  let { ref = $bindable(null), value, ...props }: EditableRootProviderProps = $props()

  EditableProvider(() => value())

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
