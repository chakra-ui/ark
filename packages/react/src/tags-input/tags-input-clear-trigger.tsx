import { Children, cloneElement, type ReactElement } from 'react'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearTriggerProps = { children: ReactElement }

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const { clearTriggerProps } = useTagsInputContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, clearTriggerProps)
}
