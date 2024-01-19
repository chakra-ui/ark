import { render, screen } from '@solidjs/testing-library'
import { splitProps, type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from './factory'

type ButtonVariantProps = {
  variant: 'primary' | 'secondary' | 'tertiary'
}

export interface ButtonProps
  extends ButtonVariantProps,
    JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  const [localProps, buttonProps] = splitProps(props, ['variant'])
  return <button data-testid="child" data-variant={localProps.variant} {...buttonProps} />
}

const Parent = (props: HTMLArkProps<'div'>) => <ark.div data-testid="parent" {...props} />

const ComponentUnderTest = () => (
  <Parent as={Button} variant="primary">
    Factory Text
  </Parent>
)

describe('Ark Factory', () => {
  it('should render only the child', () => {
    render(() => <ComponentUnderTest />)

    screen.debug()
  })
})
