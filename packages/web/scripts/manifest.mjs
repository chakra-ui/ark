import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Window } from 'happy-dom'

const root = fileURLToPath(new URL('..', import.meta.url))
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const window = new Window({ url: 'http://localhost/' })

const globals = { window, document: window.document, customElements: window.customElements }

for (const key of Object.getOwnPropertyNames(window)) {
  if (!(key in globalThis) || /^(Event|EventTarget|\w+Event)$/.test(key)) globals[key] = window[key]
}

for (const [key, value] of Object.entries(globals)) {
  Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
}

const defined = new Map()
const define = window.customElements.define.bind(window.customElements)

window.customElements.define = (tag, ctor, options) => {
  defined.set(tag, ctor)
  return define(tag, ctor, options)
}

await import(join(root, 'dist/index.js'))

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
  if (meta.kind === 'element') return `The ${title(tag.replace(/^ark-/, ''))} element.`
  if (meta.kind !== 'part') return `The ${name} root.`

  const part = tag.replace(`ark-${component}-`, '')
  return `The ${title(part).toLowerCase()} part of ${name}. Place it inside \`<${meta.root}>\` or point \`for\` at its id.`
}

function elementsOf() {
  return [...defined.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, ctor]) => {
      const meta = ctor.meta ?? { kind: 'element', attributes: ctor.observedAttributes ?? [] }
      const own = meta.attributes ?? []
      const extra = { part: ['as-child', 'for'], root: ['as-child', 'debug'] }[meta.kind] ?? []
      const attributes = [...new Set([...own, ...extra])]

      return {
        tag,
        component: componentOf(tag),
        description: describe(tag, meta),
        attributes,
        events: meta.events ?? [],
        properties: meta.properties ?? [],
        methods: meta.methods ?? [],
        members: memberDocs(meta.kind),
      }
    })
}

function memberDocs(kind) {
  if (kind === 'element') return []

  const state = {
    kind: 'field',
    name: 'state',
    readonly: true,
    description: "The machine state for this element, such as an item's `selected`. `undefined` until it connects.",
  }
  if (kind === 'part') return [state]

  return [
    state,
    { kind: 'field', name: 'ready', readonly: true, description: 'Resolves once the machine has started.' },
  ]
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
        ...element.members,
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
