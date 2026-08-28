import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useTagsInputContext } from './use-tags-input-context.ts'

export interface TagsInputHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface TagsInputHiddenInputProps extends HTMLProps<'input'>, TagsInputHiddenInputBaseProps {}

export const TagsInputHiddenInput = (props: TagsInputHiddenInputProps) => {
  const tagsInput = useTagsInputContext()
  const mergedProps = mergeProps(() => tagsInput().getHiddenInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
