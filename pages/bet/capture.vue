<template>
  <client-only><BetsCap /></client-only>
</template>

<script>
import BetsCap from "~/components/BetsCap.vue";
export default {
  middleware: "authen",
  name: "IndexPage",
  components: {
    BetsCap,
  },
};
</script>
