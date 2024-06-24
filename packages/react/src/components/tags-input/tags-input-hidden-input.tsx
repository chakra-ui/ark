import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputHiddenInputBaseProps extends PolymorphicProps {}
export interface TagsInputHiddenInputProps
  extends HTMLProps<'input'>,
    TagsInputHiddenInputBaseProps {}

export const TagsInputHiddenInput = forwardRef<HTMLInputElement, TagsInputHiddenInputProps>(
  (props, ref) => {
    const tagsInput = useTagsInputContext()
    const mergedProps = mergeProps(tagsInput.getHiddenInputProps(), props)
    const field = useFieldContext()

    return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
  },
)

TagsInputHiddenInput.displayName = 'TagsInputHiddenInput'
