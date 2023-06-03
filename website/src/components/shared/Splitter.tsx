import { splitter } from '@/panda/recipes'
import {
  Splitter as ArkSplitter,
  SplitterPanel,
  SplitterResizeTrigger,
  type SplitterProps as ArkSplitterProps,
} from '@ark-ui/react'
import { ReactNode, useId } from 'react'

type SplitterProps = {
  start: ReactNode
  end: ReactNode
} & ArkSplitterProps

export const Splitter = (props: SplitterProps) => {
  const { start, end } = props
  const [a, b] = [useId(), useId()].map((id) => id.replace(/:/g, '-'))
  return (
    <>
      <ArkSplitter
        size={[
          { id: a, size: 50 },
          { id: b, size: 50 },
        ]}
        className={splitter()}
        {...props}
      >
        <SplitterPanel id={a}>{start}</SplitterPanel>
        <SplitterResizeTrigger id={`${a}:${b}`} />
        <SplitterPanel id={b}>{end}</SplitterPanel>
      </ArkSplitter>
    </>
  )
}
