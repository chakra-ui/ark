'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'

export interface TagsInputItemInputBaseProps extends PolymorphicProps {}
export interface TagsInputItemInputProps extends HTMLProps<'input'>, TagsInputItemInputBaseProps {}

export const TagsInputItemInput = forwardRef<HTMLInputElement, TagsInputItemInputProps>((props, ref) => {
  const tagsInput = useTagsInputContext()
  const itemProps = useTagsInputItemPropsContext()
  const mergedProps = mergeProps(tagsInput.getItemInputProps(itemProps), props)

  return <ark.input {...mergedProps} ref={ref} />
})

TagsInputItemInput.displayName = 'TagsInputItemInput'
