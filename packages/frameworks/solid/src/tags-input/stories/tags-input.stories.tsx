import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { TagsInput } from '../'
import './tags-input.css'

type TagsInputType = typeof TagsInput

const meta: Meta<TagsInputType> = {
  title: 'TagsInput',
  component: TagsInput,
}

export default meta

export const Basic = () => (
  <TagsInput.Root>
    {(api) => (
      <>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <Index each={api().value}>
            {(value, index) => (
              <TagsInput.Item index={index} value={value()}>
                <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                <TagsInput.ItemInput />
                <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            )}
          </Index>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </>
    )}
  </TagsInput.Root>
)

export const InitialValue = () => {
  return (
    <TagsInput.Root value={['React', 'Solid', 'Vue']}>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add tag" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const MaxWithOverflow = () => {
  return (
    <TagsInput.Root max={3} allowOverflow>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const Validated = () => {
  return (
    <TagsInput.Root
      validate={(details) => {
        return !details.value.includes(details.inputValue)
      }}
    >
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const BlurBehavior = () => {
  return (
    <TagsInput.Root blurBehavior="add">
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const PasteBehavior = () => {
  return (
    <TagsInput.Root addOnPaste delimiter=",">
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const DisabledEditing = () => {
  return (
    <TagsInput.Root allowEditTag={false}>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}

export const OnEvent = () => {
  return (
    <TagsInput.Root
      onValueChange={(details) => {
        console.log('tags changed to:', details.value)
      }}
      onHighlightChange={(details) => {
        console.log('highlighted tag:', details.highlightedValue)
      }}
      onValueInvalid={(details) => {
        console.log('Invalid!', details.reason)
      }}
      max={3}
      allowOverflow
      validate={(details) => {
        return !details.value.includes(details.inputValue)
      }}
    >
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <Index each={api().value}>
              {(value, index) => (
                <TagsInput.Item index={index} value={value()}>
                  <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
                </TagsInput.Item>
              )}
            </Index>
          </TagsInput.Control>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}
