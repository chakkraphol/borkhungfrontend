<template>
  <client-only> <BetRound /></client-only>
</template>

<script>
import BetRound from "~/components/BetRound.vue";
export default {
  middleware: "authen",
  components: {
    BetRound,
  },
};
</script>
