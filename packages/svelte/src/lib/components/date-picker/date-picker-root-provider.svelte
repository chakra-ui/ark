<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import type { UsePresenceProps } from '../presence/index.js'
  import type { UseDatePickerReturn } from './use-date-picker.svelte.js'

  interface RootProviderProps {
    value: UseDatePickerReturn
  }

  export interface DatePickerRootProviderBaseProps
    extends RootProviderProps,
      UsePresenceProps,
      PolymorphicProps<'div'> {}
  export interface DatePickerRootProviderProps extends Assign<HTMLProps<'div'>, DatePickerRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.js'
  import { DatePickerProvider } from './use-date-picker-context.js'

  const { value, ...props }: DatePickerRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(value().getRootProps(), localProps))

  DatePickerProvider(value)
  PresenceProvider(presence)
</script>

<Ark as="div" {...mergedProps} />
