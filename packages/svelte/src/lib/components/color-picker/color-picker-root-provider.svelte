<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseColorPickerReturn } from './use-color-picker.svelte'

  export interface ColorPickerRootProviderBaseProps extends PolymorphicProps<'div'>, UsePresenceProps, RefAttribute {
    value: UseColorPickerReturn
  }
  export interface ColorPickerRootProviderProps extends Assign<HTMLProps<'div'>, ColorPickerRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'
  import { ColorPickerProvider } from './use-color-picker-context'

  let { ref = $bindable(), value, ...props }: ColorPickerRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(value().getRootProps(), localProps))

  ColorPickerProvider(value)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
