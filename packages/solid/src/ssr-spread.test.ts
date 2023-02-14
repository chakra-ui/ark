import { ssrSpread } from './ssr-spread'

describe('ssrSpread', () => {
  it('it works', () => {
    const maschineProps = {
      'data-active': '3',
    }
    expect(ssrSpread({ t: '<button>Trigger</button>' }, maschineProps)).toEqual({
      t: '<button data-active="3">Trigger</button>',
    })
  })

  it('can merge style prop', () => {
    const maschineProps = {
      style: 'position:absolute;',
    }
    expect(ssrSpread({ t: '<button style="color:red">Trigger</button>' }, maschineProps)).toEqual({
      t: '<button style="position:absolute;color:red">Trigger</button>',
    })
  })

  it('can merge class prop', () => {
    const maschineProps = {
      class: 'foo',
    }
    expect(ssrSpread({ t: '<button class="bar">Trigger</button>' }, maschineProps)).toEqual({
      t: '<button class="foo bar">Trigger</button>',
    })
  })

  it('drops disabled false', () => {
    const maschineProps = {
      disabled: false,
    }
    expect(ssrSpread({ t: '<button>Trigger</button>' }, maschineProps)).toEqual({
      t: '<button>Trigger</button>',
    })
  })
})
