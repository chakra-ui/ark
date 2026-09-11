'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseTagsInputProps, useTagsInput } from './use-tags-input.ts'
import { TagsInputProvider } from './use-tags-input-context.ts'
import type { RootState } from '@zag-js/tags-input'

export interface TagsInputRootState extends RootState {}

export interface TagsInputRootBaseProps extends UseTagsInputProps, PolymorphicProps<TagsInputRootState> {}
export interface TagsInputRootProps extends Assign<HTMLProps<'div'>, TagsInputRootBaseProps> {}

const splitTagsInputProps = createSplitProps<UseTagsInputProps>()

export const TagsInputRoot = forwardRef<HTMLDivElement, TagsInputRootProps>((props, ref) => {
  const [useTagsInputProps, localProps] = splitTagsInputProps(props, [
    'addOnPaste',
    'allowDuplicates',
    'allowOverflow',
    'autoFocus',
    'blurBehavior',
    'defaultInputValue',
    'defaultValue',
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
    'placeholder',
    'readOnly',
    'required',
    'sanitizeValue',
    'translations',
    'validate',
    'value',
  ])
  const tagsInput = useTagsInput(useTagsInputProps)
  const mergedProps = mergeProps(tagsInput.getRootProps(), localProps)

  return (
    <TagsInputProvider value={tagsInput}>
      <ark.div {...mergedProps} ref={ref} state={tagsInput.getRootState()} />
    </TagsInputProvider>
  )
})

TagsInputRoot.displayName = 'TagsInputRoot'
