import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/splitter'
import type { JSX } from 'solid-js'
import { children, createEffect } from 'solid-js'
import { spread } from 'solid-js/web'
import { useSplitterContext } from './splitter-context'

type SplitterContext = Parameters<ReturnType<typeof connect>['getResizeTriggerProps']>[0]
export type SplitterResizeTriggerProps = Assign<{ children: JSX.Element }, SplitterContext>

export const SplitterResizeTrigger = (props: SplitterResizeTriggerProps) => {
  const splitter = useSplitterContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, splitter?.().getResizeTriggerProps(props))
    }
  })

  return <>{getChildren()}</>
}
