<template>
  <v-data-table
    :headers="header"
    :items="users"
    class="elevation-1"
    @click:row="clickRow"
  />
</template>

<script>
import users from '~/apollo/queries/fetchUsers'
const usersHeader = [
  {
    text: 'ID',
    value: 'id'
  },
  {
    text: 'Name',
    value: 'name'
  }
]

export default {
  apollo: {
    users: {
      prefetch: true,
      query: users
    }
  },
  data() {
    return {
      header: usersHeader
    }
  },
  methods: {
    clickRow(row) {
      this.$router.push(`/users/${row.id}`)
    }
  },
  head() {
    return {
      title: 'Users'
    }
  }
}
</script>
