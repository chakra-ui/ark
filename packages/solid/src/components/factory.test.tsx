import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import type { JSX } from 'solid-js'
import { ark } from './factory.tsx'

const ComponentUnderTest = () => (
  <ark.div
    id="parent"
    data-part="parent"
    data-testid="parent"
    class="parent"
    style={{ background: 'red' }}
    asChild={(props) => (
      <ark.span
        {...props({ id: 'child', class: 'child', style: { color: 'blue' } })}
        data-part="child"
        data-testid="child"
      >
        Child
      </ark.span>
    )}
  >
    Parent
  </ark.div>
)

const MyButton = (props: { children?: JSX.Element } & JSX.HTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props} data-testid="child" />
)

describe('Ark Factory', () => {
  describe('render as function', () => {
    it('should render the returned element with the forwarded props', async () => {
      const onClick = vi.fn()
      render(() => (
        <ark.button data-part="trigger" onClick={onClick} render={(props) => <MyButton {...props}>Ark UI</MyButton>} />
      ))

      const child = screen.getByTestId('child')
      expect(child.dataset['part']).toBe('trigger')

      await user.click(child)
      expect(onClick).toHaveBeenCalled()
    })

    it('should not double-apply props the render fn did not spread', async () => {
      const onClick = vi.fn()
      render(() => <ark.button onClick={onClick} render={(props) => <MyButton {...props} />} />)

      await user.click(screen.getByTestId('child'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should forward the state', () => {
      render(() => (
        <ark.button
          state={{ open: true }}
          render={(props, state: { open: boolean }) => <MyButton {...props}>{state.open ? 'Open' : 'Closed'}</MyButton>}
        />
      ))

      expect(screen.getByTestId('child')).toHaveTextContent('Open')
    })

    it('should default the state to an empty object', () => {
      const spy = vi.fn()
      render(() => (
        <ark.button
          render={(props, state) => {
            spy(state)
            return <MyButton {...props} />
          }}
        />
      ))

      expect(spy).toHaveBeenCalledWith({})
    })

    it('should not render anything when the fn returns null', () => {
      const { container } = render(() => <ark.button render={() => null} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('should not pass ref to the render fn', () => {
      const spy = vi.fn()
      let el: HTMLButtonElement | undefined
      render(() => (
        <ark.button
          ref={el}
          render={(props) => {
            spy(Object.keys(props))
            return <MyButton {...props} />
          }}
        />
      ))
      expect(spy.mock.calls[0][0]).not.toContain('ref')
    })
  })

  describe('asChild (deprecated)', () => {
    it('should render only the child', () => {
      render(() => <ComponentUnderTest />)
      expect(screen.getByText('Child')).toBeVisible()
    })

    it('should merge styles', () => {
      render(() => <ComponentUnderTest />)
      expect(screen.getByText('Child')).toHaveStyle({ color: 'rgb(0, 0, 255)', background: 'red' })
    })

    it('should merge classes', () => {
      render(() => <ComponentUnderTest />)
      expect(screen.getByText('Child')).toHaveClass('child parent')
    })

    it('should merge events', async () => {
      const onClickParent = vi.fn()
      const onClickChild = vi.fn()
      render(() => (
        <ark.div
          data-testid="parent"
          onClick={onClickParent}
          asChild={(props) => <ark.span {...props({ onClick: onClickChild })} data-testid="child" />}
        >
          Parent
        </ark.div>
      ))
      await user.click(screen.getByTestId('child'))
      expect(onClickParent).toHaveBeenCalled()
      expect(onClickChild).toHaveBeenCalled()
    })

    it('should stop propagate asChild', async () => {
      render(() => (
        <ark.div
          data-testid="parent"
          asChild={(props) => (
            <ark.span {...props()}>
              <ark.span>Child</ark.span>
            </ark.span>
          )}
        >
          Parent
        </ark.div>
      ))
      expect(screen.getByText('Child')).not.toHaveAttribute('data-testid', 'parent')
    })
  })
})
