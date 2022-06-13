import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Game from '../Game.vue'

describe('Game', () => {
  it('renders properly', () => {
    const wrapper = mount(Game, { props: { boardWidth: 10, boardHeight: 20 } })
    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper.get('#gameBoard').attributes().width).toBe('200')
    expect(wrapper.get('#gameBoard').attributes().height).toBe('400')
  })
})
