import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchHiddenInputBaseProps extends PolymorphicProps {}
export interface SwitchHiddenInputProps extends HTMLProps<'input'>, SwitchHiddenInputBaseProps {}

export const SwitchHiddenInput = forwardRef<HTMLInputElement, SwitchHiddenInputProps>(
  (props, ref) => {
    const switchContext = useSwitchContext()
    const mergedProps = mergeProps(switchContext.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

SwitchHiddenInput.displayName = 'SwitchHiddenInput'
