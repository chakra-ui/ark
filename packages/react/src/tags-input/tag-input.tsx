import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagInputProps = Assign<HTMLArkProps<'input'>, TagProps>

export const TagInput = forwardRef<'input', TagInputProps>((props, ref) => {
  const [tagProps, inputProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])
  const { getTagInputProps } = useTagsInputContext()
  const mergedProps = mergeProps(getTagInputProps(tagProps), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
