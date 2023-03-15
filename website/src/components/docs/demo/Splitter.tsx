import { Box, BoxProps } from '@/panda/jsx'
import { splitter } from '@/panda/recipes'
import {
  Splitter as ArkSplitter,
  SplitterPanel,
  SplitterProps as ArkSplitterProps,
  SplitterResizeTrigger,
} from '@ark-ui/react'
import { ReactNode, useId } from 'react'

type SplitterProps = ArkSplitterProps & {
  start: ReactNode
  end: ReactNode
}

const Splitter = (props: SplitterProps) => {
  const { start, end, ...rest } = props
  const [a, b] = [useId(), useId()].map((id) => id.replace(/:/g, '-'))
  return (
    <>
      <ArkSplitter
        size={[
          { id: a, size: 50 },
          { id: b, size: 50 },
        ]}
        {...rest}
        className={splitter()}
      >
        <SplitterPanel id={a}>{start}</SplitterPanel>
        <SplitterResizeTrigger id={`${a}:${b}`}>
          <div />
        </SplitterResizeTrigger>
        <SplitterPanel id={b}>{end}</SplitterPanel>
      </ArkSplitter>
    </>
  )
}

export const DemoSplitter = () => (
  <Splitter
    orientation="vertical"
    start={<Container>A</Container>}
    end={
      <Splitter
        start={<Container>B</Container>}
        end={
          <Splitter
            orientation="vertical"
            start={<Container>C</Container>}
            end={<Container>D</Container>}
          />
        }
      />
    }
  />
)

const Container = (props: BoxProps) => <Box {...props} />
