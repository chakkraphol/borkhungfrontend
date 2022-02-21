<template>
  <client-only> <ReportResult /></client-only>
</template>

<script>
import ReportResult from "~/components/ReportResult.vue";
export default {
  middleware: "authen",
  components: {
    ReportResult,
  },
};
</script>
