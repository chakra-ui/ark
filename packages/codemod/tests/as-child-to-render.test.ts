import { describe, expect, it } from 'vitest'
import { reactAsChildToRender } from '../src/transforms/as-child-to-render/react.ts'
import { solidAsChildToRender } from '../src/transforms/as-child-to-render/solid.ts'
import { svelteAsChildToRender } from '../src/transforms/as-child-to-render/svelte.ts'
import { vueAsChildToRender } from '../src/transforms/as-child-to-render/vue.ts'

describe('react', () => {
  it('lifts the child into a render prop', () => {
    const result = reactAsChildToRender(
      `export const A = () => (
  <Popover.Trigger asChild>
    <button>Open Popover</button>
  </Popover.Trigger>
)`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<Popover.Trigger render={<button>Open Popover</button>} />')
    expect(result.code).not.toContain('asChild')
  })

  it("keeps the part's own props", () => {
    const result = reactAsChildToRender(
      `const A = () => <Menu.Item asChild value="x" className="y"><a href="#">Go</a></Menu.Item>`,
      'a.tsx',
    )
    expect(result.code).toContain('value="x"')
    expect(result.code).toContain('className="y"')
    expect(result.code).toContain('render={<a href="#">Go</a>}')
  })

  it('leaves several children alone and says why', () => {
    const result = reactAsChildToRender(
      `const A = () => <Popover.Trigger asChild><span/><span/></Popover.Trigger>`,
      'a.tsx',
    )
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('exactly one child')
  })

  it('does nothing to a file without asChild', () => {
    expect(reactAsChildToRender(`const A = () => <Popover.Trigger>Open</Popover.Trigger>`, 'a.tsx').code).toBeNull()
  })
})

describe('solid', () => {
  it('renames the callback and keeps the props accessor call', () => {
    const result = solidAsChildToRender(
      `const A = () => <Popover.Trigger asChild={(props) => <button {...props()} />}>Open</Popover.Trigger>`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('render={(props) => <button {...props()} />}')
  })

  it('keeps props calls that pass merge arguments', () => {
    const result = solidAsChildToRender(
      `const A = () => <X asChild={(props) => <b {...props({ class: 'x' })}>{other()}</b>} />`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain("render={(props) => <b {...props({ class: 'x' })}>{other()}</b>}")
  })
})

describe('vue', () => {
  it('turns asChild into a render slot and binds props on the child', () => {
    const result = vueAsChildToRender(
      `<template>
  <Popover.Trigger asChild>
    <button>Open Popover</button>
  </Popover.Trigger>
</template>`,
      'a.vue',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('#render="{ props }"')
    expect(result.code).toContain('<button v-bind="props">Open Popover</button>')
  })

  it('accepts the kebab spelling', () => {
    const result = vueAsChildToRender(`<template><X as-child><b>y</b></X></template>`, 'a.vue')
    expect(result.count).toBe(1)
    expect(result.code).toContain('#render="{ props }"')
  })

  it('skips a child that already binds props', () => {
    const result = vueAsChildToRender(`<template><X asChild><b v-bind="other">y</b></X></template>`, 'a.vue')
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('already binds props')
  })
})

describe('svelte', () => {
  it('renames the snippet', () => {
    const result = svelteAsChildToRender(
      `<Popover.Trigger>
  {#snippet asChild(props)}
    <button {...props()}>Open Popover</button>
  {/snippet}
</Popover.Trigger>`,
      'a.svelte',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('{#snippet render(props)}')
    expect(result.code).toContain('{...props()}')
  })

  it('reports a bare attribute it cannot migrate', () => {
    const result = svelteAsChildToRender(`<Popover.Trigger asChild>x</Popover.Trigger>`, 'a.svelte')
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('bare asChild')
  })
})

describe('vue bound asChild', () => {
  it('reports a shorthand bound asChild instead of skipping it silently', () => {
    const result = vueAsChildToRender(`<template><X :as-child="cond"><b>y</b></X></template>`, 'a.vue')
    expect(result.code).toBeNull()
    expect(result.skipped).toHaveLength(1)
    expect(result.skipped[0]).toContain('bound to an expression')
  })

  it('reports the long form too', () => {
    const result = vueAsChildToRender(`<template><X v-bind:as-child="flag"><b>y</b></X></template>`, 'a.vue')
    expect(result.skipped[0]).toContain('bound to an expression')
  })

  it('does not mistake a bound attribute on the child for v-bind', () => {
    const result = vueAsChildToRender(`<template><X asChild><b :class="c">y</b></X></template>`, 'a.vue')
    expect(result.count).toBe(1)
    expect(result.code).toContain('<b v-bind="props" :class="c">y</b>')
  })
})

// Regressions for the ways a transform can silently emit broken code.
describe('edge cases', () => {
  describe('solid keeps the props call in every shape', () => {
    it('keeps the call inside a block body', () => {
      const result = solidAsChildToRender(
        `const A = () => <Popover.Trigger asChild={(props) => { return <button {...props()} /> }}>Open</Popover.Trigger>`,
        'a.tsx',
      )
      expect(result.count).toBe(1)
      expect(result.code).toContain('{...props()}')
      expect(result.code).toContain('render={(props) => { return <button {...props()} /> }}')
    })

    it('keeps the call when the state accessor is also used', () => {
      const result = solidAsChildToRender(
        `const A = () => <Switch.Thumb asChild={(props, state) => <span {...props()}>{state().checked}</span>} />`,
        'a.tsx',
      )
      expect(result.code).toContain('{...props()}')
      expect(result.code).toContain('{state().checked}')
    })

    it('renames every asChild in a file and leaves each body intact', () => {
      const result = solidAsChildToRender(
        `const A = () => (
  <>
    <Menu.Item asChild={(props) => <a href="/1" {...props()} />}>One</Menu.Item>
    <Menu.Item asChild={(props) => <a href="/2" {...props()} />}>Two</Menu.Item>
  </>
)`,
        'a.tsx',
      )
      expect(result.count).toBe(2)
      expect(result.code).not.toContain('asChild')
      expect(result.code?.match(/\{\.\.\.props\(\)\}/g)).toHaveLength(2)
    })

    it('renames nested render callbacks without touching the inner call', () => {
      const result = solidAsChildToRender(
        `const A = () => <Tooltip.Trigger asChild={(outer) => <Dialog.Trigger asChild={(inner) => <button {...inner()} />} {...outer()} />} />`,
        'a.tsx',
      )
      expect(result.count).toBe(2)
      expect(result.code).toContain('{...outer()}')
      expect(result.code).toContain('{...inner()}')
      expect(result.code).not.toContain('asChild')
    })
  })

  describe('react does not emit invalid jsx', () => {
    it('skips an element that already has a render prop instead of writing two', () => {
      const result = reactAsChildToRender(
        `const A = () => <Menu.Item asChild render={<a href="#">x</a>}><b>y</b></Menu.Item>`,
        'a.tsx',
      )
      expect(result.code).toBeNull()
      expect(result.skipped[0]).toContain('already has a render prop')
    })

    it('preserves a member-expression tag name', () => {
      const result = reactAsChildToRender(`const A = () => <Menu.Item asChild><a href="#">Go</a></Menu.Item>`, 'a.tsx')
      expect(result.code).toContain('<Menu.Item render={<a href="#">Go</a>} />')
    })

    it('skips when the child is an expression container, not an element', () => {
      const result = reactAsChildToRender(`const A = () => <Popover.Trigger asChild>{child}</Popover.Trigger>`, 'a.tsx')
      expect(result.code).toBeNull()
      expect(result.skipped[0]).toContain('not an element')
    })
  })

  describe('vue and svelte', () => {
    it('vue rewrites two asChild parts in one template', () => {
      const result = vueAsChildToRender(`<template><X asChild><a>1</a></X><Y asChild><b>2</b></Y></template>`, 'a.vue')
      expect(result.count).toBe(2)
      expect(result.code).toContain('<a v-bind="props">1</a>')
      expect(result.code).toContain('<b v-bind="props">2</b>')
    })

    it('svelte renames every asChild snippet and keeps the props call', () => {
      const result = svelteAsChildToRender(
        `<A>
  {#snippet asChild(props)}<a {...props()}>1</a>{/snippet}
</A>
<B>
  {#snippet asChild(props)}<b {...props()}>2</b>{/snippet}
</B>`,
        'a.svelte',
      )
      expect(result.count).toBe(2)
      expect(result.code).not.toContain('asChild')
      expect(result.code?.match(/\{\.\.\.props\(\)\}/g)).toHaveLength(2)
    })
  })
})
