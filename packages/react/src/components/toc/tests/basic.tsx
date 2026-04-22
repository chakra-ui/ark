import { Toc } from '../'

export const items = [
  { value: 'introduction', depth: 2 },
  { value: 'getting-started', depth: 2 },
  { value: 'installation', depth: 2 },
  { value: 'usage', depth: 2 },
  { value: 'api-reference', depth: 2 },
]

export const ComponentUnderTest = (props: Omit<Toc.RootProps, 'items'>) => (
  <Toc.Root items={items} {...props}>
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
        {items.map((item) => (
          <Toc.Item key={item.value} item={item}>
            <Toc.Link href={`#${item.value}`}>{item.value.replace(/-/g, ' ')}</Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
