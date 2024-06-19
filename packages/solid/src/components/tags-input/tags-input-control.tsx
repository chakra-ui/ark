import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

export interface TagsInputControlBaseProps extends PolymorphicProps<'div'> {}
export interface TagsInputControlProps extends HTMLProps<'div'>, TagsInputControlBaseProps {}

export const TagsInputControl = (props: TagsInputControlProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
