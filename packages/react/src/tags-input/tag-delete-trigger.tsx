import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { type TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteTriggerProps = Assign<HTMLArkProps<'button'>, TagProps>

export const TagDeleteTrigger = forwardRef<'button', TagProps>((props, ref) => {
  const [tagProps, buttonProps] = createSplitProps<TagProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const { getTagDeleteTriggerProps } = useTagsInputContext()
  const mergedProps = mergeProps(getTagDeleteTriggerProps(tagProps), buttonProps)

  return <ark.button {...mergedProps} ref={ref} />
})
