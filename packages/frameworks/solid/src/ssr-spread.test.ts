import { ssrSpread } from './ssr-spread'

describe('ssrSpread', () => {
  it('it works', () => {
    const attrs = {
      'data-active': '3',
    }
    expect(ssrSpread({ t: '<button>Trigger</button>' }, attrs)).toEqual({
      t: '<button data-active="3">Trigger</button>',
    })
  })

  it('can merge style prop', () => {
    const attrs = {
      style: 'position:absolute;',
    }
    expect(ssrSpread({ t: '<button style="color:red">Trigger</button>' }, attrs)).toEqual({
      t: '<button style="position:absolute;color:red">Trigger</button>',
    })
  })

  it('can merge class prop', () => {
    const attrs = {
      class: 'foo',
    }
    expect(ssrSpread({ t: '<button class="bar">Trigger</button>' }, attrs)).toEqual({
      t: '<button class="foo bar">Trigger</button>',
    })
  })

  it('drops falsy boolean attributes', () => {
    const attrs = {
      disabled: false,
    }
    expect(ssrSpread({ t: '<button>Trigger</button>' }, attrs)).toEqual({
      t: '<button>Trigger</button>',
    })
  })
})
