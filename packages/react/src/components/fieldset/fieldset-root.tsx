'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseFieldsetProps, useFieldset } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'

export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps {}
export interface FieldsetRootProps extends HTMLProps<'fieldset'>, FieldsetRootBaseProps {}

const splitRootProps = createSplitProps<UseFieldsetProps>()

export const FieldsetRoot = forwardRef<HTMLFieldSetElement, FieldsetRootProps>((props, ref) => {
  const [useFieldsetProps, localProps] = splitRootProps(props, ['id', 'disabled', 'invalid'])
  const fieldset = useFieldset(useFieldsetProps)
  const mergedProps = mergeProps<HTMLProps<'fieldset'>>(fieldset.getRootProps(), localProps)
  const composedRefs = useComposedRefs(ref, fieldset.refs.rootRef)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} ref={composedRefs} />
    </FieldsetProvider>
  )
})

FieldsetRoot.displayName = 'FieldsetRoot'
