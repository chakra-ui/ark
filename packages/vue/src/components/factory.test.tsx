import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { createCommentVNode, defineComponent, h, nextTick, ref } from 'vue'
import { ark } from './factory.ts'

const ComponentUnderTest = (
  <ark.div id="parent" data-part="parent" data-testid="parent" className="parent" style={{ background: 'red' }} asChild>
    <ark.span id="child" data-part="child" data-testid="child" className="child" style={{ color: 'blue' }}>
      Ark UI
    </ark.span>
  </ark.div>
)

describe('Factory', () => {
  it('should render only the child', () => {
    render(ComponentUnderTest)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(ComponentUnderTest)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    expect(child.dataset.part).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(ComponentUnderTest)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Ark UI')).toBeVisible()
  })

  it('should not duplicate the class of a plain child element', () => {
    render(
      <ark.div class="parent" asChild>
        <span data-testid="child" class="child">
          Ark UI
        </span>
      </ark.div>,
    )
    const child = screen.getByTestId('child')
    expect(child.className.split(/\s+/).filter(Boolean).sort()).toEqual(['child', 'parent'])
  })

  it('should call each handler of a plain child element once', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(
      <ark.div onClick={onClickParent} asChild>
        <button type="button" data-testid="child" onClick={onClickChild} />
      </ark.div>,
    )
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalledTimes(1)
    expect(onClickChild).toHaveBeenCalledTimes(1)
  })

  it('should apply props to the first non-comment child', () => {
    render(
      defineComponent({
        setup: () => () =>
          h(ark.div, { class: 'parent', asChild: true }, () => [
            createCommentVNode('placeholder'),
            h('span', { 'data-testid': 'child', class: 'child' }, 'Ark UI'),
          ]),
      }),
    )
    const child = screen.getByTestId('child')
    expect(child.className.split(/\s+/).filter(Boolean).sort()).toEqual(['child', 'parent'])
  })

  it('should patch reactive props onto the same child element', async () => {
    const parentClass = ref('a')
    const { container } = render(
      defineComponent({
        setup: () => () =>
          h(ark.div, { class: parentClass.value, asChild: true }, () => [
            h('span', { 'data-testid': 'child', class: 'child' }, 'Ark UI'),
          ]),
      }),
    )
    const before = screen.getByTestId('child')
    expect(before.className.split(/\s+/).filter(Boolean).sort()).toEqual(['a', 'child'])

    parentClass.value = 'b'
    await nextTick()

    const after = container.querySelector('[data-testid="child"]')
    expect(after).toBe(before)
    expect(after?.className.split(/\s+/).filter(Boolean).sort()).toEqual(['b', 'child'])
  })

  it('should render comment-only children untouched', () => {
    const { container } = render(
      defineComponent({
        setup: () => () => h(ark.div, { class: 'parent', asChild: true }, () => [createCommentVNode('v-if')]),
      }),
    )
    expect(container.innerHTML).toBe('<!--v-if-->')
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(
      <ark.div data-testid="parent" onClick={onClickParent} asChild>
        <ark.span data-testid="child" onClick={onClickChild} />
      </ark.div>,
    )
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should propagate asChild', async () => {
    render(
      <ark.div data-testid="parent" asChild>
        <ark.span asChild>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>,
    )
    expect(screen.getByText('Ark UI')).toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(
      <ark.div data-testid="parent" asChild>
        <ark.span asChild={false}>
          <ark.span>Ark UI</ark.span>
        </ark.span>
      </ark.div>,
    )
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })
})
