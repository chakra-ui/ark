import { Combobox, useCombobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { getCaretPosition } from '@zag-js/dom-query'
import { useRef } from 'react'
import styles from 'styles/combobox.module.css'
import field from 'styles/field.module.css'

export const TextareaMention = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  })

  const combobox = useCombobox({
    collection,
    value: [],
    allowCustomValue: true,
    inputBehavior: 'autohighlight',
    selectionBehavior: 'preserve',
    openOnKeyPress: false,
    openOnChange: () => !!textareaRef.current && getMention(textareaRef.current) !== null,
    onInputValueChange() {
      const mention = textareaRef.current && getMention(textareaRef.current)
      if (mention) filter(mention.query)
    },
    onSelect({ itemValue }) {
      const textarea = textareaRef.current
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
        const textarea = textareaRef.current
        const mention = textarea && getMention(textarea)
        if (!textarea || !mention) return null
        return { contextElement: textarea, getBoundingClientRect: () => getCaretRect(textarea, mention.start) }
      },
    },
  })

  return (
    <Combobox.RootProvider className={styles.Root} value={combobox}>
      <Combobox.Label className={styles.Label}>Comment</Combobox.Label>
      <Combobox.Input
        render={
          <textarea
            ref={textareaRef}
            className={field.Textarea}
            rows={4}
            placeholder="Type @ to mention someone"
            onChange={(event) => {
              if (combobox.open && !getMention(event.currentTarget)) combobox.setOpen(false)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') combobox.setOpen(false)
            }}
            onPointerDown={() => combobox.setOpen(false)}
            onScroll={() => combobox.reposition()}
          />
        }
      />
      <Portal>
        <Combobox.Positioner className={styles.Positioner}>
          <Combobox.Content className={styles.Content}>
            <Combobox.Empty className={styles.Empty}>No people found</Combobox.Empty>
            <Combobox.List className={styles.List}>
              {collection.items.map((item) => (
                <Combobox.Item className={styles.Item} key={item} item={item}>
                  <Combobox.ItemText className={styles.ItemText}>{item}</Combobox.ItemText>
                </Combobox.Item>
              ))}
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
