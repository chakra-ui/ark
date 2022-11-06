import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputClearButtonProps = HTMLArkProps<'button'>

export const TagsInputClearButton = forwardRef<'button', TagsInputClearButtonProps>(
  (props, ref) => {
    const { clearButtonProps } = useTagsInputContext()
    const mergedProps = mergeProps(clearButtonProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)
