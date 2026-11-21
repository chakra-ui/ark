import '../../src/components/scroll-area/index.js'

import styles from 'styles/scroll-area.module.css'

const paragraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
]

const paragraph = (text: string) => /* html */ `<p class="${styles.Paragraph}" style="width: 50vw">${text}</p>`

const scrollbar = ({ orientation }: { orientation: 'horizontal' | 'vertical' }) => /* html */ `
  <ark-scroll-area-scrollbar class="${styles.Scrollbar}" orientation="${orientation}">
    <ark-scroll-area-thumb class="${styles.Thumb}"></ark-scroll-area-thumb>
  </ark-scroll-area-scrollbar>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-scroll-area class="${styles.Root}" style="height: 12rem">
  <ark-scroll-area-viewport class="${styles.Viewport}">
    <ark-scroll-area-content class="${styles.Content}">
      ${paragraphs.map(paragraph).join('')}
    </ark-scroll-area-content>
  </ark-scroll-area-viewport>
  ${scrollbar({ orientation: 'vertical' })}
  ${scrollbar({ orientation: 'horizontal' })}
  <ark-scroll-area-corner class="${styles.Corner}"></ark-scroll-area-corner>
</ark-scroll-area>`
}
