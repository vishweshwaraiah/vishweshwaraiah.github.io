import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MasterButton from '@components/MasterButton.vue'

describe('MasterButton', () => {
  it('renders properly', () => {
    const wrapper = mount(MasterButton)
    expect(wrapper.text()).toContain('Button')
  })
})
