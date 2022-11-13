import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteButtonProps = Assign<HTMLArkProps<'button'>, TagProps>

export const TagDeleteButton = forwardRef<'button', TagDeleteButtonProps>((props, ref) => {
  const { getTagDeleteButtonProps } = useTagsInputContext()
  const [tagProps, buttonProps] = createSplitProps<TagProps>()(props, [
    'index',
    'disabled',
    'value',
  ])
  const mergedProps = mergeProps(getTagDeleteButtonProps(tagProps), buttonProps)

  return <ark.button {...mergedProps} ref={ref} />
})
