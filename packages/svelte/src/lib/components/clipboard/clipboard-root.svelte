<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseClipboardProps } from './use-clipboard.svelte'

  export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ClipboardRootProps extends Assign<HTMLProps<'div'>, ClipboardRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { splitClipboardProps } from './clipboard-split-props.svelte'
  import { ClipboardProvider } from './use-clipboard-context'
  import { useClipboard } from './use-clipboard.svelte'

  let { ref = $bindable(null), value = $bindable(), ...props }: ClipboardRootProps = $props()
  const providedId = $props.id()

  const [useClipboardProps, localProps] = $derived(splitClipboardProps(props))

  const resolvedProps = $derived<UseClipboardProps>({
    ...useClipboardProps,
    id: useClipboardProps.id ?? providedId,
    value,
    onValueChange(details) {
      useClipboardProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const clipboard = useClipboard(() => resolvedProps)
  const mergedProps = $derived(mergeProps(clipboard().getRootProps(), localProps))

  ClipboardProvider(clipboard)
</script>

<Ark bind:ref as="div" {...mergedProps} />
