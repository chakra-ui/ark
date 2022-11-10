import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps } from '../split-props'
import type { Assign } from '../types'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagInputProps = Assign<HTMLArkProps<'input'>, TagProps>

export const TagInput = forwardRef<'input', TagInputProps>((props, ref) => {
  const [tagProps, inputProps] = splitProps(props, ['index', 'disabled', 'value'])
  const { getTagInputProps } = useTagsInputContext()
  const mergedProps = mergeProps(getTagInputProps(tagProps), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
