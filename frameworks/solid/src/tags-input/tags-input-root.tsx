import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTagsInput, type UseTagsInputProps } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

export interface TagsInputRootProps extends Assign<HTMLArkProps<'div'>, UseTagsInputProps> {}

export const TagsInputRoot = (props: TagsInputRootProps) => {
  const [useTagsInputProps, localProps] = createSplitProps<UseTagsInputProps>()(props, [
    'addOnPaste',
    'allowEditTag',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'delimiter',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
    'ids',
    'inputValue',
    'invalid',
    'max',
    'maxLength',
    'name',
    'onFocusOutside',
    'onHighlightChange',
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
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <TagsInputProvider value={api}>
      <ark.div {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </TagsInputProvider>
  )
}
