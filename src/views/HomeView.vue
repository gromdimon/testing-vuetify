<script setup lang="ts">
/**
 * Display of Home default page.
 *
 * Implements the search bar.
 */

import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'

const searchTerm = ref('')
const genomeRelease = ref('grch37')

const performSearch = async () => {
  console.log('Search for ', searchTerm.value, 'in ', genomeRelease.value)
}
</script>

<template>
  <v-container class="home-view">
    <SearchBar
      v-model:search-term="searchTerm"
      v-model:genome-release="genomeRelease"
      @click-search="performSearch"
    />
  </v-container>
</template>
