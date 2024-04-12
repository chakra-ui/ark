import { createMemo, type JSX } from 'solid-js'
import { EnvironmentProvider } from './use-environment-context'

export interface EnvironmentProps {
  children?: JSX.Element
  value?: ShadowRoot | Document | Node
}

export const Environment = (props: EnvironmentProps) => {
  const spanRef: HTMLSpanElement | undefined = undefined

  // @ts-expect-error TODO fix
  const currentEnv = createMemo(() => () => props.value ?? spanRef?.ownerDocument ?? document)

  return (
    <EnvironmentProvider value={currentEnv()}>
      {props.children}
      {!props.value && <span hidden ref={spanRef} />}
    </EnvironmentProvider>
  )
}
