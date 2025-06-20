<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UsePresenceProps } from '../presence'
  import type { UseColorPickerProps } from './use-color-picker.svelte'

  export interface ColorPickerRootBaseProps extends UseColorPickerProps, UsePresenceProps, PolymorphicProps<'div'> {}
  export interface ColorPickerRootProps extends Assign<HTMLProps<'div'>, ColorPickerRootBaseProps> {}
</script>

<script lang="ts">
  import type { Color } from '@zag-js/color-utils'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
  import { splitColorPickerProps } from './split-color-picker-props.svelte'
  import { ColorPickerProvider } from './use-color-picker-context'
  import { useColorPicker } from './use-color-picker.svelte'

  let { value = $bindable<Color>(), open = $bindable<boolean>(), ...props }: ColorPickerRootProps = $props()
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
      value = details.value
    },
    onOpenChange(details) {
      useColorPickerProps.onOpenChange?.(details)
      open = details.open
    },
  })

  const colorPicker = useColorPicker(() => machineProps)
  const presence = usePresence(() => ({ present: colorPicker().open, ...presenceProps }))

  const mergedProps = $derived(mergeProps(colorPicker().getRootProps(), localProps))

  ColorPickerProvider(colorPicker)
  PresenceProvider(presence)
</script>

<Ark as="div" {...mergedProps} />
