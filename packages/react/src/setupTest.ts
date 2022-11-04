import '@testing-library/jest-dom'
import { mockResizeObserver } from 'jsdom-testing-mocks'
import { vi } from 'vitest'

// TODO this should work :()
vi.stubGlobal('ResizeObserver', mockResizeObserver)
