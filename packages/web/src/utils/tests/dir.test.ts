import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '../../components/slider/index.js'
import '../../components/tabs/index.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

test('a root takes its direction from the nearest ancestor with dir', async () => {
  document.body.innerHTML = `
    <div dir="rtl">
      <ark-slider default-value="50">
        <ark-slider-control><ark-slider-track><ark-slider-range></ark-slider-range></ark-slider-track><ark-slider-thumb></ark-slider-thumb></ark-slider-control>
      </ark-slider>
    </div>`
  const slider = document.querySelector('ark-slider')!
  await slider.ready
  const thumb = document.querySelector<HTMLElement>('ark-slider-thumb')!
  await waitFor(() => expect(thumb).toHaveAttribute('role', 'slider'))
  thumb.focus()
  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(slider.value).toEqual([49]))
  expect(document.querySelector('ark-slider-control')).toHaveAttribute('dir', 'rtl')
})

test('a root without a dir ancestor stays left to right', async () => {
  document.body.innerHTML = `
    <ark-slider default-value="50">
      <ark-slider-control><ark-slider-track></ark-slider-track><ark-slider-thumb></ark-slider-thumb></ark-slider-control>
    </ark-slider>`
  const slider = document.querySelector('ark-slider')!
  await slider.ready
  const thumb = document.querySelector<HTMLElement>('ark-slider-thumb')!
  await waitFor(() => expect(thumb).toHaveAttribute('role', 'slider'))
  thumb.focus()
  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(slider.value).toEqual([51]))
})
