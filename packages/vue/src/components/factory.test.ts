import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { nextTick, ref } from 'vue'
import NestedAsChild from './factory/tests/nested-as-child.vue'
import RenderProps from './factory/tests/render-props.vue'
import RenderState from './factory/tests/render-state.vue'
import RenderEmptyState from './factory/tests/render-empty-state.vue'
import RenderOverAsChild from './factory/tests/render-over-as-child.vue'
import PlainChildClass from './factory/tests/plain-child-class.vue'
import PlainChildHandlers from './factory/tests/plain-child-handlers.vue'
import CommentChild from './factory/tests/comment-child.vue'
import ReactiveAsChild from './factory/tests/reactive-as-child.vue'
import CommentOnly from './factory/tests/comment-only.vue'
import MergeEvents from './factory/tests/merge-events.vue'
import PropagateAsChild from './factory/tests/propagate-as-child.vue'
import StopAsChild from './factory/tests/stop-as-child.vue'

describe('Factory / render slot', () => {
  it('should render the slot with the forwarded props', async () => {
    const onClick = vi.fn()
    render(RenderProps, { props: { onClick } })

    const child = screen.getByTestId('child')
    expect(child.dataset['part']).toBe('trigger')

    await user.click(child)
    expect(onClick).toHaveBeenCalled()
  })

  it('should forward the state', () => {
    render(RenderState, { props: { open: true } })
    expect(screen.getByTestId('child')).toHaveTextContent('Open')
  })

  it('should default the state to an empty object', () => {
    const onState = vi.fn()
    render(RenderEmptyState, { props: { onState } })
    expect(onState).toHaveBeenCalledWith({})
  })

  it('should take precedence over asChild', () => {
    render(RenderOverAsChild)
    expect(screen.getByTestId('child')).toBeVisible()
    expect(screen.queryByTestId('as-child')).toBeNull()
  })
})

describe('Factory', () => {
  it('should render only the child', () => {
    render(NestedAsChild)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(NestedAsChild)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    expect(child.dataset.part).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(NestedAsChild)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Ark UI')).toBeVisible()
  })

  it('should not duplicate the class of a plain child element', () => {
    render(PlainChildClass)
    const child = screen.getByTestId('child')
    expect(child.className.split(/\s+/).filter(Boolean).sort()).toEqual(['child', 'parent'])
  })

  it('should call each handler of a plain child element once', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(PlainChildHandlers, { props: { onClickParent, onClickChild } })
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalledTimes(1)
    expect(onClickChild).toHaveBeenCalledTimes(1)
  })

  it('should apply props to the first non-comment child', () => {
    render(CommentChild)
    const child = screen.getByTestId('child')
    expect(child.className.split(/\s+/).filter(Boolean).sort()).toEqual(['child', 'parent'])
  })

  it('should patch reactive props onto the same child element', async () => {
    const parentClass = ref('a')
    const { container, rerender } = render(ReactiveAsChild, { props: { parentClass: parentClass.value } })
    const before = screen.getByTestId('child')
    expect(before.className.split(/\s+/).filter(Boolean).sort()).toEqual(['a', 'child'])

    parentClass.value = 'b'
    await rerender({ parentClass: parentClass.value })
    await nextTick()

    const after = container.querySelector('[data-testid="child"]')
    expect(after).toBe(before)
    expect(after?.className.split(/\s+/).filter(Boolean).sort()).toEqual(['b', 'child'])
  })

  it('should render comment-only children untouched', () => {
    const { container } = render(CommentOnly)
    expect(container.innerHTML).toBe('<!--v-if-->')
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(MergeEvents, { props: { onClickParent, onClickChild } })
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should propagate asChild', async () => {
    render(PropagateAsChild)
    expect(screen.getByText('Ark UI')).toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(StopAsChild)
    expect(screen.getByText('Ark UI')).not.toHaveAttribute('data-testid', 'parent')
  })
})
