import { cloneElement, isValidElement, type ReactElement } from 'react'
import { css, cx } from 'styled-system/css'
import { Button, type ButtonProps } from './button'

export type IconButtonProps = ButtonProps & { icon?: ReactElement; 'aria-label': string }

export const IconButton = (props: IconButtonProps) => {
  const { icon, children, className, ...rest } = props
  const element = icon || children
  const _children = isValidElement(element)
    ? cloneElement(element as ReactElement, {
        'aria-hidden': true,
        focusable: false,
      })
    : null
  return (
    <Button className={cx(css({ px: '0' }), className)} {...rest}>
      {_children}
    </Button>
  )
}
