<template>
  <van-nav-bar
    :title="title"
    :left-text="titleBack"
    left-arrow
    @click-left="backPage"
    class="shadow-lg fixed lg:hidden p-1 fixed -mt-4 bg-white"
    style="z-index: 999999; width: 100%"
  >
  </van-nav-bar>
</template>

<script>
import { ref, reactive, toRefs } from "vue";

export default {
  setup() {
    const backPage = () => {
      history.back();
    };

    return {
      backPage,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    titleBack: {
      type: String,
      default: "Back",
    },
    leftLink: {
      type: String,
      default: "/",
    },
  },
};
</script>

<style scoped>
.login-container {
  padding: 5px;
  margin-top: 50px; /* Add some space from the top */
}
</style>
