import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemInputBaseProps extends PolymorphicProps<'input'> {}
export interface TagsInputItemInputProps extends HTMLProps<'input'>, TagsInputItemInputBaseProps {}

export const TagsInputItemInput = (props: TagsInputItemInputProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
