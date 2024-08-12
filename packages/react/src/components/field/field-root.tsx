import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseFieldProps, useField } from './use-field'
import { FieldProvider } from './use-field-context'

export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps {}
export interface FieldRootProps extends HTMLProps<'div'>, FieldRootBaseProps {}

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>((props, ref) => {
  const [useFieldProps, localProps] = createSplitProps<UseFieldProps>()(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
    'readOnly',
    'required',
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
