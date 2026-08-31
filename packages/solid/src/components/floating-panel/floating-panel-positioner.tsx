import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface FloatingPanelPositionerProps extends HTMLProps<'div'>, FloatingPanelPositionerBaseProps {}

export const FloatingPanelPositioner = (props: FloatingPanelPositionerProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(() => floatingPanel().getPositionerProps(), props)
  const presence = usePresenceContext()

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
