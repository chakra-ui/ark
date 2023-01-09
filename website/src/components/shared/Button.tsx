import { HTMLPandaProps, panda } from '@/panda/jsx'
import { button, ButtonVariants } from '@/panda/recipes'
import { cloneElement, isValidElement, PropsWithChildren } from 'react'

type ButtonContentProps = {
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export type ButtonProps = HTMLPandaProps<'button'> & ButtonVariants & ButtonContentProps

export const Button = (props: ButtonProps) => {
  const { variant, size, leftIcon, rightIcon, children, ...rest } = props
  return (
    <panda.button
      className={button({ variant, size })}
      {...rest}
      data-scope="button"
      data-part="root"
    >
      <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </ButtonContent>
    </panda.button>
  )
}

const ButtonContent = (props: PropsWithChildren<ButtonContentProps>) => {
  const { leftIcon, rightIcon, children } = props
  return (
    <>
      {leftIcon && <ButtonIcon mr="var(--icon-spacing)">{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && <ButtonIcon ml="var(--icon-spacing)">{rightIcon}</ButtonIcon>}
    </>
  )
}

const ButtonIcon = (props: HTMLPandaProps<'span'>) => {
  const { children, ...rest } = props

  const _children = isValidElement(children)
    ? cloneElement(children, {
        // @ts-expect-error typings are wrong
        'aria-hidden': true,
        focusable: false,
      })
    : children

  return (
    <panda.span data-scope="button" data-part="icon" {...rest}>
      {_children}
    </panda.span>
  )
}
