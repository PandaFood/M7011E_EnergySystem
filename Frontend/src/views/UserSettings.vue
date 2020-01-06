<template>
  <div class="home">
    <Header />
    <UserSettings/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserSettings from '@/components/user/UserSettings.Component.vue'

export default {
  name: 'usersettings',
  components: {
    UserSettings
  }
}
</script>
