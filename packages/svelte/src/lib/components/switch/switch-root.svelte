<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseSwitchProps } from './use-switch.svelte'

  export interface SwitchRootBaseProps extends UseSwitchProps, PolymorphicProps<'label'> {}
  export interface SwitchRootProps extends Assign<HTMLProps<'label'>, SwitchRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSwitch } from './use-switch.svelte'
  import { SwitchProvider } from './use-switch-context'

  let { checked = $bindable(), ...props }: SwitchRootProps = $props()
  const providedId = $props.id()

  const [useSwitchProps, localProps] = $derived(
    createSplitProps<UseSwitchProps>()(props, [
      'checked',
      'defaultChecked',
      'disabled',
      'form',
      'id',
      'ids',
      'invalid',
      'label',
      'name',
      'onCheckedChange',
      'readOnly',
      'required',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseSwitchProps>({
    ...useSwitchProps,
    id: useSwitchProps.id ?? providedId,
    checked,
    onCheckedChange(details) {
      useSwitchProps.onCheckedChange?.(details)
      if (checked !== undefined) checked = details.checked
    },
  })

  const switchMachine = useSwitch(() => resolvedProps)
  const mergedProps = $derived(mergeProps(switchMachine().getRootProps(), localProps))

  SwitchProvider(switchMachine)
</script>

<Ark as="label" {...mergedProps} />
