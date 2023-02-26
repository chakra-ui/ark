import type { Assign } from '@polymorphic-factory/solid'
import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { createSplitProps } from '../create-split-props'
import { ssrSpread } from '../ssr-spread'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteTriggerProps = Assign<{ children: JSX.Element }, TagProps>

export const TagDeleteTrigger = (props: TagDeleteTriggerProps) => {
  const [tagProps, localProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])
  const tagsInput = useTagsInputContext()
  const triggerProps = tagsInput().getTagDeleteTriggerProps(tagProps)

  const getChildren = children(() => ssrSpread(localProps.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
