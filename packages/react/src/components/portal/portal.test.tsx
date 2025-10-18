import { render, screen, waitFor } from '@testing-library/react'
import { useRef } from 'react'
import { EnvironmentProvider } from '../../providers'
import { Portal } from './portal'

const PortalWithContainerTest = (props: { disabled?: boolean | undefined }) => {
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
    const { baseElement, container } = render(
      <div data-testid="parent">
        <Portal>
          <p>Anything must be visible</p>
        </Portal>
      </div>,
    )

    const portalContent = screen.getByText('Anything must be visible')
    expect(portalContent).toBeVisible()
    expect(baseElement).toContainElement(portalContent)
    expect(container.querySelector('[data-testid="parent"]')).not.toContainElement(portalContent)
  })

  it('should not render portal children next to the body if marked as `disabled`', () => {
    const { container } = render(
      <div data-testid="parent">
        <Portal disabled>
          <p>Anything must be visible</p>
        </Portal>
      </div>,
    )

    const portalContent = screen.getByText('Anything must be visible')
    expect(portalContent).toBeVisible()
    expect(container.querySelector('[data-testid="parent"]')).toContainElement(portalContent)
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
    render(
      <EnvironmentProvider value={() => shadowRoot}>
        <Portal>
          <p>Anything must be visible</p>
        </Portal>
      </EnvironmentProvider>,
    )
    expect(shadowRoot.innerHTML).toBe('<p>Anything must be visible</p>')
  })

  it('should render twice if container was specified', async () => {
    const RenderCount = () => {
      RenderCount.count++
      return <div>{RenderCount.count}</div>
    }
    RenderCount.count = 0

    const Test = () => {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <>
          <Portal container={ref}>
            <RenderCount />
          </Portal>
          <div ref={ref} />
        </>
      )
    }
    render(<Test />)
    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument())
  })

  it('should render once if container was not specified', async () => {
    const RenderCount = () => {
      RenderCount.count++
      return <div>{RenderCount.count}</div>
    }
    RenderCount.count = 0
    const Test = () => {
      return (
        <Portal>
          <RenderCount />
        </Portal>
      )
    }
    render(<Test />)
    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument())
  })
})
