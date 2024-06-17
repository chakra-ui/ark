import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseTagsInputProps, useTagsInput } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

export interface TagsInputRootBaseProps extends UseTagsInputProps, PolymorphicProps<'div'> {}
export interface TagsInputRootProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    TagsInputRootBaseProps {}

export const TagsInputRoot = (props: TagsInputRootProps) => {
  const [useTagsInputProps, localProps] = createSplitProps<UseTagsInputProps>()(props, [
    'addOnPaste',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'delimiter',
    'defaultValue',
    'disabled',
    'editable',
    'form',
    'id',
    'ids',
    'inputValue',
    'invalid',
    'max',
    'maxLength',
    'name',
    'onFocusOutside',
    'onHighlightChange',
    'onInputValueChange',
    'onInteractOutside',
    'onPointerDownOutside',
    'onValueChange',
    'onValueInvalid',
    'readOnly',
    'translations',
    'validate',
    'value',
  ])

  const api = useTagsInput(useTagsInputProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <TagsInputProvider value={api}>
      <ark.div {...mergedProps} />
    </TagsInputProvider>
  )
}
