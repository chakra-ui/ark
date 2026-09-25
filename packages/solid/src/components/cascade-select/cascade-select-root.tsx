import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import type { TreeNode as CascadeSelectNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { type UseCascadeSelectProps, useCascadeSelect } from './use-cascade-select'
import { CascadeSelectProvider } from './use-cascade-select-context'

export interface CascadeSelectRootBaseProps<T extends CascadeSelectNode>
  extends UseCascadeSelectProps<T>, UsePresenceProps, PolymorphicProps<'div'> {}
export interface CascadeSelectRootProps<T extends CascadeSelectNode> extends Assign<
  HTMLProps<'div'>,
  CascadeSelectRootBaseProps<T>
> {}

export const CascadeSelectRoot = <T extends CascadeSelectNode>(props: CascadeSelectRootProps<T>) => {
  const [presenceProps, cascadeSelectProps] = splitPresenceProps(props)
  const [useCascadeSelectProps, localProps] = createSplitProps<UseCascadeSelectProps<T>>()(cascadeSelectProps, [
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
  ])

  const cascadeSelect = useCascadeSelect(useCascadeSelectProps)
  const presenceApi = usePresence(mergeProps(() => ({ present: cascadeSelect().open }), presenceProps))
  const mergedProps = mergeProps(() => cascadeSelect().getRootProps(), localProps)

  return (
    <CascadeSelectProvider value={cascadeSelect}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </CascadeSelectProvider>
  )
}
