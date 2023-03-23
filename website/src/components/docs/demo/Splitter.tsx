import { Splitter } from '@/components/shared/Splitter'
import { Flex } from '@/panda/jsx'
import { PropsWithChildren } from 'react'

export const DemoSplitter = () => (
  <Splitter
    orientation="vertical"
    start={<Content>A</Content>}
    end={
      <Splitter
        start={<Content>B</Content>}
        end={
          <Splitter
            orientation="vertical"
            start={<Content>C</Content>}
            end={<Content>D</Content>}
          />
        }
      />
    }
  />
)

const Content = (props: PropsWithChildren) => (
  <Flex
    justify="center"
    align="center"
    bg="brown.400"
    borderRadius="lg"
    flex="1"
    p="4"
    {...props}
  />
)
