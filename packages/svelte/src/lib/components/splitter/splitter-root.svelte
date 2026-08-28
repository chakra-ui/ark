<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSplitterProps } from './use-splitter.svelte.ts'

  export interface SplitterRootBaseProps extends UseSplitterProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SplitterRootProps extends Assign<HTMLProps<'div'>, SplitterRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { splitSplitterProps } from './splitter-split-props.svelte.ts'
  import { SplitterProvider } from './use-splitter-context.ts'
  import { useSplitter } from './use-splitter.svelte.ts'

  let { ref = $bindable(null), size = $bindable<number[]>(), ...props }: SplitterRootProps = $props()

  const [useSplitterProps, localProps] = $derived(splitSplitterProps(props))

  const id = $props.id()

  const machineProps = $derived.by(() => ({
    ...useSplitterProps,
    id: useSplitterProps.id ?? id,
    size,
    onResize: (details: any) => {
      useSplitterProps.onResize?.(details)
      size = details.size
    },
  }))

  const splitter = useSplitter(() => machineProps)
  const mergedProps = $derived(mergeProps(splitter().getRootProps(), localProps))

  SplitterProvider(splitter)
</script>

<Ark as="div" bind:ref {...mergedProps} />
