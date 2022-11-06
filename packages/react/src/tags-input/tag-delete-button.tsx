import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagDeleteButtonProps = Assign<HTMLArkProps<'button'>, TagProps>

export const TagDeleteButton = forwardRef<'button', TagDeleteButtonProps>((props, ref) => {
  const { getTagDeleteButtonProps } = useTagsInputContext()
  const [tagProps, buttonProps] = splitProps(props, ['index', 'disabled', 'value'])
  const mergedProps = mergeProps(getTagDeleteButtonProps(tagProps), buttonProps)

  return <ark.button {...mergedProps} ref={ref} />
})
