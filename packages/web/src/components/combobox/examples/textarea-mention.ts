import { getCaretPosition } from '@zag-js/dom-query'

import { createListCollection } from '@ark-ui/web/combobox'
import { createFilter } from '@ark-ui/web/locale'

import styles from 'styles/combobox.module.css'

import field from 'styles/field.module.css'

const { contains } = createFilter({ sensitivity: 'base' })

const people = [
  'Ada Lovelace',
  'Alan Turing',
  'Barbara Liskov',
  'Dennis Ritchie',
  'Grace Hopper',
  'Katherine Johnson',
  'Ken Thompson',
  'Linus Torvalds',
  'Margaret Hamilton',
  'Tim Berners-Lee',
]

function getMention(textarea: HTMLTextAreaElement) {
  const match = textarea.value.slice(0, textarea.selectionStart).match(/(?:^|\s)@([^\s@]*)$/)
  if (!match) return null
  return { query: match[1], start: textarea.selectionStart - match[1].length - 1 }
}

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-combobox class="${styles.Root}" value="" filter="none" allow-custom-value input-behavior="autohighlight" selection-behavior="preserve" open-on-key-press="false">
    <ark-combobox-label class="${styles.Label}">Comment</ark-combobox-label>
    <ark-combobox-input as-child>
      <textarea class="${field.Textarea}" rows="4" placeholder="Type @ to mention someone"></textarea>
    </ark-combobox-input>
    <ark-combobox-positioner class="${styles.Positioner}">
      <ark-combobox-content class="${styles.Content}">
        <ark-combobox-empty class="${styles.Empty}">No people found</ark-combobox-empty>
        <ark-combobox-list class="${styles.List}">
          <template>
            <ark-combobox-item class="${styles.Item}">
              <ark-combobox-item-text class="${styles.ItemText}"></ark-combobox-item-text>
            </ark-combobox-item>
          </template>
        </ark-combobox-list>
      </ark-combobox-content>
    </ark-combobox-positioner>
  </ark-combobox>`

  const combobox = root.querySelector('ark-combobox')!
  const textarea = root.querySelector('textarea')!

  const filter = (query: string) => {
    combobox.collection = createListCollection({ items: people.filter((person) => contains(person, query)) })
  }

  filter('')
  combobox.openOnChange = () => getMention(textarea) !== null
  combobox.positioning = {
    placement: 'bottom-start',
    gutter: 4,
    sameWidth: false,
    getAnchorElement() {
      const mention = getMention(textarea)
      if (!mention) return null
      return {
        contextElement: textarea,
        getBoundingClientRect() {
          const rect = textarea.getBoundingClientRect()
          const caret = getCaretPosition(textarea, { position: mention.start })
          return new DOMRect(rect.x + caret.left, rect.y + caret.top, 0, caret.height)
        },
      }
    },
  }

  combobox.addEventListener('inputvaluechange', () => {
    const mention = getMention(textarea)
    if (mention) filter(mention.query)
  })
  combobox.addEventListener('itemselect', (event) => {
    const mention = getMention(textarea)
    if (!mention) return
    requestAnimationFrame(() => {
      textarea.setRangeText(`@${event.detail.itemValue} `, mention.start, textarea.selectionStart, 'end')
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    })
  })

  textarea.addEventListener('input', () => {
    if (combobox.open && !getMention(textarea)) combobox.open = false
  })
  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') combobox.open = false
  })
  textarea.addEventListener('pointerdown', () => (combobox.open = false))
  textarea.addEventListener('scroll', () => combobox.api?.reposition())
}
