import { describe, expect, it } from 'vitest'
import { reactAsChildToRender } from '../src/transforms/as-child-to-render/react.ts'
import { solidAsChildToRender } from '../src/transforms/as-child-to-render/solid.ts'
import { svelteAsChildToRender } from '../src/transforms/as-child-to-render/svelte.ts'
import { vueAsChildToRender } from '../src/transforms/as-child-to-render/vue.ts'

describe('react', () => {
  it('lifts the child into a render prop', () => {
    const result = reactAsChildToRender(
      `import { Popover } from '@ark-ui/react/popover'
export const A = () => (
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
      `import { Menu } from '@ark-ui/react/menu'
const A = () => <Menu.Item asChild value="x" className="y"><a href="#">Go</a></Menu.Item>`,
      'a.tsx',
    )
    expect(result.code).toContain('value="x"')
    expect(result.code).toContain('className="y"')
    expect(result.code).toContain('render={<a href="#">Go</a>}')
  })

  it('leaves several children alone and says why', () => {
    const result = reactAsChildToRender(
      `import { Popover } from '@ark-ui/react/popover'
const A = () => <Popover.Trigger asChild><span/><span/></Popover.Trigger>`,
      'a.tsx',
    )
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('exactly one child')
  })

  it('does nothing to a file without asChild', () => {
    expect(
      reactAsChildToRender(
        `import { Popover } from '@ark-ui/react/popover'
const A = () => <Popover.Trigger>Open</Popover.Trigger>`,
        'a.tsx',
      ).code,
    ).toBeNull()
  })
})

describe('solid', () => {
  it('renames the callback and keeps the props accessor call', () => {
    const result = solidAsChildToRender(
      `import { Popover } from '@ark-ui/solid/popover'
const A = () => <Popover.Trigger asChild={(props) => <button {...props()} />}>Open</Popover.Trigger>`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('render={(props) => <button {...props()} />}')
  })

  it('keeps props calls that pass merge arguments', () => {
    const result = solidAsChildToRender(
      `import { X } from '@ark-ui/solid/x'
const A = () => <X asChild={(props) => <b {...props({ class: 'x' })}>{other()}</b>} />`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain("render={(props) => <b {...props({ class: 'x' })}>{other()}</b>}")
  })
})

describe('vue', () => {
  it('turns asChild into a render slot and binds props on the child', () => {
    const result = vueAsChildToRender(
      `<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
</script>
<template>
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
    const result = vueAsChildToRender(
      `<script setup lang="ts">import { X } from '@ark-ui/vue/x'</script>
<template><X as-child><b>y</b></X></template>`,
      'a.vue',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('#render="{ props }"')
  })

  it('skips a child that already binds props', () => {
    const result = vueAsChildToRender(
      `<script setup lang="ts">import { X } from '@ark-ui/vue/x'</script>
<template><X asChild><b v-bind="other">y</b></X></template>`,
      'a.vue',
    )
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('already binds props')
  })
})

describe('svelte', () => {
  it('renames the snippet', () => {
    const result = svelteAsChildToRender(
      `<script lang="ts">import { Popover } from '@ark-ui/svelte/popover'</script>
<Popover.Trigger>
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
    const result = svelteAsChildToRender(
      `<script lang="ts">import { Popover } from '@ark-ui/svelte/popover'</script>
<Popover.Trigger asChild>x</Popover.Trigger>`,
      'a.svelte',
    )
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('bare asChild')
  })
})

describe('vue bound asChild', () => {
  it('reports a shorthand bound asChild instead of skipping it silently', () => {
    const result = vueAsChildToRender(
      `<script setup lang="ts">import { X } from '@ark-ui/vue/x'</script>
<template><X :as-child="cond"><b>y</b></X></template>`,
      'a.vue',
    )
    expect(result.code).toBeNull()
    expect(result.skipped).toHaveLength(1)
    expect(result.skipped[0]).toContain('bound to an expression')
  })

  it('reports the long form too', () => {
    const result = vueAsChildToRender(
      `<script setup lang="ts">import { X } from '@ark-ui/vue/x'</script>
<template><X v-bind:as-child="flag"><b>y</b></X></template>`,
      'a.vue',
    )
    expect(result.skipped[0]).toContain('bound to an expression')
  })

  it('does not mistake a bound attribute on the child for v-bind', () => {
    const result = vueAsChildToRender(
      `<script setup lang="ts">import { X } from '@ark-ui/vue/x'</script>
<template><X asChild><b :class="c">y</b></X></template>`,
      'a.vue',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<b v-bind="props" :class="c">y</b>')
  })
})

describe('component identification', () => {
  it('react leaves a non-ark component with asChild untouched', () => {
    const result = reactAsChildToRender(
      `import { Menu } from '@ark-ui/react/menu'
import { Tooltip } from '@radix-ui/react-tooltip'
const A = () => (
  <>
    <Menu.Item asChild><a href="/1">Ark</a></Menu.Item>
    <Tooltip.Trigger asChild><a href="/2">Radix</a></Tooltip.Trigger>
  </>
)`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<Menu.Item render={<a href="/1">Ark</a>} />')
    expect(result.code).toContain('<Tooltip.Trigger asChild>')
  })

  it('react skips a file that never imports ark', () => {
    const result = reactAsChildToRender(
      `import { Tooltip } from '@radix-ui/react-tooltip'
const A = () => <Tooltip.Trigger asChild><a href="#">x</a></Tooltip.Trigger>`,
      'a.tsx',
    )
    expect(result.code).toBeNull()
    expect(result.count).toBe(0)
  })

  it('react follows an aliased import', () => {
    const result = reactAsChildToRender(
      `import { Menu as M } from '@ark-ui/react/menu'
const A = () => <M.Item asChild><a href="#">x</a></M.Item>`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<M.Item render={<a href="#">x</a>} />')
  })

  it('react tracks the ark factory element', () => {
    const result = reactAsChildToRender(
      `import { ark } from '@ark-ui/react/factory'
const A = () => <ark.div asChild><span>x</span></ark.div>`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<ark.div render={<span>x</span>} />')
  })

  it('solid leaves a non-ark component alone', () => {
    const result = solidAsChildToRender(
      `import { Menu } from '@ark-ui/solid/menu'
const A = () => (
  <>
    <Menu.Item asChild={(props) => <a {...props()} />} />
    <Other asChild={(props) => <a {...props()} />} />
  </>
)`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<Menu.Item render={(props) => <a {...props()} />} />')
    expect(result.code).toContain('<Other asChild={(props) => <a {...props()} />} />')
  })

  it('vue leaves a non-ark tag alone', () => {
    const result = vueAsChildToRender(
      `<script setup lang="ts">import { Popover } from '@ark-ui/vue/popover'</script>
<template><Popover.Trigger asChild><a>ark</a></Popover.Trigger><Other asChild><a>no</a></Other></template>`,
      'a.vue',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('<a v-bind="props">ark</a>')
    expect(result.code).toContain('<Other asChild><a>no</a></Other>')
  })

  it('svelte keys off the asChild snippet name, not the import path', () => {
    const result = svelteAsChildToRender(
      `<script lang="ts">import { Menu } from '$lib'</script>
<Menu.Item>
  {#snippet asChild(props)}<button {...props()}>x</button>{/snippet}
</Menu.Item>`,
      'a.svelte',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('{#snippet render(props)}')
    expect(result.code).toContain('{...props()}')
  })
})

describe('edge cases', () => {
  describe('solid keeps the props call in every shape', () => {
    it('keeps the call inside a block body', () => {
      const result = solidAsChildToRender(
        `import { Popover } from '@ark-ui/solid/popover'
const A = () => <Popover.Trigger asChild={(props) => { return <button {...props()} /> }}>Open</Popover.Trigger>`,
        'a.tsx',
      )
      expect(result.count).toBe(1)
      expect(result.code).toContain('{...props()}')
      expect(result.code).toContain('render={(props) => { return <button {...props()} /> }}')
    })

    it('keeps the call when the state accessor is also used', () => {
      const result = solidAsChildToRender(
        `import { Switch } from '@ark-ui/solid/switch'
const A = () => <Switch.Root asChild={(props, state) => <label {...props()}>{state().checked}</label>} />`,
        'a.tsx',
      )
      expect(result.code).toContain('{...props()}')
      expect(result.code).toContain('{state().checked}')
    })

    it('renames every asChild in a file and leaves each body intact', () => {
      const result = solidAsChildToRender(
        `import { Menu } from '@ark-ui/solid/menu'
const A = () => (
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
        `import { Tooltip } from '@ark-ui/solid/tooltip'
import { Dialog } from '@ark-ui/solid/dialog'
const A = () => <Tooltip.Trigger asChild={(outer) => <Dialog.Trigger asChild={(inner) => <button {...inner()} />} {...outer()} />} />`,
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
        `import { Menu } from '@ark-ui/react/menu'
const A = () => <Menu.Item asChild render={<a href="#">x</a>}><b>y</b></Menu.Item>`,
        'a.tsx',
      )
      expect(result.code).toBeNull()
      expect(result.skipped[0]).toContain('already has a render prop')
    })

    it('preserves a member-expression tag name', () => {
      const result = reactAsChildToRender(
        `import { Menu } from '@ark-ui/react/menu'
const A = () => <Menu.Item asChild><a href="#">Go</a></Menu.Item>`,
        'a.tsx',
      )
      expect(result.code).toContain('<Menu.Item render={<a href="#">Go</a>} />')
    })

    it('skips when the child is an expression container, not an element', () => {
      const result = reactAsChildToRender(
        `import { Popover } from '@ark-ui/react/popover'
const A = () => <Popover.Trigger asChild>{child}</Popover.Trigger>`,
        'a.tsx',
      )
      expect(result.code).toBeNull()
      expect(result.skipped[0]).toContain('not an element')
    })
  })

  describe('vue and svelte', () => {
    it('vue rewrites two asChild parts in one template', () => {
      const result = vueAsChildToRender(
        `<script setup lang="ts">import { X, Y } from '@ark-ui/vue/x'</script>
<template><X asChild><a>1</a></X><Y asChild><b>2</b></Y></template>`,
        'a.vue',
      )
      expect(result.count).toBe(2)
      expect(result.code).toContain('<a v-bind="props">1</a>')
      expect(result.code).toContain('<b v-bind="props">2</b>')
    })

    it('svelte renames every asChild snippet and keeps the props call', () => {
      const result = svelteAsChildToRender(
        `<script lang="ts">import { A, B } from '@ark-ui/svelte/x'</script>
<A>
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
