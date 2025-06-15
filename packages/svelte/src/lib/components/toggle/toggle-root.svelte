<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseToggleProps } from './use-toggle.svelte'

  export interface ToggleRootBaseProps extends UseToggleProps, PolymorphicProps<'button'> {}
  export interface ToggleRootProps extends Assign<HTMLProps<'button'>, ToggleRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory'
  import { useToggle } from './use-toggle.svelte'
  import { ToggleProvider } from './use-toggle-context'

  let { pressed = $bindable<boolean>(), ...props }: ToggleRootProps = $props()

  const [useToggleProps, localProps] = $derived(
    createSplitProps<UseToggleProps>()(props, ['pressed', 'defaultPressed', 'disabled', 'onPressedChange']),
  )

  const machineProps = $derived.by<UseToggleProps>(() => ({
    ...useToggleProps,
    pressed,
    onPressedChange(nextPressed) {
      useToggleProps.onPressedChange?.(nextPressed)
      pressed = nextPressed
    },
  }))

  const toggle = useToggle(() => machineProps)
  const mergedProps = $derived(mergeProps(toggle().getRootProps(), localProps))

  ToggleProvider(toggle)
</script>

<Ark as="button" {...mergedProps} />
