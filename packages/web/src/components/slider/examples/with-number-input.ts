import '@ark-ui/web/number-input'
import '@ark-ui/web/slider'

import numberInput from 'styles/number-input.module.css'

import styles from 'styles/slider.module.css'

const min = 0
const max = 1000
const step = 10
const minStepsBetweenThumbs = 5
const gap = step * minStepsBetweenThumbs

const input = (label: string) => /* html */ `
  <ark-number-input class="${numberInput.Root}" step="${step}">
    <ark-number-input-label class="${numberInput.Label}">${label}</ark-number-input-label>
    <ark-number-input-control class="${numberInput.Control}">
      <ark-number-input-input><input class="${numberInput.Input}" /></ark-number-input-input>
    </ark-number-input-control>
  </ark-number-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <ark-slider class="${styles.Root}" min="${min}" max="${max}" step="${step}" min-steps-between-thumbs="${minStepsBetweenThumbs}">
      <ark-slider-label class="${styles.Label}">Price range</ark-slider-label>
      <ark-slider-control class="${styles.Control}">
        <ark-slider-track class="${styles.Track}"><ark-slider-range class="${styles.Range}"></ark-slider-range></ark-slider-track>
        <ark-slider-thumb class="${styles.Thumb}" index="0"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
        <ark-slider-thumb class="${styles.Thumb}" index="1"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
      </ark-slider-control>
    </ark-slider>
    <div class="hstack">${input('Min')}${input('Max')}</div>
  </div>`

  const slider = root.querySelector('ark-slider')!
  const [minInput, maxInput] = root.querySelectorAll('ark-number-input')
  let value: (number | null)[] = [200, 600]

  const render = () => {
    const start = value[0] ?? min
    const end = value[1] ?? max
    slider.setAttribute(
      'value',
      [Math.min(Math.max(start, min), max - gap), Math.min(Math.max(end, start + gap), max)].join(','),
    )
    minInput.setAttribute('value', String(value[0] ?? ''))
    minInput.setAttribute('min', String(min))
    minInput.setAttribute('max', String(end - gap))
    maxInput.setAttribute('value', String(value[1] ?? ''))
    maxInput.setAttribute('min', String(start + gap))
    maxInput.setAttribute('max', String(max))
  }

  slider.getAriaLabel = ({ index }) => (index === 0 ? 'Minimum price' : 'Maximum price')
  slider.addEventListener('valuechange', (event) => {
    value = event.detail.value
    render()
  })
  for (const [index, el] of [minInput, maxInput].entries()) {
    el.addEventListener('valuechange', (event) => {
      value = value.map((v, i) => (i === index ? event.detail.value : v))
      render()
    })
  }
  render()
}
