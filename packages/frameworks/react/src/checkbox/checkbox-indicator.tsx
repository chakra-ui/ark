import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export interface CheckboxIndicatorProps extends HTMLArkProps<'div'> {}

export const CheckboxIndicator = forwardRef<HTMLDivElement, CheckboxIndicatorProps>(
  (props, ref) => {
    const api = useCheckboxContext()
    const mergedProps = mergeProps(api.indicatorProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CheckboxIndicator.displayName = 'CheckboxIndicator'
