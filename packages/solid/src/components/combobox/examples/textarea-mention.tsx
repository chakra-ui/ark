import { Combobox, useCombobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { Portal } from '@solidjs/web'
import { getCaretPosition } from '@zag-js/dom-query'
import { For } from 'solid-js'
import styles from 'styles/combobox.module.css'
import field from 'styles/field.module.css'

export const TextareaMention = () => {
  let textareaRef: HTMLTextAreaElement | undefined
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  })

  const combobox = useCombobox(() => ({
    collection: collection(),
    value: [],
    allowCustomValue: true,
    inputBehavior: 'autohighlight',
    selectionBehavior: 'preserve',
    openOnKeyPress: false,
    openOnChange: () => !!textareaRef && getMention(textareaRef) !== null,
    onInputValueChange() {
      const mention = textareaRef && getMention(textareaRef)
      if (mention) filter(mention.query)
    },
    onSelect({ itemValue }) {
      const textarea = textareaRef
      const mention = textarea && getMention(textarea)
      if (!textarea || !mention) return
      requestAnimationFrame(() => {
        textarea.setRangeText(`@${itemValue} `, mention.start, textarea.selectionStart, 'end')
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
      })
    },
    positioning: {
      placement: 'bottom-start',
      sameWidth: false,
      gutter: 4,
      getAnchorElement() {
        const textarea = textareaRef
        const mention = textarea && getMention(textarea)
        if (!textarea || !mention) return null
        return { contextElement: textarea, getBoundingClientRect: () => getCaretRect(textarea, mention.start) }
      },
    },
  }))

  return (
    <Combobox.RootProvider class={styles.Root} value={combobox}>
      <Combobox.Label class={styles.Label}>Comment</Combobox.Label>
      <Combobox.Input
        render={(props) => (
          <textarea
            {...props({
              onInput: () => {
                if (combobox().open && textareaRef && !getMention(textareaRef)) combobox().setOpen(false)
              },
              onKeyDown: (event) => {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') combobox().setOpen(false)
              },
              onPointerDown: () => combobox().setOpen(false),
              onScroll: () => combobox().reposition(),
            })}
            ref={textareaRef}
            class={field.Textarea}
            rows={4}
            placeholder="Type @ to mention someone"
          />
        )}
      />
      <Portal>
        <Combobox.Positioner class={styles.Positioner}>
          <Combobox.Content class={styles.Content}>
            <Combobox.Empty class={styles.Empty}>No people found</Combobox.Empty>
            <Combobox.List class={styles.List}>
              <For each={collection().items}>
                {(item) => (
                  <Combobox.Item class={styles.Item} item={item}>
                    <Combobox.ItemText class={styles.ItemText}>{item}</Combobox.ItemText>
                  </Combobox.Item>
                )}
              </For>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}

const getMention = (textarea: HTMLTextAreaElement) => {
  const match = textarea.value.slice(0, textarea.selectionStart).match(/(?:^|\s)@([^\s@]*)$/)
  if (!match) return null
  return { query: match[1], start: textarea.selectionStart - match[1].length - 1 }
}

const getCaretRect = (textarea: HTMLTextAreaElement, position: number) => {
  const rect = textarea.getBoundingClientRect()
  const caret = getCaretPosition(textarea, { position })
  return new DOMRect(rect.x + caret.left, rect.y + caret.top, 0, caret.height)
}

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
