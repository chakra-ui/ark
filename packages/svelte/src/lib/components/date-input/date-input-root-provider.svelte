<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import type { UseDateInputReturn } from './use-date-input.svelte.js'

  interface RootProviderProps {
    value: UseDateInputReturn
  }

  export interface DateInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
  export interface DateInputRootProviderProps extends Assign<HTMLProps<'div'>, DateInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { DateInputProvider } from './use-date-input-context.js'

  const { value, ...props }: DateInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  DateInputProvider(() => value())
</script>

<Ark as="div" {...mergedProps} />
