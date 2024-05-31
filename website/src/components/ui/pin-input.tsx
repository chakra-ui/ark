import type { Assign } from '@ark-ui/react'
import { PinInput as ArkPinInput, type PinInputRootProps } from '@ark-ui/react/pin-input'
import { forwardRef } from 'react'
import { css, cx } from 'styled-system/css'
import { splitCssProps } from 'styled-system/jsx'
import { type PinInputVariantProps, pinInput } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { Input } from '~/components/ui/input'

export interface PinInputProps
  extends Assign<JsxStyleProps, PinInputRootProps>,
    PinInputVariantProps {
  /**
   * The number of inputs to render.
   * @default 4
   */
  length?: number
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
  const [variantProps, pinInputProps] = pinInput.splitVariantProps(props)
  const [cssProps, localProps] = splitCssProps(pinInputProps)
  const { children, className, length = 4, ...rootProps } = localProps
  const styles = pinInput(variantProps)

  return (
    <ArkPinInput.Root
      className={cx(styles.root, css(cssProps), className)}
      ref={ref}
      {...rootProps}
    >
      {children && <ArkPinInput.Label className={styles.label}>{children}</ArkPinInput.Label>}
      <ArkPinInput.Control className={styles.control}>
        {Array.from({ length }, (_, index) => index).map((id, index) => (
          <ArkPinInput.Input className={styles.input} key={id} index={index} asChild>
            <Input size={variantProps.size} />
          </ArkPinInput.Input>
        ))}
      </ArkPinInput.Control>
    </ArkPinInput.Root>
  )
})

PinInput.displayName = 'PinInput'
