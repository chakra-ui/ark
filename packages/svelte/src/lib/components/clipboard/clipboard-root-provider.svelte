<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseClipboardReturn } from './use-clipboard.svelte.ts'

  export interface ClipboardRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseClipboardReturn
  }
  export interface ClipboardRootProviderProps extends Assign<HTMLProps<'div'>, ClipboardRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { ClipboardProvider } from './use-clipboard-context.ts'

  let { ref = $bindable(null), value, ...props }: ClipboardRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ClipboardProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
