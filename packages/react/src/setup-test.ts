/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'

// happy-dom does not ship the UA stylesheet, so the `hidden` attribute is not
// reflected to `display: none`. Without this, axe treats visually-hidden form
// controls (e.g. Slider/TagsInput hidden inputs) as visible and reports false
// nested-interactive / label violations.
const uaStyle = document.createElement('style')
uaStyle.textContent = '[hidden]{display:none !important}'
document.head.appendChild(uaStyle)
