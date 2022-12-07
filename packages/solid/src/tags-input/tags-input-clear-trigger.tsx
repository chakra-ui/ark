import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearTriggerProps = { children: JSX.Element }

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const tagsInput = useTagsInputContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, { ...tagsInput().clearButtonProps })
    }
  })

  return <>{getChildren()}</>
}
