<template>
  <client-only> <AddMember /> </client-only>
</template>

<script>
import AddMember from "~/components/AddMember.vue";
export default {
  middleware: "authen",
  components: {
    AddMember,
  },
};
</script>
