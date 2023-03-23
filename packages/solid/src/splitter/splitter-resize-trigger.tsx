import { type Assign } from '@polymorphic-factory/solid'
import { type connect } from '@zag-js/splitter'
import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useSplitterContext } from './splitter-context'

type SplitterContext = Parameters<ReturnType<typeof connect>['getResizeTriggerProps']>[0]
export type SplitterResizeTriggerProps = Assign<{ children: JSX.Element }, SplitterContext>

export const SplitterResizeTrigger = (props: SplitterResizeTriggerProps) => {
  const splitter = useSplitterContext()
  const triggerProps = splitter?.().getResizeTriggerProps(props)

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
