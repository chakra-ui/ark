import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearTriggerProps = { children: JSX.Element }

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const tagsInput = useTagsInputContext()
  const triggerProps = tagsInput().clearTriggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
