import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearTriggerProps = HTMLArkProps<'button'>

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const tagsInput = useTagsInputContext()
  const triggerProps = mergeProps(() => tagsInput().clearTriggerProps, props)
  return <ark.button {...triggerProps} />
}
