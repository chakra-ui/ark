import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { useTagsInputContext } from './tags-input-context'

export type TagProps = {
  index: string | number
  value: string
  disabled?: boolean
}

export const Tag = forwardRef<'div', Assign<HTMLArkProps<'div'>, TagProps>>((props, ref) => {
  const [tagProps, divProps] = splitProps(props, ['index', 'disabled', 'value'])
  const { getTagProps } = useTagsInputContext()
  const mergedProps = mergeProps(getTagProps(tagProps), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})
