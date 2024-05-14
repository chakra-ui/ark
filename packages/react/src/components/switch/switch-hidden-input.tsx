import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchHiddenInputProps extends HTMLArkProps<'input'> {}

export const SwitchHiddenInput = forwardRef<HTMLInputElement, SwitchHiddenInputProps>(
  (props, ref) => {
    const switchContext = useSwitchContext()
    const mergedProps = mergeProps(switchContext.hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

SwitchHiddenInput.displayName = 'SwitchHiddenInput'
