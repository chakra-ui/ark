import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TagsInputClearTriggerProps
  extends HTMLProps<'button'>,
    TagsInputClearTriggerBaseProps {}

export const TagsInputClearTrigger = (props: TagsInputClearTriggerProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
