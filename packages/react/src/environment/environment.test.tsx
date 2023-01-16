import { render, screen } from '@testing-library/react'
import { Environment, useEnvironment } from '.'

const PrintEnvironment = <Override extends Record<string, unknown>>(props: {
  override?: Override
}) => {
  const { override = {} } = props
  const environment = useEnvironment(override)
  return (
    <pre aria-label="environment values">
      {JSON.stringify(
        Object.fromEntries(Object.entries(environment).map(([key, value]) => [key, String(value)])),
        null,
        2,
      )}
    </pre>
  )
}

describe('Environment', () => {
  it('should have access to the environment values', async () => {
    const ComponentUnderTest = () => (
      <Environment getRootNode={() => document}>
        <PrintEnvironment />
      </Environment>
    )
    render(<ComponentUnderTest />)

    expect(screen.getByLabelText('environment values').innerHTML).toMatchInlineSnapshot(`
      "{
        \\"getRootNode\\": \\"() =&gt; document\\"
      }"
    `)
  })

  it('should allow overrides', async () => {
    const ComponentUnderTest = () => (
      <Environment getRootNode={() => document}>
        <PrintEnvironment />
      </Environment>
    )
    render(<ComponentUnderTest />)

    expect(screen.getByLabelText('environment values').innerHTML).toMatchInlineSnapshot(`
      "{
        \\"getRootNode\\": \\"() =&gt; document\\"
      }"
    `)
  })

  it('should not override with undefined in overrides', async () => {
    const ComponentUnderTest = () => (
      <Environment getRootNode={() => document}>
        <PrintEnvironment override={{ getRootNode: undefined }} />
      </Environment>
    )
    render(<ComponentUnderTest />)

    expect(screen.getByLabelText('environment values').innerHTML).toMatchInlineSnapshot(`
      "{
        \\"getRootNode\\": \\"() =&gt; document\\"
      }"
    `)
  })
})
