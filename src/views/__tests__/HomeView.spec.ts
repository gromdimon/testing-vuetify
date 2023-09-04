import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import { routes } from '../../router'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import HomeView from '../HomeView.vue'
import SearchBar from '../../components/SearchBar.vue'

const vuetify = createVuetify({
  components,
  directives
})

const makeWrapper = (router: Router) => {
  return mount(
    {
      template: '<v-app><HomeView /></v-app>'
    },
    {
      global: {
        plugins: [
          vuetify,
          router,
        ],
        components: {
          HomeView
        }
      }
    }
  )
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
// Mock router push
router.push = vi.fn()

describe('HomeView with mocked router', async () => {
  it('renders the search bar', () => {
    const wrapper = makeWrapper(router)

    const textField = wrapper.find('.v-text-field')
    const select = wrapper.find('.v-select')
    const searchButton = wrapper.find('#search')
    expect(textField.exists()).toBe(true)
    expect(select.exists()).toBe(true)
    expect(searchButton.exists()).toBe(true)
  })

  it('correctly emits search', async () => {
    const wrapper = makeWrapper(router)
    // search bar value is updated to "HGNC:1100"
    const searchBar = wrapper.findComponent(SearchBar)
    await searchBar.setValue('HGNC:1100', 'searchTerm')

    // Select the first option in genomeRelease
    const select = wrapper.find('.v-select')
    await select.trigger('click')
    const firstOption = wrapper.find('.v-list-item')
    await firstOption.trigger('click')

    // press search
    const button = wrapper.findComponent('#search') as any
    await button.trigger('click')

    // Check if the message in console appears
    expect(console.log).toHaveBeenCalledWith('searching for HGNC:1100')
  })
})
