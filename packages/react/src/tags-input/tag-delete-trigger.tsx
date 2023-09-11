import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import { type Assign } from '../types'
import { useTagsInputContext } from './tags-input-context'

// TODO export in Zag.js
type _TagProps = {
  index: string | number
  value: string
  disabled?: boolean
}

export type TagDeleteTriggerProps = Assign<HtmlArkProps<'button'>, _TagProps>

export const TagDeleteTrigger = forwardRef<HTMLButtonElement, TagDeleteTriggerProps>(
  (props, ref) => {
    const [tagProps, buttonProps] = createSplitProps<_TagProps>()(props, [
      'index',
      'disabled',
      'value',
    ])
    const { getTagDeleteTriggerProps } = useTagsInputContext()
    const mergedProps = mergeProps(getTagDeleteTriggerProps(tagProps), buttonProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagDeleteTrigger.displayName = 'TagDeleteTrigger'
