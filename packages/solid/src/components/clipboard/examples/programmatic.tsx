import { Clipboard } from '@ark-ui/solid/clipboard'

export const Programmatic = () => {
  return (
    <Clipboard.Root value="https://ark-ui.com">
      <Clipboard.Context>
        {(clipboard) => (
          <button onClick={() => clipboard().copy()}>{clipboard().copied ? 'Copied!' : 'Copy URL'}</button>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  )
}
