import type { Assign } from '@ark-ui/react'
import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type CheckboxVariantProps, checkbox } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'

export interface CheckboxProps
  extends Assign<JsxStyleProps, ArkCheckbox.RootProps>,
    CheckboxVariantProps {}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const [variantProps, checkboxProps] = checkbox.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(checkboxProps)
  const { children, className, ...rootProps } = localProps
  const styles = checkbox(variantProps)

  return (
    <ArkCheckbox.Root
      ref={ref}
      className={cx(styles.root, css(cssProps), className)}
      {...rootProps}
    >
      <ArkCheckbox.Control className={styles.control}>
        <ArkCheckbox.Indicator>
          <CheckIcon />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator indeterminate>
          <MinusIcon />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {children && <ArkCheckbox.Label className={styles.label}>{children}</ArkCheckbox.Label>}
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
