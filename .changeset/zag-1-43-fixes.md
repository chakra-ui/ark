---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Color Picker**: Fix the channel input committing a partial value when you press `Enter` to confirm an IME
  composition.

- **Date Input**
  - Fix segment text lagging behind while you type over an already committed date.
  - Fix in-progress edits being dropped while focus catches up after auto-advance. Fast typing and
    `ArrowUp`/`ArrowDown`/`Home`/`End` now land on the segment you're actually editing.

- **Date Picker**
  - Fix disabled and read-only pickers still reacting to cell clicks, the clear trigger, and presets. Read-only pickers
    keep roving-focus navigation; disabled pickers drop out of the tab order.
  - Fix `minView`, `maxView`, and `defaultView` being ignored when resolving the initial view, which was hardcoded to
    day through year.
  - Fix `defaultOpen` winning over `open`, so a controlled picker could open against its own prop.
  - Fix `maxSelectedDates` not being enforced on month and year cells in `multiple` selection mode.
  - Fix keyboard range selection drifting from pointer behavior. Picking a third date restarts the range, and the hover
    preview updates for `Enter`, `Home`, `End`, and `PageUp`/`PageDown`.
  - Fix reopening the calendar with only a start date restarting the range instead of resuming it.

- **Drawer**: Fix the backdrop flickering on a controlled close when the `open` setter is async.

- **Field**: Fix `Field.Textarea` with `autoresize` dispatching a synthetic `input` event when you set `value`
  programmatically, which fed the value back into your framework and broke controlled state.

- **Focus Return**: Fix three focus-trap issues you'd hit with overlays.
  - Closing an overlay no longer steals focus back from an element your app focused in the meantime, like a second
    dialog opened right after closing the first.
  - Closing a nested overlay, such as a popover inside a dialog, no longer throws when the outer container has no
    connected focusable element at that moment.
  - The focus ring now shows on the returned-to element after you close with `Escape`.

  > Affects Dialog, Drawer, Popover, and anything else that traps focus.

- **Image Cropper**: Fix `getCroppedImage()` and `getCropData()` returning a different region from the one you see after
  rotating or flipping the image.

- **Marquee**: Fix scroll speed depending on content width. The duration now comes from the content size and the actual
  translation distance, so `speed` matches real pixel speed even when the content is narrower than the viewport.

- **Popover**: Fix tabbing out of portalled content looping back into the content when the trigger was the last tabbable
  element on the page. Focus now moves to the next tabbable element after the trigger.

- **Scroll Lock**: Fix the scroll lock targeting `<body>` on layouts where `<html>` is the real scroll container, which
  meant nothing was locked while an overlay was open.

- **Signature Pad**: Fix controlled `paths` drifting out of sync because the in-progress stroke was appended to `paths`.
  It now stays in `onDraw.currentPath` until the stroke ends.

- **Splitter**
  - Fix collapsed panels sizing to `minSize` instead of `collapsedSize`.
  - Fix keyboard resizing breaking when a resize trigger got focus while hovered.

- **Tour**
  - Fix dismissing a tour from a step's `effect` skipping cleanup, which could miss firing the `completed` status.
  - Fix a tooltip step's position resetting unexpectedly when the tour closed.
  - Fix a step action with `action: "skip"` doing nothing when clicked.

- **Solid**: Fix a `value` of `null` being read as uncontrolled, so controlled components fell back to internal state.

- **Solid, Svelte**: Fix machine exit actions running when a component was disposed before the machine started.

- **Vue, Svelte**: Fix `defaultValue` being resolved before `value`, unlike React and Solid.
