import {
  NumberInput as ArkNumberInput,
  type NumberInputRootProps,
} from '@ark-ui/react/number-input'
import { forwardRef, type ReactNode } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { numberInput, type NumberInputVariantProps } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'

export interface NumberInputProps
  extends Assign<JsxStyleProps, NumberInputRootProps>,
    NumberInputVariantProps {
  children?: ReactNode
}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => {
  const [variantProps, numberInputProps] = numberInput.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(numberInputProps)
  const { children, className, ...rootProps } = localProps
  const styles = numberInput(variantProps)

  return (
    <ArkNumberInput.Root
      ref={ref}
      className={cx(styles.root, css(cssProps), className)}
      {...rootProps}
    >
      {children && <ArkNumberInput.Label className={styles.label}>{children}</ArkNumberInput.Label>}
      <ArkNumberInput.Control className={styles.control}>
        <ArkNumberInput.Input className={styles.input} />
        <ArkNumberInput.IncrementTrigger className={styles.incrementTrigger}>
          <ChevronUpIcon />
        </ArkNumberInput.IncrementTrigger>
        <ArkNumberInput.DecrementTrigger className={styles.decrementTrigger}>
          <ChevronDownIcon />
        </ArkNumberInput.DecrementTrigger>
      </ArkNumberInput.Control>
    </ArkNumberInput.Root>
  )
})

NumberInput.displayName = 'NumberInput'

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Up Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m18 15l-6-6l-6 6"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Down Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m6 9l6 6l6-6"
    />
  </svg>
)
