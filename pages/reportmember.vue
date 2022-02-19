<template>
  <client-only> <ReportMember /></client-only>
</template>

<script>
import ReportMember from "~/components/ReportMember.vue";
export default {
  middleware: "authen",
  components: {
    ReportMember,
  },
};
</script>
