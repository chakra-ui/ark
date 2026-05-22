<script lang="ts">
  import { Toc } from '../'

  interface Props {
    defaultActiveIds?: string[]
    activeIds?: string[]
    onActiveChange?: (details: any) => void
  }

  const items = [
    { value: 'introduction', depth: 2 },
    { value: 'getting-started', depth: 2 },
    { value: 'installation', depth: 2 },
    { value: 'usage', depth: 2 },
    { value: 'api-reference', depth: 2 },
  ]

  const { defaultActiveIds, activeIds, onActiveChange }: Props = $props()
</script>

<Toc.Root {items} {defaultActiveIds} {activeIds} {onActiveChange}>
  <Toc.Content>
    <h2 id="introduction">Introduction</h2>
    <h2 id="getting-started">Getting Started</h2>
    <h2 id="installation">Installation</h2>
    <h2 id="usage">Usage</h2>
    <h2 id="api-reference">API Reference</h2>
  </Toc.Content>
  <Toc.Nav>
    <Toc.Title>On this page</Toc.Title>
    <Toc.Indicator data-testid="indicator" />
    <Toc.List>
      {#each items as item (item.value)}
        <Toc.Item {item}>
          <Toc.Link href="#{item.value}">{item.value.replace(/-/g, ' ')}</Toc.Link>
        </Toc.Item>
      {/each}
    </Toc.List>
  </Toc.Nav>
</Toc.Root>
