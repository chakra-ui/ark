import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { type UseCascadeSelectProps, useCascadeSelect } from './use-cascade-select'
import { CascadeSelectProvider } from './use-cascade-select-context'
import type { TreeNode as CascadeSelectNode } from '../collection'

export interface CascadeSelectRootBaseProps<T extends CascadeSelectNode>
  extends UseCascadeSelectProps<T>, UsePresenceProps, PolymorphicProps {}
export interface CascadeSelectRootProps<T extends CascadeSelectNode> extends Assign<
  HTMLProps<'div'>,
  CascadeSelectRootBaseProps<T>
> {}

const CascadeSelectImpl = <T extends CascadeSelectNode>(
  props: CascadeSelectRootProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
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
  const presence = usePresence(mergeProps({ present: cascadeSelect.open }, presenceProps))
  const mergedProps = mergeProps(cascadeSelect.getRootProps(), localProps)

  return (
    <CascadeSelectProvider value={cascadeSelect}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </CascadeSelectProvider>
  )
}

export type CascadeSelectRootComponentProps<T extends CascadeSelectNode, P = {}> = Assign<
  CascadeSelectRootProps<T>,
  P
> &
  React.RefAttributes<HTMLDivElement>

export type CascadeSelectRootComponent<P = {}> = <T extends CascadeSelectNode>(
  props: CascadeSelectRootComponentProps<T, P>,
) => JSX.Element

export const CascadeSelectRoot = forwardRef(CascadeSelectImpl) as CascadeSelectRootComponent
