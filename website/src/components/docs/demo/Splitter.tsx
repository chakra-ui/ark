import { Splitter } from '@/components/shared/Splitter'
import { Box, Flex } from '@/panda/jsx'
import { PropsWithChildren } from 'react'

export const DemoSplitter = () => (
  <Box width="full" height="md">
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
  </Box>
)

const Content = (props: PropsWithChildren) => (
  <Flex
    justify="center"
    align="center"
    bg="bg.muted"
    borderRadius="lg"
    color="fg.muted"
    flex="1"
    p="4"
    {...props}
  />
)
