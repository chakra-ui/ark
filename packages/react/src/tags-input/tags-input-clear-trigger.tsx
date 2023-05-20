import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearTriggerProps = HTMLArkProps<'button'>

export const TagsInputClearTrigger = forwardRef<'button'>((props, ref) => {
  const { clearTriggerProps } = useTagsInputContext()
  const mergedProps = mergeProps(clearTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
