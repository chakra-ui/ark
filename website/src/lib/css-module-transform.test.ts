import { describe, expect, test } from 'bun:test'
import { stripCssModuleCode, transformCssModuleImports } from './css-module-transform'

describe('stripCssModuleCode', () => {
  test('strips single css module import', () => {
    const code = `import { Component } from '@ark-ui/react'
import styles from 'styles/component.module.css'

export const Example = () => <Component className={styles.Root} />`

    const result = stripCssModuleCode(code)

    expect(result).toBe(`import { Component } from '@ark-ui/react'

export const Example = () => <Component />`)
  })

  test('strips multiple css module imports', () => {
    const code = `import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

export const Context = () => {
  return (
    <Clipboard.Root className={styles.Root}>
      <button className={button.Root}>Click</button>
    </Clipboard.Root>
  )
}`

    const result = stripCssModuleCode(code)

    expect(result).toBe(`import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon } from 'lucide-react'

export const Context = () => {
  return (
    <Clipboard.Root>
      <button>Click</button>
    </Clipboard.Root>
  )
}`)
  })

  test('strips template literal className', () => {
    const code = `<Component className={\`\${styles.Root}\`} />`

    const result = stripCssModuleCode(code)

    expect(result).toBe('<Component />')
  })

  test('strips Vue :class binding', () => {
    const code = `<Component :class="styles.Root" />`

    const result = stripCssModuleCode(code)

    expect(result).toBe('<Component />')
  })

  test('strips Svelte class binding', () => {
    const code = `<Component class={styles.Root} />`

    const result = stripCssModuleCode(code)

    expect(result).toBe('<Component />')
  })

  test('handles mixed variable names for Vue', () => {
    const code = `<div :class="button.Root">
  <span :class="styles.Label">Text</span>
</div>`

    const result = stripCssModuleCode(code)

    expect(result).toBe(`<div>
  <span>Text</span>
</div>`)
  })

  test('handles mixed variable names for Svelte', () => {
    const code = `<div class={button.Root}>
  <span class={styles.Label}>Text</span>
</div>`

    const result = stripCssModuleCode(code)

    expect(result).toBe(`<div>
  <span>Text</span>
</div>`)
  })

  test('collapses multiple empty lines', () => {
    const code = `import styles from 'styles/component.module.css'


const x = 1`

    const result = stripCssModuleCode(code)

    expect(result).toBe('const x = 1')
  })

  test('preserves code without css modules', () => {
    const code = `import { Component } from '@ark-ui/react'

export const Example = () => <Component />`

    const result = stripCssModuleCode(code)

    expect(result).toBe(code)
  })
})

describe('transformCssModuleImports', () => {
  test('transforms single import path', () => {
    const code = `import styles from 'styles/component.module.css'`

    const result = transformCssModuleImports(code)

    expect(result).toBe(`import styles from './index.module.css'`)
  })

  test('transforms multiple import paths', () => {
    const code = `import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'`

    const result = transformCssModuleImports(code)

    expect(result).toBe(`import button from './index.module.css'
import styles from './index.module.css'`)
  })

  test('preserves non-css-module imports', () => {
    const code = `import { Component } from '@ark-ui/react'
import styles from 'styles/component.module.css'`

    const result = transformCssModuleImports(code)

    expect(result).toBe(`import { Component } from '@ark-ui/react'
import styles from './index.module.css'`)
  })
})
