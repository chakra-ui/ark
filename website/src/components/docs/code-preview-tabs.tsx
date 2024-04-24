import { Tabs } from '@ark-ui/react/tabs'
import { useStore } from '@nanostores/react'
import { useState, type PropsWithChildren } from 'react'
import { HStack } from 'styled-system/jsx'
import { Button } from '~/components/ui'
import { selectedFramework } from '~/stores/framework-select.store'
import { CodePreview } from './code-preview'

interface Props {
  code?: string
  tabs: Record<
    string,
    { label: string; disabled?: boolean; code: string; children?: React.ReactElement }
  >
  expandable?: boolean
  collapsed?: boolean
}

export const CodePreviewTabs = (props: PropsWithChildren<Props>) => {
  const { expandable } = props
  const [collapsed, setCollapsed] = useState(props.collapsed)
  const $selectedFramework = useStore(selectedFramework)

  return (
    <Tabs.Root defaultValue={$selectedFramework}>
      <HStack justifyContent="space-between" p="1">
        <Tabs.List>
          {Object.entries(props.tabs).map(([key, value]) => (
            <Tabs.Trigger key={key} value={key} disabled={value.disabled} asChild>
              <Button
                variant="ghost"
                size="sm"
                color="fg.muted"
                me="1"
                px="3"
                _selected={{ color: 'fg.default', background: 'gray.a3' }}
                _disabled={{ color: 'fg.disabled' }}
                display={collapsed ? 'none' : 'inline-flex'}
              >
                {value.label}
              </Button>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <HStack gap="1">
          {expandable && (
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? 'Show Code' : 'Hide Code'}
            </Button>
          )}
        </HStack>
      </HStack>
      {Object.entries(props.tabs).map(([key, value]) => (
        <Tabs.Content key={key} value={key} asChild>
          <CodePreview
            code={value.code}
            borderTopWidth="1px"
            data-state={collapsed ? 'collapsed' : 'expanded'}
            _collapsed={{ display: 'none' }}
          >
            {/* @ts-expect-error */}
            {props[key] ?? value.children}
          </CodePreview>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
