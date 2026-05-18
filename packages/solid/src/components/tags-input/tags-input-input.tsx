import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputInputBaseProps extends PolymorphicProps<'input'> {}
export interface TagsInputInputProps extends HTMLProps<'input'>, TagsInputInputBaseProps {}

export const TagsInputInput = (props: TagsInputInputProps) => {
  const api = useTagsInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
