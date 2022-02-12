<template>
  <client-only> <Round /> </client-only>
</template>

<script>
import Round from "~/components/Rounds.vue";
export default {
  middleware: "authen",
  components: {
    Round,
  },
};
</script>
