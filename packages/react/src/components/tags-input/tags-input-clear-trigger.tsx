import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputClearTriggerProps
  extends HTMLProps<'button'>,
    TagsInputClearTriggerBaseProps {}

export const TagsInputClearTrigger = forwardRef<HTMLButtonElement, TagsInputClearTriggerProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const mergedProps = mergeProps(tagsInput.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TagsInputClearTrigger.displayName = 'TagsInputClearTrigger'
