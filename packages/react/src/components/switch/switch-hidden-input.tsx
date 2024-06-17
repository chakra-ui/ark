import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchHiddenInputBaseProps extends PolymorphicProps {}
export interface SwitchHiddenInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SwitchHiddenInputBaseProps {}

export const SwitchHiddenInput = forwardRef<HTMLInputElement, SwitchHiddenInputProps>(
  (props, ref) => {
    const switchContext = useSwitchContext()
    const mergedProps = mergeProps(switchContext.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

SwitchHiddenInput.displayName = 'SwitchHiddenInput'
