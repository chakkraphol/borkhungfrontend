<template>
  <client-only> <ReportRound /></client-only>
</template>

<script>
import ReportRound from "~/components/ReportRound.vue";
export default {
  middleware: "authen",
  components: {
    ReportRound,
  },
};
</script>
