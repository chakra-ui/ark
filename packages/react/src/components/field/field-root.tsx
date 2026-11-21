'use client'

import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseFieldProps, useField } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

export interface FieldRootState extends RootState {}
export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps<FieldRootState> {}
export interface FieldRootProps extends HTMLProps<'div'>, FieldRootBaseProps {}

const splitRootProps = createSplitProps<UseFieldProps>()

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>((props, ref) => {
  const [useFieldProps, localProps] = splitRootProps(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
    'errors',
    'dirty',
    'touched',
    'readOnly',
    'required',
    'target',
    'validate',
    'validationMode',
    'onValidityChange',
  ])
  const field = useField(useFieldProps)
  const mergedProps = mergeProps<HTMLProps<'div'>>(field.getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} ref={ref} state={field.getRootState()} />
    </FieldProvider>
  )
})

FieldRoot.displayName = 'FieldRoot'
