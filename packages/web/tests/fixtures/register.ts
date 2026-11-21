import { parse as parseDate } from '@zag-js/date-picker'

import { createListCollection, createTreeCollection } from '../../src/index.js'

Object.assign(window, { parseDate, createListCollection, createTreeCollection })
