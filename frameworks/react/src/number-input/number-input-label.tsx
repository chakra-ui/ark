import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputLabelProps extends HTMLArkProps<'label'> {}

export const NumberInputLabel = forwardRef<HTMLLabelElement, NumberInputLabelProps>(
  (props, ref) => {
    const context = useNumberInputContext()
    const mergedProps = mergeProps(context.labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

NumberInputLabel.displayName = 'NumberInputLabel'
