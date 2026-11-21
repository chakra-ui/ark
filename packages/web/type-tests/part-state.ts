import '../src/index.js'

const item = document.querySelector('ark-select-item')!
const selected: boolean | undefined = item.state?.selected

const trigger = document.querySelector('ark-select-trigger')!
const placeholderShown: boolean | undefined = trigger.state?.placeholderShown

const label = document.querySelector('ark-select-label')!
const open: boolean | undefined = label.state?.open

export { open, placeholderShown, selected }
