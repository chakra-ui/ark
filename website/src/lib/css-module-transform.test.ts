import { describe, expect, test } from 'bun:test'
import { getCssFiles, getCssModules, getPrimaryCssModules, rewriteCssImports, stripCss } from './css-module-transform'

describe('stripCss', () => {
  test('strips single css module import', () => {
    const code = `import { Component } from '@ark-ui/react'
import styles from 'styles/component.module.css'

export const Example = () => <Component className={styles.Root} />`

    const result = stripCss(code)

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

    const result = stripCss(code)

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

    const result = stripCss(code)

    expect(result).toBe('<Component />')
  })

  test('strips Vue :class binding', () => {
    const code = `<Component :class="styles.Root" />`

    const result = stripCss(code)

    expect(result).toBe('<Component />')
  })

  test('strips Svelte class binding', () => {
    const code = `<Component class={styles.Root} />`

    const result = stripCss(code)

    expect(result).toBe('<Component />')
  })

  test('handles mixed variable names for Vue', () => {
    const code = `<div :class="button.Root">
  <span :class="styles.Label">Text</span>
</div>`

    const result = stripCss(code)

    expect(result).toBe(`<div>
  <span>Text</span>
</div>`)
  })

  test('handles mixed variable names for Svelte', () => {
    const code = `<div class={button.Root}>
  <span class={styles.Label}>Text</span>
</div>`

    const result = stripCss(code)

    expect(result).toBe(`<div>
  <span>Text</span>
</div>`)
  })

  test('collapses multiple empty lines', () => {
    const code = `import styles from 'styles/component.module.css'


const x = 1`

    const result = stripCss(code)

    expect(result).toBe('const x = 1')
  })

  test('preserves code without css modules', () => {
    const code = `import { Component } from '@ark-ui/react'

export const Example = () => <Component />`

    const result = stripCss(code)

    expect(result).toBe(code)
  })
})

describe('rewriteCssImports', () => {
  test('transforms single import path', () => {
    const code = `import styles from 'styles/component.module.css'`

    const result = rewriteCssImports(code)

    expect(result).toBe(`import styles from './component.module.css'`)
  })

  test('transforms multiple import paths', () => {
    const code = `import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'`

    const result = rewriteCssImports(code)

    expect(result).toBe(`import button from './button.module.css'
import styles from './clipboard.module.css'`)
  })

  test('preserves non-css-module imports', () => {
    const code = `import { Component } from '@ark-ui/react'
import styles from 'styles/component.module.css'`

    const result = rewriteCssImports(code)

    expect(result).toBe(`import { Component } from '@ark-ui/react'
import styles from './component.module.css'`)
  })
})

describe('getCssFiles', () => {
  test('creates one stackblitz file per css module', () => {
    const result = getCssFiles({
      'button.module.css': '.button {}',
      'clipboard.module.css': '.root {}',
      'global.css': 'body {}',
    })

    expect(result).toEqual({
      'src/button.module.css': '.button {}',
      'src/clipboard.module.css': '.root {}',
    })
  })

  test('returns empty object when no css modules exist', () => {
    const result = getCssFiles({
      'global.css': 'body {}',
      'theme.css': ':root {}',
    })

    expect(result).toEqual({})
  })
})

describe('getCssModules', () => {
  test('returns sorted component css module entries only', () => {
    const result = getCssModules({
      'theme.css': ':root {}',
      'date-input.module.css': '.root {}',
      'button.module.css': '.button {}',
      'global.css': 'body {}',
    })

    expect(result).toEqual([
      ['button.module.css', '.button {}'],
      ['date-input.module.css', '.root {}'],
    ])
  })
})

describe('getPrimaryCssModules', () => {
  test('returns only the primary component css module when present', () => {
    const result = getPrimaryCssModules(
      {
        'button.module.css': '.button {}',
        'date-input.module.css': '.root {}',
        'field.module.css': '.field {}',
      },
      'date-input',
    )

    expect(result).toEqual([['date-input.module.css', '.root {}']])
  })

  test('falls back to all component css modules when no primary match exists', () => {
    const result = getPrimaryCssModules(
      {
        'button.module.css': '.button {}',
        'field.module.css': '.field {}',
      },
      'date-input',
    )

    expect(result).toEqual([
      ['button.module.css', '.button {}'],
      ['field.module.css', '.field {}'],
    ])
  })

  test('maps progress variants to progress.module.css', () => {
    const result = getPrimaryCssModules(
      {
        'button.module.css': '.button {}',
        'progress.module.css': '.root {}',
      },
      'progress-circular',
    )

    expect(result).toEqual([['progress.module.css', '.root {}']])
  })
})
