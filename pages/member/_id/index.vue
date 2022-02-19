<template>
  <client-only> <UpdateMember /> </client-only>
</template>

<script>
import UpdateMember from "~/components/UpdateMember.vue";
export default {
  middleware: "authen",
  components: {
    UpdateMember,
  },
};
</script>
