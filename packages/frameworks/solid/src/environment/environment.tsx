import { createMemo, type JSX } from 'solid-js'
import { EnvironmentProvider } from './environment-context'

export interface EnvironmentProps {
  children?: JSX.Element
  value?: ShadowRoot | Document | Node
}

export const Environment = (props: EnvironmentProps) => {
  // eslint-disable-next-line prefer-const
  let spanRef: HTMLSpanElement | undefined = undefined

  const currentEnv = createMemo(() => () => props.value ?? spanRef?.ownerDocument ?? document)

  return (
    <EnvironmentProvider value={currentEnv()}>
      {props.children}
      {!props.value && <span hidden ref={spanRef} />}
    </EnvironmentProvider>
  )
}
