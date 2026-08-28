'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseEditableReturn } from './use-editable.ts'
import { EditableProvider } from './use-editable-context.ts'

interface RootProviderProps {
  value: UseEditableReturn
}

export interface EditableRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface EditableRootProviderProps extends HTMLProps<'div'>, EditableRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const EditableRootProvider = forwardRef<HTMLDivElement, EditableRootProviderProps>((props, ref) => {
  const [{ value: editable }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(editable.getRootProps(), localProps)

  return (
    <EditableProvider value={editable}>
      <ark.div {...mergedProps} ref={ref} />
    </EditableProvider>
  )
})

EditableRootProvider.displayName = 'EditableRootProvider'
