import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { clearComponentCache, normalizeComponent } from './lib/components.js'
import { getApiBase } from './lib/fetch.js'
import { initializeTools } from './tools/index.js'

const routes: Record<string, unknown> = {
  '/types/react': ['dialog', 'date-picker', 'select'],
  '/types/vue': ['dialog', 'select'],
  '/types/vue/dialog': { Root: { open: { type: 'boolean' } } },
  '/examples/vue/dialog': { examples: [{ id: 'basic' }, { id: 'nested' }] },
  '/style-guide/date-picker': { dataAttr: { 'data-date-picker-content': '' } },
}

const realFetch = globalThis.fetch
const requested: string[] = []

const connect = async () => {
  const server = new McpServer({ name: 'ark-ui-test', version: '0.0.0' })
  await initializeTools(server)
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  const client = new Client({ name: 'test', version: '0.0.0' })
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])
  return client
}

const text = (result: Awaited<ReturnType<Client['callTool']>>) =>
  (result.content as { type: string; text: string }[]).map((c) => c.text).join('\n')

beforeEach(() => {
  requested.length = 0
  clearComponentCache()
  globalThis.fetch = (async (input: string) => {
    const path = String(input).replace(getApiBase(), '')
    requested.push(path)
    if (!(path in routes)) return new Response('not found', { status: 404, statusText: 'Not Found' })
    return Response.json(routes[path])
  }) as typeof fetch
})

afterEach(() => {
  globalThis.fetch = realFetch
  delete process.env.ARK_UI_MCP_API_URL
})

describe('normalizeComponent', () => {
  it('accepts common spellings', () => {
    assert.equal(normalizeComponent('DatePicker'), 'date-picker')
    assert.equal(normalizeComponent(' date picker '), 'date-picker')
    assert.equal(normalizeComponent('date_picker'), 'date-picker')
    assert.equal(normalizeComponent('QRCode'), 'qr-code')
  })

  it('suggests the hyphenated name for a run-together one', async () => {
    const client = await connect()
    const result = await client.callTool({
      name: 'list_examples',
      arguments: { framework: 'react', component: 'datepicker' },
    })
    assert.equal(result.isError, true)
    assert.match(text(result), /Did you mean: date-picker/)
  })
})

describe('getApiBase', () => {
  it('can be overridden from the environment', () => {
    process.env.ARK_UI_MCP_API_URL = 'http://localhost:3000/api/'
    assert.equal(getApiBase(), 'http://localhost:3000/api')
  })
})

describe('server', () => {
  it('registers every tool without touching the network', async () => {
    globalThis.fetch = (async () => {
      throw new Error('offline')
    }) as typeof fetch
    const client = await connect()
    const { tools } = await client.listTools()
    assert.deepEqual(tools.map((t) => t.name).sort(), [
      'get_component_props',
      'get_docs',
      'get_example',
      'list_components',
      'list_examples',
      'search_docs',
      'styling_guide',
    ])
    assert.deepEqual(requested, [])
  })

  it('registers tools once per server and again for a new server', async () => {
    const server = new McpServer({ name: 'ark-ui-test', version: '0.0.0' })
    await initializeTools(server)
    await initializeTools(server)
    const client = await connect()
    const { tools } = await client.listTools()
    assert.equal(tools.length, 7)
  })

  it('checks the component against the requested framework', async () => {
    const client = await connect()
    const result = await client.callTool({
      name: 'get_component_props',
      arguments: { framework: 'vue', component: 'Dialog' },
    })
    assert.equal(result.isError, undefined)
    assert.match(text(result), /"open"/)
    assert.ok(requested.includes('/types/vue'))
    assert.ok(!requested.includes('/types/react'))
  })

  it('suggests close names for an unknown component', async () => {
    const client = await connect()
    const result = await client.callTool({
      name: 'list_examples',
      arguments: { framework: 'vue', component: 'dialogs' },
    })
    assert.equal(result.isError, true)
    assert.match(text(result), /Did you mean: dialog/)
  })

  it('rejects a component that only exists in another framework', async () => {
    const client = await connect()
    const result = await client.callTool({
      name: 'list_examples',
      arguments: { framework: 'vue', component: 'date-picker' },
    })
    assert.equal(result.isError, true)
    assert.match(text(result), /Unknown vue component/)
  })

  it('normalizes names before fetching', async () => {
    const client = await connect()
    const result = await client.callTool({ name: 'styling_guide', arguments: { component: 'DatePicker' } })
    assert.equal(result.isError, undefined)
    assert.ok(requested.includes('/style-guide/date-picker'))
  })

  it('retries the component list after a failed fetch', async () => {
    const client = await connect()
    const working = globalThis.fetch
    globalThis.fetch = (async () => new Response('down', { status: 503, statusText: 'Unavailable' })) as typeof fetch
    const failed = await client.callTool({
      name: 'list_examples',
      arguments: { framework: 'vue', component: 'dialog' },
    })
    assert.equal(failed.isError, true)
    globalThis.fetch = working
    const ok = await client.callTool({ name: 'list_examples', arguments: { framework: 'vue', component: 'dialog' } })
    assert.equal(ok.isError, undefined)
  })
})
