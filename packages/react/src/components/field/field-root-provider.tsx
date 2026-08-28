'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseFieldReturn } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'

interface RootProviderProps {
  value: UseFieldReturn
}

export interface FieldRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldRootProviderProps extends HTMLProps<'div'>, FieldRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const FieldRootProvider = forwardRef<HTMLDivElement, FieldRootProviderProps>((props, ref) => {
  const [{ value: field }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps<HTMLProps<'div'>>(field.getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} ref={ref} />
    </FieldProvider>
  )
})

FieldRootProvider.displayName = 'FieldRootProvider'
