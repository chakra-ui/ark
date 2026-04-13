<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'
  import type { UseTocProps } from './use-toc.svelte'

  export interface TocNavBaseProps extends Partial<UseTocProps>, PolymorphicProps<'nav'>, RefAttribute {
    placement?: 'left' | 'right'
  }
  export interface TocNavProps extends Assign<HTMLProps<'nav'>, TocNavBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '../../utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { hasContext } from 'svelte'
  import { Ark } from '../factory'
  import { TocContextId, TocProvider, useTocContext } from './use-toc-context'
  import { useToc } from './use-toc.svelte'

  let { ref = $bindable(null), ...props }: TocNavProps = $props()
  const providedId = $props.id()

  const hasParentToc = hasContext(TocContextId)

  const [{ placement, ...useTocAndRest }, localProps] = $derived(
    createSplitProps<Partial<UseTocProps> & { placement?: 'left' | 'right' }>()(props, [
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
      'placement',
    ]),
  )

  const resolvedProps = $derived({ ...useTocAndRest, id: useTocAndRest.id ?? providedId })
  const ownToc = useToc(() => resolvedProps as UseTocProps)

  const parentToc = hasParentToc ? useTocContext() : null
  const toc = parentToc ?? ownToc

  const mergedProps = $derived(mergeProps(toc().getRootProps(), localProps))

  if (!hasParentToc) {
    TocProvider(ownToc)
  }
</script>

<Ark as="nav" bind:ref {...mergedProps} data-placement={placement} />
