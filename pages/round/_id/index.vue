<template>
  <client-only> <UpdateRound /> </client-only>
</template>

<script>
import UpdateRound from "~/components/UpdateRound.vue";
export default {
  middleware: "authen",
  components: {
    UpdateRound,
  },
};
</script>
