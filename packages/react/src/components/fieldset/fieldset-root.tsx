'use client'

import { mergeProps } from '@zag-js/react'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseFieldsetProps, useFieldset } from './use-fieldset'
import { FieldsetProvider } from './use-fieldset-context'

export interface FieldsetRootBaseProps extends UseFieldsetProps, PolymorphicProps {}
export interface FieldsetRootProps extends HTMLProps<'fieldset'>, FieldsetRootBaseProps {}

const splitRootProps = createSplitProps<UseFieldsetProps>()

export const FieldsetRoot = ({ ref, ...props }: FieldsetRootProps) => {
  const [useFieldsetProps, localProps] = splitRootProps(props, ['id', 'disabled', 'invalid'])
  const fieldset = useFieldset(useFieldsetProps)
  const mergedProps = mergeProps<HTMLProps<'fieldset'>>(fieldset.getRootProps(), localProps)

  return (
    <FieldsetProvider value={fieldset}>
      <ark.fieldset {...mergedProps} ref={composeRefs(ref, fieldset.refs.rootRef)} />
    </FieldsetProvider>
  )
}

FieldsetRoot.displayName = 'FieldsetRoot'
