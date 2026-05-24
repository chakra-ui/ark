<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UsePresenceProps } from '../presence/index.ts'
  import type { UseColorPickerProps } from './use-color-picker.svelte.ts'

  export interface ColorPickerRootBaseProps
    extends UseColorPickerProps, UsePresenceProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerRootProps extends Assign<HTMLProps<'div'>, ColorPickerRootBaseProps> {}
</script>

<script lang="ts">
  import type { Color } from '@zag-js/color-utils'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.ts'
  import { splitColorPickerProps } from './split-color-picker-props.svelte.ts'
  import { ColorPickerProvider } from './use-color-picker-context.ts'
  import { useColorPicker } from './use-color-picker.svelte.ts'

  let {
    ref = $bindable(null),
    value = $bindable<Color>(),
    open = $bindable<boolean>(),
    ...props
  }: ColorPickerRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, colorPickerProps] = $derived(splitPresenceProps(props))
  const [useColorPickerProps, localProps] = $derived(splitColorPickerProps(colorPickerProps))

  const machineProps = $derived<UseColorPickerProps>({
    ...useColorPickerProps,
    id: useColorPickerProps.id ?? providedId,
    value,
    open,
    onValueChange(details) {
      useColorPickerProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
    onOpenChange(details) {
      useColorPickerProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
  })

  const colorPicker = useColorPicker(() => machineProps)
  const presence = usePresence(() => ({ present: colorPicker().open, ...presenceProps }))

  const mergedProps = $derived(mergeProps(colorPicker().getRootProps(), localProps))

  ColorPickerProvider(colorPicker)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
