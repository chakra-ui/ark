import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TagsInputItemDeleteTriggerProps
  extends HTMLProps<'button'>,
    TagsInputItemDeleteTriggerBaseProps {}

export const TagsInputItemDeleteTrigger = (props: TagsInputItemDeleteTriggerProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemDeleteTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} />
}
