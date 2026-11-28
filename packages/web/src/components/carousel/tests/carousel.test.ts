import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Autoplay } from '../examples/autoplay.js'
import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as ScrollTo } from '../examples/scroll-to.js'
import { mount as SlidesPerPage } from '../examples/slides-per-page.js'
import { mount as Vertical } from '../examples/vertical.js'
import { intersect, mount } from '../../../test-utils.js'

const user = userEvent.setup()

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const layout = (root: HTMLElement, { perPage = 1, vertical = false } = {}) => {
  const size = 500
  const group = root.querySelector<HTMLElement>('ark-carousel-item-group')!
  const items = Array.from(root.querySelectorAll<HTMLElement>('ark-carousel-item'))
  const itemSize = size / perPage
  const [offset, scroll] = vertical ? ['offsetHeight', 'scrollHeight'] : ['offsetWidth', 'scrollWidth']
  Object.defineProperty(group, offset, { configurable: true, value: size })
  Object.defineProperty(group, scroll, { configurable: true, value: items.length * itemSize })
  group.getBoundingClientRect = () => new DOMRect(0, 0, size, size)
  items.forEach((item, index) => {
    item.getBoundingClientRect = () =>
      vertical
        ? new DOMRect(0, index * itemSize - group.scrollTop, size, itemSize)
        : new DOMRect(index * itemSize - group.scrollLeft, 0, itemSize, size)
  })
}

const mountWithLayout = async (example: (root: HTMLElement) => void, options?: Parameters<typeof layout>[1]) => {
  mount((root) => {
    example(root)
    layout(root, options)
  })
  const carousel = document.querySelector('ark-carousel')!
  await carousel.ready
  return carousel
}

const next = () => screen.getByRole('button', { name: 'Next slide' })

const prev = () => screen.getByRole('button', { name: 'Previous slide' })

const indicator = (n: number) => document.querySelectorAll('ark-carousel-indicator button')[n - 1]

const expectPage = async (n: number) => {
  await waitFor(() => expect(indicator(n)).toHaveAttribute('data-current', ''))
  for (const other of document.querySelectorAll('ark-carousel-indicator button')) {
    if (other !== indicator(n)) expect(other).not.toHaveAttribute('data-current')
  }
}

test('the root is a labelled carousel region with slides', async () => {
  await mountWithLayout(Basic)

  const region = screen.getByRole('region')
  expect(region).toHaveAttribute('aria-roledescription', 'carousel')
  const slides = within(region).getAllByRole('group', { hidden: true })
  expect(slides).toHaveLength(5)
  expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide')
  expect(slides[0]).toHaveAttribute('aria-label', '1 of 5')
})

test('the next and previous triggers move between pages and disable at the ends', async () => {
  const carousel = await mountWithLayout(Basic)
  const pagechange = vi.fn()
  carousel.addEventListener('pagechange', pagechange)
  await expectPage(1)
  expect(prev()).toBeDisabled()
  expect(next()).toBeEnabled()

  await user.click(next())

  await expectPage(2)
  expect(pagechange.mock.lastCall?.[0].detail.page).toBe(1)
  expect(prev()).toBeEnabled()

  await user.click(prev())
  await expectPage(1)

  for (let i = 0; i < 4; i++) await user.click(next())

  await expectPage(5)
  expect(next()).toBeDisabled()
})

test('clicking an indicator goes to its page', async () => {
  const carousel = await mountWithLayout(Basic)
  await expectPage(1)
  expect(indicator(4)).toHaveAccessibleName('Go to slide 4')

  await user.click(indicator(4))

  await expectPage(4)
  expect(carousel.page).toBe(3)
  expect(next()).toBeEnabled()
})

test('arrow keys, Home and End on the indicators move between pages', async () => {
  await mountWithLayout(Basic)
  await user.click(indicator(2))
  await expectPage(2)

  await user.keyboard('{ArrowRight}')
  await expectPage(3)
  await waitFor(() => expect(indicator(3)).toHaveFocus())

  await user.keyboard('{ArrowLeft}')
  await expectPage(2)

  await user.keyboard('{End}')
  await expectPage(5)

  await user.keyboard('{Home}')
  await expectPage(1)
})

test('arrow keys move between pages while the slides have focus', async () => {
  await mountWithLayout(Basic)
  await expectPage(1)

  await user.tab()
  expect(document.querySelector('ark-carousel-item-group')).toHaveFocus()

  await user.keyboard('{ArrowRight}')
  await expectPage(2)

  await user.keyboard('{End}')
  await expectPage(5)

  await user.keyboard('{ArrowLeft}')
  await expectPage(4)
})

test('loop wraps from the first page to the last and back', async () => {
  await mountWithLayout((root) => {
    Basic(root)
    root.querySelector('ark-carousel')!.setAttribute('loop', '')
  })
  await expectPage(1)
  expect(prev()).toBeEnabled()

  await user.click(prev())
  await expectPage(5)
  expect(next()).toBeEnabled()

  await user.click(next())
  await expectPage(1)
})

test('slides-per-page groups slides into fewer pages', async () => {
  await mountWithLayout(SlidesPerPage, { perPage: 2 })

  await waitFor(() => expect(document.querySelectorAll('ark-carousel-indicator button')).toHaveLength(3))
  await expectPage(1)

  await user.click(next())
  await user.click(next())

  await expectPage(3)
  expect(next()).toBeDisabled()
})

test('the controlled page attribute drives the carousel and page changes are reported', async () => {
  const carousel = await mountWithLayout(Controlled)
  await expectPage(1)

  carousel.setAttribute('page', '3')
  await expectPage(4)

  await user.click(next())

  await expectPage(5)
})

test('a controlled page stays put when the change is not applied', async () => {
  const carousel = await mountWithLayout((root) => {
    Basic(root)
    root.querySelector('ark-carousel')!.setAttribute('page', '1')
  })
  const pagechange = vi.fn()
  carousel.addEventListener('pagechange', pagechange)
  await expectPage(2)

  await user.click(next())

  await waitFor(() => expect(pagechange).toHaveBeenCalled())
  expect(pagechange.mock.lastCall?.[0].detail.page).toBe(2)
  await settle()
  await expectPage(2)
})

test('autoplay advances on an interval until it is stopped', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  try {
    const fakeUser = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    const carousel = await mountWithLayout(Autoplay)
    const statuschange = vi.fn()
    carousel.addEventListener('autoplaystatuschange', statuschange)
    const trigger = await screen.findByRole('button', { name: 'Stop slide rotation' })
    await waitFor(() => expect(trigger).toHaveAttribute('data-pressed', ''))
    expect(carousel.page).toBe(0)

    await vi.advanceTimersByTimeAsync(4100)
    await waitFor(() => expect(carousel.page).toBe(1))

    await fakeUser.click(trigger)

    await waitFor(() => expect(trigger).toHaveAccessibleName('Start slide rotation'))
    expect(trigger).not.toHaveAttribute('data-pressed')
    expect(statuschange.mock.lastCall?.[0].detail.isPlaying).toBe(false)
    await vi.advanceTimersByTimeAsync(10_000)
    expect(carousel.page).toBe(1)

    await fakeUser.click(trigger)
    await waitFor(() => expect(trigger).toHaveAccessibleName('Stop slide rotation'))
    await vi.advanceTimersByTimeAsync(4100)
    await waitFor(() => expect(carousel.page).toBe(2))
  } finally {
    vi.useRealTimers()
  }
})

test('a vertical carousel moves with the up and down arrow keys', async () => {
  const carousel = await mountWithLayout(Vertical, { vertical: true })
  expect(carousel).toHaveAttribute('data-orientation', 'vertical')
  await user.click(indicator(1))
  await expectPage(1)

  await user.keyboard('{ArrowDown}')
  await expectPage(2)

  await user.keyboard('{ArrowRight}')
  await settle()
  await expectPage(2)

  await user.keyboard('{ArrowUp}')
  await expectPage(1)
})

test('scrollToIndex goes to the page holding that slide', async () => {
  const carousel = await mountWithLayout(ScrollTo)
  await expectPage(1)

  await user.click(screen.getByText('Go to slide 4'))

  await expectPage(4)
  expect(carousel.page).toBe(3)
})

test('a slide that scrolls into view is exposed to assistive tech', async () => {
  await mountWithLayout(Basic)
  const [first, second] = Array.from(document.querySelectorAll('ark-carousel-item'))
  await waitFor(() => expect(first).toHaveAttribute('aria-hidden', 'true'))

  intersect(first)

  await waitFor(() => expect(first).not.toHaveAttribute('aria-hidden'))
  expect(first).toHaveAttribute('data-inview', '')
  expect(second).toHaveAttribute('aria-hidden', 'true')
})
