import { Children, cloneElement, type ReactElement } from 'react'
import { createSplitProps } from '../create-split-props'
import { type Assign } from '../types'
import { type TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteTriggerProps = Assign<TagProps, { children: ReactElement }>

export const TagDeleteTrigger = (props: TagDeleteTriggerProps) => {
  const [tagProps, { children }] = createSplitProps<TagProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const { getTagDeleteTriggerProps } = useTagsInputContext()

  const onlyChild = Children.only(children)
  return cloneElement(onlyChild, getTagDeleteTriggerProps(tagProps))
}
