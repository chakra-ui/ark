import { Box } from '@/panda/jsx'
import { splitter } from '@/panda/recipes'
import { Splitter, SplitterPanel, SplitterProps, SplitterResizeTrigger } from '@ark-ui/react'
import { PropsWithChildren, useId } from 'react'

const Basic = (props: Partial<SplitterProps> & { content?: React.ReactNode }) => {
  const [first, second] = [useId(), useId()].map((id) => id.replace(/:/g, '-'))
  return (
    <>
      <Splitter
        size={[
          { id: first, size: 50 },
          { id: second, size: 50 },
        ]}
        className={splitter()}
        {...props}
      >
        <SplitterPanel id={first}>{props.content ?? <Content>{first} high</Content>}</SplitterPanel>
        <SplitterResizeTrigger id={`${first}:${second}`}>
          <div />
        </SplitterResizeTrigger>
        <SplitterPanel id={second}>
          {props.children ?? <Content>{second} low</Content>}
        </SplitterPanel>
      </Splitter>
    </>
  )
}

const Content = (props: PropsWithChildren) => (
  <Box bg="bg.subtle" borderRadius="lg" flex="1" p="4" {...props} />
)

export const DemoSplitter = (props: Partial<SplitterProps>) => {
  const [first, second] = [useId(), useId()].map((id) => id.replace(/:/g, '-'))
  return (
    <Splitter
      size={[
        { id: first, size: 50 },
        { id: second, size: 50 },
      ]}
      className={splitter()}
      {...props}
    >
      <SplitterPanel id={first}>
        <Content>A</Content>
      </SplitterPanel>
      <SplitterResizeTrigger id={`${first}:${second}`}>
        <div />
      </SplitterResizeTrigger>
      <SplitterPanel id={second}>
        <Content>B</Content>
      </SplitterPanel>
    </Splitter>
  )
}
