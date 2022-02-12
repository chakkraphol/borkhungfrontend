<template>
  <Login />
</template>

<script>
import Login from "~/components/Login.vue";
export default {
  name: "IndexPage",
  components: {
    Login,
  },
  beforeMount() {
    if (window.sessionStorage.getItem("token")) {
      //  window.location.href = "/round";
      // return;
    }
  },
};
</script>
