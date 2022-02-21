<template>
  <client-only> <BetResult /></client-only>
</template>

<script>
import BetResult from "~/components/BetResult.vue";
export default {
  middleware: "authen",
  components: {
    BetResult,
  },
};
</script>
