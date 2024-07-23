import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseFieldsetReturn } from './use-fieldset'
import { FieldsetProvider } from './use-fieldset-context'

interface RootProviderProps {
  value: UseFieldsetReturn
}

export interface FieldsetRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldsetRootProviderProps
  extends HTMLProps<'fieldset'>,
    FieldsetRootProviderBaseProps {}

export const FieldsetRootProvider = forwardRef<HTMLFieldSetElement, FieldsetRootProviderProps>(
  (props, ref) => {
    const [{ value: fieldset }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(fieldset.getRootProps(), localProps)

    return (
      <FieldsetProvider value={fieldset}>
        <ark.fieldset {...mergedProps} ref={ref} />
      </FieldsetProvider>
    )
  },
)

FieldsetRootProvider.displayName = 'FieldsetRootProvider'
