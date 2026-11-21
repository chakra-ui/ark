import { createElement, ChevronsUpDown, Check } from 'lucide'

import { createListCollection } from '@ark-ui/web/select'

import styles from 'styles/select.module.css'

import button from 'styles/button.module.css'

interface Member {
  id: string
  name: string
  team: string
  away: boolean
}

const members: Member[] = [
  { id: 'ada', name: 'Ada Lovelace', team: 'Engineering', away: false },
  { id: 'alan', name: 'Alan Turing', team: 'Engineering', away: true },
  { id: 'grace', name: 'Grace Hopper', team: 'Engineering', away: false },
  { id: 'katherine', name: 'Katherine Johnson', team: 'Research', away: false },
  { id: 'margaret', name: 'Margaret Hamilton', team: 'Research', away: false },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <form class="stack">
      <ark-select class="${styles.Root}" name="assignee">
        <ark-select-label class="${styles.Label}">Assignee</ark-select-label>
        <ark-select-control class="${styles.Control}">
          <ark-select-trigger>
            <button class="${styles.Trigger}">
              <ark-select-value-text class="${styles.ValueText}" placeholder="Select a member"></ark-select-value-text>
            </button>
          </ark-select-trigger>
          <div class="${styles.Indicators}">
            <ark-select-indicator class="${styles.Indicator}">${createElement(ChevronsUpDown, { 'aria-hidden': 'true' }).outerHTML}</ark-select-indicator>
          </div>
        </ark-select-control>
        <ark-select-positioner class="${styles.Positioner}">
          <ark-select-content class="${styles.Content}">
            <ark-select-list class="${styles.List}">
              <template data-group>
                <ark-select-item-group class="${styles.ItemGroup}">
                  <ark-select-item-group-label class="${styles.ItemGroupLabel}"></ark-select-item-group-label>
                </ark-select-item-group>
              </template>
              <template>
                <ark-select-item class="${styles.Item}">
                  <ark-select-item-text class="${styles.ItemText}"></ark-select-item-text>
                  <ark-select-item-indicator class="${styles.ItemIndicator}">${createElement(Check, { 'aria-hidden': 'true' }).outerHTML}</ark-select-item-indicator>
                </ark-select-item>
              </template>
            </ark-select-list>
          </ark-select-content>
        </ark-select-positioner>
      </ark-select>
      <p data-testid="selection">No member selected</p>
      <button class="${button.Root}" type="submit">Submit</button>
      <output>Submitted: none</output>
    </form>`

  const select = root.querySelector('ark-select')!
  select.collection = createListCollection({
    items: members,
    itemToValue: (member) => member.id,
    itemToString: (member) => member.name,
    isItemDisabled: (member) => member.away,
    groupBy: (member) => member.team,
  })

  select.addEventListener('valuechange', (event) => {
    const [member] = event.detail.items as Member[]
    root.querySelector('[data-testid="selection"]')!.textContent = member
      ? `${member.name} works in ${member.team}`
      : 'No member selected'
  })

  root.querySelector('form')!.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    root.querySelector('output')!.textContent = `Submitted: ${data.get('assignee') ?? 'none'}`
  })
}
