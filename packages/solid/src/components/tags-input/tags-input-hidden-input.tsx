import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface TagsInputHiddenInputProps
  extends HTMLProps<'input'>,
    TagsInputHiddenInputBaseProps {}

export const TagsInputHiddenInput = (props: TagsInputHiddenInputProps) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(() => tagsInput().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
