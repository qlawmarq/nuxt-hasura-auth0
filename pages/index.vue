<template>
  <div>
    <h3>Authors</h3>
    <ul>
      <li v-for="item in author" :key="item.id">
        <nuxt-link :to="`/article/${item.id}`">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import author from '~/apollo/queries/fetchUsers'

export default {
  apollo: {
    author: {
      prefetch: true,
      query: author
    }
  },
  head() {
    return {
      title: 'Authors of Blog'
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
a {
  text-decoration: none;
  color: #3498db;
}
a:hover {
  border-bottom: 1px solid;
}
</style>
