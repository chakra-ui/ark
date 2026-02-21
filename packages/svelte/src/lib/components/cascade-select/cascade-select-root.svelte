<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { TreeNode as CascadeSelectNode } from '../collection'
  import type { UsePresenceProps } from '../presence'
  import type { UseCascadeSelectProps } from './use-cascade-select.svelte'

  export interface CascadeSelectRootBaseProps<T extends CascadeSelectNode = CascadeSelectNode>
    extends UseCascadeSelectProps<T>,
      UsePresenceProps,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface CascadeSelectRootProps<T extends CascadeSelectNode = CascadeSelectNode> extends Assign<HTMLProps<'div'>, CascadeSelectRootBaseProps<T>> {}

  export type CascadeSelectRootComponentProps<T extends CascadeSelectNode = CascadeSelectNode, P = {}> = Assign<
    CascadeSelectRootProps<T>,
    P
  >

  export type CascadeSelectRootComponent<P = {}> = <T extends CascadeSelectNode>(props: CascadeSelectRootComponentProps<T, P>) => Snippet
</script>

<script lang="ts" generics="T extends CascadeSelectNode = CascadeSelectNode">
  import { Ark } from '$lib/components/factory'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps as _UsePresenceProps } from '../presence'
  import { CascadeSelectProvider } from './use-cascade-select-context'
  import { useCascadeSelect } from './use-cascade-select.svelte'

  let { ref = $bindable(null), ...props }: CascadeSelectRootProps<T> = $props()

  const [presenceProps, cascadeSelectProps] = $derived(splitPresenceProps(props))
  const [useCascadeSelectProps, localProps] = $derived(
    createSplitProps<UseCascadeSelectProps<T>>()(cascadeSelectProps, [
      'allowParentSelection',
      'closeOnSelect',
      'collection',
      'defaultHighlightedValue',
      'defaultOpen',
      'defaultValue',
      'disabled',
      'form',
      'formatValue',
      'highlightTrigger',
      'highlightedValue',
      'id',
      'ids',
      'invalid',
      'loopFocus',
      'multiple',
      'name',
      'onFocusOutside',
      'onHighlightChange',
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onValueChange',
      'open',
      'positioning',
      'readOnly',
      'required',
      'scrollToIndexFn',
      'value',
    ]),
  )

  const providedId = $props.id()
  const machineProps = $derived.by<UseCascadeSelectProps<T>>(() => ({ ...useCascadeSelectProps, id: props.id ?? providedId }))
  const cascadeSelect = useCascadeSelect<T>(() => machineProps)
  const presence = usePresence(() => ({ present: cascadeSelect().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(cascadeSelect().getRootProps(), localProps))

  CascadeSelectProvider(cascadeSelect)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
