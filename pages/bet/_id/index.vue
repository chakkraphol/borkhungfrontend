<template>
  <client-only><Bet /></client-only>
</template>

<script>
import Bet from "~/components/Bets.vue";
export default {
  middleware: "authen",
  name: "IndexPage",
  components: {
    Bet,
  },
};
</script>
