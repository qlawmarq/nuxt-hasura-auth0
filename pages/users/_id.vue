<template>
  <v-container>
    <v-card class="mx-auto pa-6">
      <v-container fluid>
        <!--ユーザーID-->
        <v-text-field
          v-model="users[0].id"
          label="ユーザーID"
          :disabled="true"
          :readonly="true"
          required
        >
        </v-text-field>
        <!--名前-->
        <v-text-field v-model="users[0].name" label="名前" required>
        </v-text-field>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import user from '~/apollo/queries/fetchUserWhereId'

export default {
  apollo: {
    users: {
      query: user,
      prefetch: ({ route }) => ({ id: route.params.id }),
      variables() {
        return { user_id: this.$route.params.id }
      }
    }
  },
  head() {
    return {
      title: 'Profile'
    }
  }
}
</script>
