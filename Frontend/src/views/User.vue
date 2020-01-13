<template>
  <div class="home">
    <Header />
    <UserPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserPage from '@/components/user/UserPage.Component.vue'

export default {
  name: 'User',
  components: {
    UserPage
  }
}
</script>
