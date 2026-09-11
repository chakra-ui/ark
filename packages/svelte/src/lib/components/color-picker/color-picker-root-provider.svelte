<script module lang="ts">
  import type { RootState } from '@zag-js/color-picker'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseColorPickerReturn } from './use-color-picker.svelte.ts'

  export interface ColorPickerRootProviderState extends RootState {}
  export interface ColorPickerRootProviderBaseProps
    extends PolymorphicProps<'div', ColorPickerRootProviderState>, UsePresenceProps, RefAttribute {
    value: UseColorPickerReturn
  }
  export interface ColorPickerRootProviderProps extends Assign<HTMLProps<'div'>, ColorPickerRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence/index.ts'
  import { ColorPickerProvider } from './use-color-picker-context.ts'

  let { ref = $bindable(null), value, ...props }: ColorPickerRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(value().getRootProps(), localProps))

  ColorPickerProvider(() => value())
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} state={value().getRootState()} />
