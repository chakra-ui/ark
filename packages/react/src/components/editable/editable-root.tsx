'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseEditableProps, useEditable } from './use-editable.ts'
import { EditableProvider } from './use-editable-context.ts'

export interface EditableRootBaseProps extends UseEditableProps, PolymorphicProps {}
export interface EditableRootProps extends Assign<HTMLProps<'div'>, EditableRootBaseProps> {}

const splitRootProps = createSplitProps<UseEditableProps>()

export const EditableRoot = forwardRef<HTMLDivElement, EditableRootProps>((props, ref) => {
  const [useEditableProps, localProps] = splitRootProps(props, [
    'activationMode',
    'autoResize',
    'defaultEdit',
    'defaultValue',
    'disabled',
    'edit',
    'finalFocusEl',
    'form',
    'id',
    'ids',
    'invalid',
    'maxLength',
    'name',
    'onEditChange',
    'onFocusOutside',
    'onInteractOutside',
    'onPointerDownOutside',
    'onValueChange',
    'onValueCommit',
    'onValueRevert',
    'placeholder',
    'readOnly',
    'required',
    'selectOnFocus',
    'submitMode',
    'translations',
    'value',
  ])
  const editable = useEditable(useEditableProps)
  const mergedProps = mergeProps(editable.getRootProps(), localProps)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} ref={ref} />
    </EditableProvider>
  )
})

EditableRoot.displayName = 'EditableRoot'
