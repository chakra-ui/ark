import { Children, cloneElement } from 'react'
import { useTransition, type UseTransitionProps } from './use-transition'

type RenderProps = {
  hidden: boolean
  style: React.CSSProperties
}

type TransitionChild = React.ReactNode | ((props: RenderProps) => JSX.Element)

export type TransitionProps = UseTransitionProps & {
  unmountOnExit?: boolean
  children?: TransitionChild
}

export const Transition = (props: TransitionProps) => {
  const { unmountOnExit, children, ...useTransitionProps } = props
  const { style, hidden } = useTransition(useTransitionProps)
  const child = Children.only(children)

  if (unmountOnExit && hidden) {
    return null
  }

  if (typeof child === 'function') {
    return child({ style, hidden })
  }

  const jsxChild = child as JSX.Element
  return cloneElement(jsxChild, {
    style: {
      ...jsxChild.props.style,
      ...style,
    },
    hidden,
  })
}
