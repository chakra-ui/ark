'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseFieldProps, useField } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps {}
export interface FieldRootProps extends HTMLProps<'div'>, FieldRootBaseProps {}

const splitRootProps = createSplitProps<UseFieldProps>()

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>((props, ref) => {
  const [useFieldProps, localProps] = splitRootProps(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
    'readOnly',
    'required',
    'target',
  ])

  const field = useField(useFieldProps)
  const mergedProps = mergeProps<HTMLProps<'div'>>(field.getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} ref={composeRefs(ref, field.refs.rootRef)} />
    </FieldProvider>
  )
})

FieldRoot.displayName = 'FieldRoot'
