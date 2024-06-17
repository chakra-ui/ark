import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TagsInputItemDeleteTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    TagsInputItemDeleteTriggerBaseProps {}

export const TagsInputItemDeleteTrigger = (props: TagsInputItemDeleteTriggerProps) => {
  const api = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemDeleteTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} />
}
