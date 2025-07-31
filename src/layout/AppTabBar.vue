<template>
  <div class="w-ful p-2 z-auto" style="z-index: 10000">
    <van-tabbar
      v-model="active"
      @change="onChange"
      justify="center"
      class="md:hidden p-2 rounded-3xl -mt-4 shadow-lg"
      style="width: 96%; margin-top: -10px !important"
    >
      <van-tabbar-item class="rounded-3xl" icon="home-o" replace to="/home">Home</van-tabbar-item>
      <van-tabbar-item icon="add-square" replace to="/add-new-post">Post</van-tabbar-item>

      <van-tabbar-item icon="manager-o" v-if="$isLoggedIn" replace to="/profile"
        >Account</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" v-else replace to="/login">Account</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'
import { showToast } from 'vant'
export default {
  name: 'AppTabBar',
  setup() {
    const active = ref(0)

    const onChange = (index) => {
      active.value = index

      //showToast(`Tab ${index} clicked`);
    }

    return {
      active,

      onChange,
    }
  },
}
</script>

<style scoped>
img {
  width: 24px;
  height: 24px;
}
</style>
