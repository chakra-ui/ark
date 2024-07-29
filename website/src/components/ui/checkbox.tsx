import { forwardRef } from 'react'
import * as ArkCheckbox from './primitives/checkbox'

export interface CheckboxProps extends ArkCheckbox.RootProps {}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const { children, ...rootProps } = props

  return (
    <ArkCheckbox.Root ref={ref} {...rootProps}>
      <ArkCheckbox.Control>
        <ArkCheckbox.Indicator>
          <CheckIcon />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator indeterminate>
          <MinusIcon />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {children && <ArkCheckbox.Label>{children}</ArkCheckbox.Label>}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
})

Checkbox.displayName = 'Checkbox'

const CheckIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Check Icon</title>
    <path
      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MinusIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Minus Icon</title>
    <path
      d="M2.91675 7H11.0834"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
