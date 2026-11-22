<script lang="ts">
  import { Combobox, useCombobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import { getCaretPosition } from '@zag-js/dom-query'
  import styles from 'styles/combobox.module.css'
  import field from 'styles/field.module.css'

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

  let textareaRef = $state<HTMLTextAreaElement | null>(null)
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: (itemText, filterText) => contains(itemText, filterText),
  })

  const id = $props.id()
  const combobox = useCombobox(() => ({
    id,
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
</script>

<Combobox.RootProvider class={styles.Root} value={combobox}>
  <Combobox.Label class={styles.Label}>Comment</Combobox.Label>
  <Combobox.Input>
    {#snippet render(props)}
      <textarea
        {...props({
          oninput: (event: Event) => {
            if (combobox().open && !getMention(event.currentTarget as HTMLTextAreaElement)) combobox().setOpen(false)
          },
          onkeydown: (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') combobox().setOpen(false)
          },
          onpointerdown: () => combobox().setOpen(false),
          onscroll: () => combobox().reposition(),
        })}
        bind:this={textareaRef}
        class={field.Textarea}
        rows={4}
        placeholder="Type @ to mention someone"></textarea>
    {/snippet}
  </Combobox.Input>
  <Portal>
    <Combobox.Positioner class={styles.Positioner}>
      <Combobox.Content class={styles.Content}>
        <Combobox.Empty class={styles.Empty}>No people found</Combobox.Empty>
        <Combobox.List class={styles.List}>
          {#each collection().items as item (item)}
            <Combobox.Item class={styles.Item} {item}>
              <Combobox.ItemText class={styles.ItemText}>{item}</Combobox.ItemText>
            </Combobox.Item>
          {/each}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.RootProvider>
