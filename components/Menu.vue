<!-- Please remove this file from your project -->
<template>
  <div>
    <ul>
      <li class="menu">
        <a :class="active == 'Round' ? 'active' : null" href="/rounds"
          >รอบการเล่น</a
        >
      </li>
      <li class="menu">
        <a :class="active == 'Member' ? 'active' : null" href="/members"
          >สมาชิก</a
        >
      </li>
      <li class="menu"><a href="3.html">รายการการเดิมพันตามรอบ</a></li>
      <li class="menu"><a href="4.html">รายการการเดิมพันตามรายบุคคล</a></li>
      <li class="menu" style="float: right">
        <a href="#" @click="logout">ออกจากระบบ</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    active: {
      type: String,
      default: "Round",
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await sessionStorage.removeItem("token");
      window.location.href = "/";
    },
  },
};
</script>
