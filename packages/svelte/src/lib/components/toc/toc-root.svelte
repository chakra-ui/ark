<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'
  import type { UseTocProps } from './use-toc.svelte'

  export interface TocRootBaseProps extends UseTocProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TocRootProps extends Assign<HTMLProps<'div'>, TocRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { TocProvider } from './use-toc-context'
  import { useToc } from './use-toc.svelte'

  let { ref = $bindable(null), ...props }: TocRootProps = $props()
  const providedId = $props.id()

  const [useTocProps, localProps] = $derived(
    createSplitProps<UseTocProps>()(props, [
      'activeIds',
      'autoScroll',
      'defaultActiveIds',
      'getScrollEl',
      'id',
      'ids',
      'items',
      'onActiveChange',
      'rootMargin',
      'scrollBehavior',
      'threshold',
    ]),
  )

  const resolvedProps = $derived({ ...useTocProps, id: useTocProps.id ?? providedId })
  const toc = useToc(() => resolvedProps)

  TocProvider(toc)
</script>

<Ark as="div" bind:ref {...localProps} />
