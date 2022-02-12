<template>
  <client-only> <Member /></client-only>
</template>

<script>
import Member from "~/components/Members.vue";
export default {
  middleware: "authen",
  components: {
    Member,
  },
};
</script>
