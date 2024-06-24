import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseFieldReturn } from './use-field'
import { FieldProvider } from './use-field-context'

interface RootProviderProps {
  value: UseFieldReturn
}

export interface FieldRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldRootProviderProps extends HTMLProps<'div'>, FieldRootProviderBaseProps {}

export const FieldRootProvider = forwardRef<HTMLDivElement, FieldRootProviderProps>(
  (props, ref) => {
    const [{ value: field }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
    const mergedProps = mergeProps<HTMLProps<'div'>>(field.getRootProps(), localProps)

    return (
      <FieldProvider value={field}>
        <ark.div {...mergedProps} ref={ref} />
      </FieldProvider>
    )
  },
)

FieldRootProvider.displayName = 'FieldRootProvider'
