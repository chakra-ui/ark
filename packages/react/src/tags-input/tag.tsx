import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'

export type TagProps = {
  index: string | number
  value: string
  disabled?: boolean
}

export const Tag = forwardRef<'div', Assign<HTMLArkProps<'div'>, TagProps>>((props, ref) => {
  const [tagProps, divProps] = createSplitProps<TagProps>()(props, ['index', 'disabled', 'value'])
  const { getTagProps } = useTagsInputContext()
  const mergedProps = mergeProps(getTagProps(tagProps), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})
