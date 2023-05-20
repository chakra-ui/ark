import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { type TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteTriggerProps = Assign<HTMLArkProps<'button'>, TagProps>

export const TagDeleteTrigger = (props: TagDeleteTriggerProps) => {
  const [tagParams, restProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])

  const api = useTagsInputContext()

  const triggerProps = mergeProps(() => api().getTagDeleteTriggerProps(tagParams), restProps)
  return <ark.button {...triggerProps} />
}
