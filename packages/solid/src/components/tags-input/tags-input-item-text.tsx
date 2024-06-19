import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface TagsInputItemTextProps extends HTMLProps<'span'>, TagsInputItemTextBaseProps {}

export const TagsInputItemText = (props: TagsInputItemTextProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
