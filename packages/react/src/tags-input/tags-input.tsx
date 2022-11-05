import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { TagsInputProvider } from './tags-input-context'
import { useTagsInput, UseTagsInputProps } from './use-tags-input'

export type TagsInputProps = Assign<HTMLAtlasProps<'div'>, UseTagsInputProps>

export const TagsInput = forwardRef<'div', TagsInputProps>((props, ref) => {
  const [useTagsInputProps, divProps] = splitProps(props, [
    'addOnPaste',
    'allowEditTag',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'defaultValue',
    'delimiter',
    'dir',
    'disabled',
    'getRootNode',
    'ids',
    'inputValue',
    'invalid',
    'max',
    'maxLength',
    'name',
    'onChange',
    'onHighlight',
    'onInvalid',
    'onTagUpdate',
    'readonly',
    'translations',
    'validate',
    'value',
  ])
  const pinInput = useTagsInput(useTagsInputProps)
  const mergedProps = mergeProps(pinInput.rootProps, divProps)

  return (
    <TagsInputProvider value={pinInput}>
      <atlas.div {...mergedProps} ref={ref} />
    </TagsInputProvider>
  )
})
