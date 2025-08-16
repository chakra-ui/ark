import { ScrollArea } from '@ark-ui/react/scroll-area'

export const Nested = () => (
  <ScrollArea.Root style={{ height: '12rem', width: '50%' }}>
    <ScrollArea.Viewport style={{ height: '100%' }}>
      <ScrollArea.Content style={{ padding: '1rem 1rem 1.5rem' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <ScrollArea.Root style={{ height: '8rem' }}>
          <ScrollArea.Viewport style={{ height: '100%' }}>
            <ScrollArea.Content style={{ padding: '1rem 1rem 1.5rem' }}>
              <p>
                This is a nested scroll area. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar>
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner />
  </ScrollArea.Root>
)
