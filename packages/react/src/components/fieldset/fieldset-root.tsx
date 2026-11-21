'use client'

import type { RootState } from '@zag-js/fieldset'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseFieldsetProps, useFieldset } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'

export interface FieldsetRootState extends RootState {}
export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps<FieldsetRootState> {}
export interface FieldsetRootProps extends HTMLProps<'fieldset'>, FieldsetRootBaseProps {}

const splitRootProps = createSplitProps<UseFieldsetProps>()

export const FieldsetRoot = forwardRef<HTMLFieldSetElement, FieldsetRootProps>((props, ref) => {
  const [useFieldsetProps, localProps] = splitRootProps(props, ['id', 'ids', 'disabled', 'invalid'])
  const fieldset = useFieldset(useFieldsetProps)
  const mergedProps = mergeProps<HTMLProps<'fieldset'>>(fieldset.getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} ref={ref} state={fieldset.getRootState()} />
    </FieldsetProvider>
  )
})

FieldsetRoot.displayName = 'FieldsetRoot'
