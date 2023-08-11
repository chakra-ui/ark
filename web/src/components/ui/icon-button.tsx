import { css, cx } from 'styled-system/css'
import { Button, type ButtonProps } from './button'

export type IconButtonProps = ButtonProps & { 'aria-label': string }

export const IconButton = (props: IconButtonProps) => {
  return <Button className={cx(css({ px: '0' }))} {...props} />
}
