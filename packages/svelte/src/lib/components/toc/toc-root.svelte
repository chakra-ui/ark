<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '../../types'
  import type { UseTocProps } from './use-toc.svelte'

  export interface TocRootBaseProps extends UseTocProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TocRootProps extends Assign<HTMLProps<'div'>, TocRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props'
  import { Ark } from '../factory'
  import { TocProvider } from './use-toc-context'
  import { useToc } from './use-toc.svelte'

  let { ref = $bindable(null), activeIds = $bindable<string[]>(), ...props }: TocRootProps = $props()
  const providedId = $props.id()

  const [useTocProps, localProps] = $derived(
    createSplitProps<UseTocProps>()(props, [
      'activeIds',
      'autoScroll',
      'defaultActiveIds',
      'scrollEl',
      'id',
      'ids',
      'items',
      'onActiveChange',
      'rootMargin',
      'scrollBehavior',
      'threshold',
    ]),
  )

  const resolvedProps = $derived<UseTocProps>({
    ...useTocProps,
    id: useTocProps.id ?? providedId,
    activeIds,
    onActiveChange(details) {
      useTocProps.onActiveChange?.(details)
      if (activeIds !== undefined) activeIds = details.activeIds
    },
  })
  const toc = useToc(() => resolvedProps)
  const mergedProps = $derived(mergeProps(toc().getRootProps(), localProps))

  TocProvider(toc)
</script>

<Ark as="div" bind:ref {...mergedProps} />
