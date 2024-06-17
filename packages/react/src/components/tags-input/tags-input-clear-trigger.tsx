import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputClearTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    TagsInputClearTriggerBaseProps {}

export const TagsInputClearTrigger = forwardRef<HTMLButtonElement, TagsInputClearTriggerProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const mergedProps = mergeProps(tagsInput.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
