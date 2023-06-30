'use client'
import { styled, type HTMLStyledProps } from '@/panda/jsx'
import { button, type ButtonVariantProps } from '@/panda/recipes'
import NextLink, { type LinkProps } from 'next/link'
import {
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react'

type ButtonContentProps = {
  children?: ReactNode | undefined
  leftIcon?: ReactElement
  rightIcon?: ReactElement
}

export type ButtonProps = ButtonVariantProps &
  ButtonContentProps & { href?: LinkProps['href'] } & HTMLStyledProps<'button'> &
  HTMLStyledProps<'a'>

export const Button = (props: ButtonProps) => {
  const { variant, href, size, leftIcon, rightIcon, children, ...rest } = props

  if (href) {
    return (
      <NextLink legacyBehavior href={href} passHref>
        <styled.a
          {...rest}
          className={button({ variant, size })}
          data-scope="button"
          data-part="root"
        >
          <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
            {children}
          </ButtonContent>
        </styled.a>
      </NextLink>
    )
  }

  return (
    <styled.button
      {...rest}
      className={button({ variant, size })}
      data-scope="button"
      data-part="root"
    >
      <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </ButtonContent>
    </styled.button>
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

const ButtonIcon = (props: HTMLStyledProps<'span'>) => {
  const { children, ...rest } = props

  const _children = isValidElement(children)
    ? cloneElement(children, {
        // @ts-expect-error typings are wrong
        'aria-hidden': true,
        focusable: false,
      })
    : children

  return (
    <styled.span data-scope="button" data-part="icon" {...rest}>
      {_children}
    </styled.span>
  )
}
