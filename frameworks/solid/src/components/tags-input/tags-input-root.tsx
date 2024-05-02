import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseTagsInputProps, useTagsInput } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

export interface TagsInputRootProps extends Assign<HTMLArkProps<'div'>, UseTagsInputProps> {}

export const TagsInputRoot = (props: TagsInputRootProps) => {
  const [useTagsInputProps, localProps] = createSplitProps<UseTagsInputProps>()(props, [
    'addOnPaste',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'delimiter',
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
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <TagsInputProvider value={api}>
      <ark.div {...mergedProps} />
    </TagsInputProvider>
  )
}
