<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseCheckboxGroupProps } from './use-checkbox-group.svelte'

  export interface CheckboxGroupBaseProps extends UseCheckboxGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CheckboxGroupProps extends Assign<HTMLProps<'div'>, CheckboxGroupBaseProps> {}
</script>

<script lang="ts">
  import { Ark } from '../factory'
  import { checkboxAnatomy } from './checkbox.anatomy'
  import { CheckboxGroupProvider } from './use-checkbox-group-context'
  import { splitCheckboxGroupProps } from './split-checkbox-group-props.svelte'
  import { useCheckboxGroup } from './use-checkbox-group.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: CheckboxGroupProps = $props()

  const [checkboxGroupProps, localProps] = $derived(splitCheckboxGroupProps(props))

  const resolvedProps = $derived<UseCheckboxGroupProps>({
    ...checkboxGroupProps,
    value,
    onValueChange(newValue) {
      checkboxGroupProps.onValueChange?.(newValue)
      value = newValue
    },
  })

  const checkboxGroup = useCheckboxGroup(() => resolvedProps)

  CheckboxGroupProvider(checkboxGroup)
</script>

<Ark as="div" bind:ref role="group" {...checkboxAnatomy.build().group.attrs} {...localProps} />
