'use client'

import { useTabsContext } from '@ark-ui/react'
import { SiStackblitz } from '@icons-pack/react-simple-icons'
import { css } from 'styled-system/css'
import { Box } from 'styled-system/jsx'
import { Tabs } from '~/components/ui/tabs'
import { openInStackblitzReact } from '~/lib/stackblitz-react'
import { openInStackblitzSolid } from '~/lib/stackblitz-solid'
import { openInStackblitzVue } from '~/lib/stackblitz-vue'
import { CodePreview } from './code-preview'
import { Button } from './ui/primitives/button'

interface CodeExample {
  label: string
  value: string
  code: string
  html: string
}

interface ExampleMeta {
  id: string
  component?: string
  framework: string
}

interface Props extends Tabs.RootProps {
  defaultValue: string
  examples: CodeExample[]
  styles?: string
  meta?: ExampleMeta
}

export const CodeTabs = (props: Props) => {
  const { examples, defaultValue, meta, styles, ...rootProps } = props

  return (
    <Tabs.Root
      defaultValue={defaultValue}
      variant="line"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.dark.2"
      size="sm"
      className="not-prose"
      {...rootProps}
    >
      <Tabs.List
        bg="gray.dark.a2"
        boxShadow="none"
        borderBottomWidth="1px"
        borderBottomColor="gray.dark.5"
        px="4"
        alignItems="center"
      >
        {examples.map((example) => (
          <Tabs.Trigger
            key={example.value}
            value={example.value}
            color="gray.dark.11"
            _selected={{ color: 'white' }}
            pb="0"
            h="39px"
          >
            {example.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
        {meta && (
          <Box pos="absolute" right="1.5" top="1" className="dark">
            <StackblitzButton examples={examples} styles={styles} meta={meta} />
          </Box>
        )}
      </Tabs.List>
      {examples.map((example) => (
        <Tabs.Content key={example.value} value={example.value} pt="0">
          <CodePreview code={example.code} html={example.html} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

function StackblitzButton(props: { examples: CodeExample[]; styles: string | undefined; meta: ExampleMeta }) {
  const {
    examples,
    styles = '',
    meta: { id, component, framework },
  } = props

  const tabs = useTabsContext()

  const example = examples.find((example) => example.value === tabs.value)
  if (!example) return null

  return (
    <Button
      size="xs"
      scale="0.9"
      onClick={() => {
        const selectedFramework = tabs.value ?? framework
        const fn = {
          react: openInStackblitzReact,
          solid: openInStackblitzSolid,
          vue: openInStackblitzVue,
        }[selectedFramework]

        fn?.({
          code: example.code,
          css: styles,
          id,
          component: component ?? 'Example',
        })
      }}
    >
      <SiStackblitz />
      <span className={css({ textStyle: 'sm' })}>Stackblitz</span>
    </Button>
  )
}
