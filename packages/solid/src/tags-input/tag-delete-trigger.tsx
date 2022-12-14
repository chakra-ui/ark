import type { Assign } from '@polymorphic-factory/solid'
import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { createSplitProps } from '../create-split-props'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteTriggerProps = Assign<{ children: JSX.Element }, TagProps>

export const TagDeleteTrigger = (props: TagDeleteTriggerProps) => {
  const [tagProps, localProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])
  const tagsInput = useTagsInputContext()

  const getChildren = children(() => localProps.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, { ...tagsInput().getTagDeleteTriggerProps(tagProps) })
    }
  })

  return <>{getChildren()}</>
}
