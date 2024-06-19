import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import { EnvironmentProvider } from '../../providers'
import { Portal } from './portal'

const PortalWithContainerTest = (props: { disabled?: boolean }) => {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div>
      <Portal container={container} disabled={props.disabled}>
        <p>Anything must be visible</p>
      </Portal>
      <div data-testid="container" ref={container} />
    </div>
  )
}

describe('Portal', () => {
  it('should render portal without element children', () => {
    render(<Portal>Anything must be visible</Portal>)
    expect(screen.getByText('Anything must be visible')).toBeVisible()
  })

  it('should render portal with element children', () => {
    render(
      <Portal>
        <p>Anything must be visible</p>
      </Portal>,
    )
    expect(screen.getByText('Anything must be visible')).toBeVisible()
  })

  it('should render portal with multiple element children', () => {
    render(
      <Portal>
        <p>Anything must be visible</p>
        <p>Another visible item</p>
      </Portal>,
    )
    expect(screen.getByText('Anything must be visible')).toBeVisible()
    expect(screen.getByText('Another visible item')).toBeVisible()
  })

  it('should render portal children next to the body', () => {
    const view = render(
      <div>
        <Portal>
          <p>Anything must be visible</p>
        </Portal>
      </div>,
    )

    expect(view.baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div />
        </div>
        <p>
          Anything must be visible
        </p>
      </body>
    `)
  })

  it('should not render portal children next to the body if marked as `disabled`', () => {
    const view = render(
      <div>
        <Portal disabled>
          <p>Anything must be visible</p>
        </Portal>
      </div>,
    )

    expect(view.baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div>
            <p>
              Anything must be visible
            </p>
          </div>
        </div>
      </body>
    `)
  })

  it('should render portal children inside a custom element', () => {
    render(<PortalWithContainerTest />)

    const container = screen.getByTestId('container')
    expect(container).toBeInTheDocument()
    expect(container).not.toBeEmptyDOMElement()
    expect(screen.getByText('Anything must be visible')).toBeVisible()
  })

  it('should not render portal children inside a custom element if marked as `disabled`', () => {
    render(<PortalWithContainerTest disabled />)

    const container = screen.getByTestId('container')
    expect(container).toBeInTheDocument()
    expect(container).toBeEmptyDOMElement()
    expect(screen.getByText('Anything must be visible')).toBeVisible()
  })

  it('should render portal children inside a shadow root', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const shadowRoot = div.attachShadow({ mode: 'open' })
    const view = render(
      <EnvironmentProvider value={() => shadowRoot}>
        <Portal>
          <p>Anything must be visible</p>
        </Portal>
      </EnvironmentProvider>,
    )
    expect(view.baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
        <div />
      </body>
    `)
    expect(shadowRoot.innerHTML).toMatchInlineSnapshot(`"<p>Anything must be visible</p>"`)
  })
})
