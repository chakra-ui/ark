<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseCheckboxGroupReturn } from './use-checkbox-group.svelte.ts'

  export interface CheckboxGroupProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseCheckboxGroupReturn
  }
  export interface CheckboxGroupProviderProps extends Assign<HTMLProps<'div'>, CheckboxGroupProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { CheckboxGroupContextProvider } from './use-checkbox-group-context.ts'
  import { checkboxAnatomy } from './checkbox.anatomy.ts'

  let { ref = $bindable(null), value, ...props }: CheckboxGroupProviderProps = $props()

  const mergedProps = $derived(mergeProps({ role: 'group', ...checkboxAnatomy.build().group.attrs }, props))

  CheckboxGroupContextProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
