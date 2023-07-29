import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'

// TODO export in Zag.js
type _TagProps = {
  index: string | number
  value: string
  disabled?: boolean
}

export type TagProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, _TagProps>

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const [tagProps, divProps] = createSplitProps<_TagProps>()(props, ['index', 'disabled', 'value'])
  const { getTagProps } = useTagsInputContext()
  const mergedProps = mergeProps(getTagProps(tagProps), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})

Tag.displayName = 'Tag'
