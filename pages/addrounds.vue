<template>
  <client-only> <AddRound /> </client-only>
</template>

<script>
import AddRound from "~/components/AddRounds.vue";
export default {
  middleware: "authen",
  components: {
    AddRound,
  },
};
</script>
