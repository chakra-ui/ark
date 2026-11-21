'use client'

import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseFieldsetReturn } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'

interface RootProviderProps {
  value: UseFieldsetReturn
}

export interface FieldsetRootProviderState extends RootState {}
export interface FieldsetRootProviderBaseProps extends RootProviderProps, PolymorphicProps<FieldsetRootProviderState> {}
export interface FieldsetRootProviderProps extends HTMLProps<'fieldset'>, FieldsetRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const FieldsetRootProvider = forwardRef<HTMLFieldSetElement, FieldsetRootProviderProps>((props, ref) => {
  const [{ value: fieldset }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps<HTMLProps<'fieldset'>>(fieldset.getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} ref={ref} state={fieldset.getRootState()} />
    </FieldsetProvider>
  )
})

FieldsetRootProvider.displayName = 'FieldsetRootProvider'
