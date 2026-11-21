import { globSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Window } from 'happy-dom'
import { createServer, createServerModuleRunner } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const window = new Window({ url: 'http://localhost/' })

const globals = { window, document: window.document, customElements: window.customElements }

for (const key of Object.getOwnPropertyNames(window)) {
  if (!(key in globalThis) || /^(Event|EventTarget|\w+Event)$/.test(key)) globals[key] = window[key]
}

process.on('uncaughtException', (error) => console.warn(`ignored: ${error.message}`))
process.on('unhandledRejection', (error) => console.warn(`ignored: ${error?.message ?? error}`))

for (const [key, value] of Object.entries(globals)) {
  Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
}

const defined = new Map()
const define = window.customElements.define.bind(window.customElements)

window.customElements.define = (tag, ctor, options) => {
  defined.set(tag, ctor)
  return define(tag, ctor, options)
}

const ignored = /^(id|class|style|hidden|role|tabindex|slot|part|for|dir|as-child|data-.*|aria-.*)$/
const reads = new Map()

for (const method of ['getAttribute', 'hasAttribute']) {
  const original = window.Element.prototype[method]

  window.Element.prototype[method] = function (name) {
    if (this.localName.startsWith('ark-') && !ignored.test(name)) {
      const names = reads.get(this.localName) ?? new Set()
      names.add(name)
      reads.set(this.localName, names)
    }
    return original.call(this, name)
  }
}

const src = join(root, 'src')

const server = await createServer({
  configFile: false,
  logLevel: 'silent',
  root,
  server: { middlewareMode: true, ws: false },
  resolve: {
    alias: [
      { find: 'styles', replacement: join(root, '../../.storybook/modules') },
      { find: /^@ark-ui\/web\/(async-list|locale)$/, replacement: join(src, 'utils/$1.ts') },
      { find: /^@ark-ui\/web\/(.+)$/, replacement: join(src, 'components/$1/index.ts') },
      { find: /^@ark-ui\/web$/, replacement: join(src, 'index.ts') },
    ],
  },
})

const runner = createServerModuleRunner(server.environments.ssr, { hmr: false })

await runner.import(join(src, 'index.ts'))

const settle = () => new Promise((resolve) => setTimeout(resolve, 30))

for (const file of globSync('examples/**/*.ts', { cwd: root })) {
  try {
    const { mount } = await runner.import(join(root, file))
    const host = document.createElement('div')
    mount(host)
    document.body.append(host)
    await settle()
    host.remove()
  } catch (error) {
    console.warn(`skipped ${file}: ${error.message}`)
  }
}

await runner.close()
await server.close()

const componentOf = (tag) => {
  const name = tag.replace(/^ark-/, '')
  const dir = join(root, 'src/components')
  const components = readdirSync(dir).sort((a, b) => b.length - a.length)
  return components.find((component) => name === component || name.startsWith(`${component}-`)) ?? name
}

const title = (value) => value.replace(/(^|-)([a-z])/g, (_, __, char) => ` ${char.toUpperCase()}`).trim()

function describe(tag, meta) {
  const component = componentOf(tag)
  const name = title(component)
  if (meta.kind !== 'part') return `The ${name} root.`

  const part = tag.replace(`ark-${component}-`, '')
  return `The ${title(part).toLowerCase()} part of ${name}. Place it inside \`<${meta.root}>\` or point \`for\` at its id.`
}

function elementsOf() {
  return [...defined.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, ctor]) => {
      const meta = ctor.meta ?? { kind: 'root', attributes: ctor.observedAttributes ?? [] }
      const own = [...(meta.attributes ?? []), ...(reads.get(tag) ?? [])]
      const extra = meta.kind === 'part' ? ['as-child', 'for'] : ['as-child', 'debug']
      const attributes = [...new Set([...own, ...extra])]

      return {
        tag,
        component: componentOf(tag),
        description: describe(tag, meta),
        attributes,
        events: meta.events ?? [],
        properties: meta.properties ?? [],
        methods: meta.methods ?? [],
      }
    })
}

const elements = elementsOf()

const attributeDescription = (name) =>
  ({
    'as-child': 'Apply the props to the first child element instead of this element.',
    for: 'The id of the root this part belongs to, when it is not a descendant.',
    debug: 'Log state transitions, events and prop changes to the console. Applies to descendants too.',
  })[name]

const manifest = {
  schemaVersion: '1.0.0',
  readme: '',
  modules: Object.entries(Object.groupBy(elements, (element) => element.component)).map(([component, items]) => ({
    kind: 'javascript-module',
    path: `dist/components/${component}/index.js`,
    declarations: items.map((element) => ({
      kind: 'class',
      name: title(element.tag.replace(/^ark-/, '')).replace(/\s/g, '') + 'Element',
      tagName: element.tag,
      customElement: true,
      description: element.description,
      attributes: element.attributes.map((name) => ({ name, description: attributeDescription(name) })),
      events: element.events.map((name) => ({ name, type: { text: 'CustomEvent' } })),
      members: [
        ...element.properties.map((name) => ({ kind: 'field', name })),
        ...element.methods.map((name) => ({ kind: 'method', name })),
      ],
    })),
    exports: items.map((element) => ({
      kind: 'custom-element-definition',
      name: element.tag,
      declaration: { name: title(element.tag.replace(/^ark-/, '')).replace(/\s/g, '') + 'Element' },
    })),
  })),
}

const docsUrl = (component) => ({ name: 'Ark UI', url: `https://ark-ui.com/docs/components/${component}` })

const htmlData = {
  version: 1.1,
  tags: elements.map((element) => ({
    name: element.tag,
    description: element.description,
    attributes: element.attributes.map((name) => ({ name, description: attributeDescription(name) })),
    references: [docsUrl(element.component)],
  })),
}

const json = (value) => `${JSON.stringify(value, null, 2)}\n`

writeFileSync(join(root, 'dist/custom-elements.json'), json(manifest))
writeFileSync(join(root, 'dist/vscode.html-data.json'), json(htmlData))

console.log(`${pkg.name}: ${elements.length} elements in custom-elements.json and vscode.html-data.json`)

await window.happyDOM.close()
