<template>
  <div>
    <Loading v-if="loading" />
    <div class="row"><Menu active="Member" /></div>

    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card px-5 py-5 form" id="form1">
            <div class="form-data">
              <div class="forms-inputs mb-4">
                <span>ชื่อลูกค้า</span>
                <input
                  autocomplete="off"
                  type="text"
                  class="form-control"
                  v-model="name"
                  :class="validate_name ? 'is-invalids' : ''"
                  @change="validate_name = false"
                />
              </div>
              <div class="forms-inputs mb-4">
                <span>ชื่อ Line</span>
                <input
                  autocomplete="off"
                  type="text"
                  class="form-control"
                  v-model="line"
                />
              </div>
              <div class="forms-inputs mb-4">
                <span>เบอร์โทร</span>
                <input
                  autocomplete="off"
                  type="number"
                  class="form-control"
                  v-model="mobile"
                />
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submit"
                  class="btn btn-login w-100"
                >
                  แก้ไขข้อมูลสมาชิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "~/components/Menu.vue";
import Loading from "~/components/Loading.vue";
export default {
  components: {
    Menu,
    Loading,
  },
  data() {
    return {
      name: null,
      line: "",
      mobile: null,
      validate_name: false,
      loading: false,
    };
  },
  methods: {
    submit() {
      if (!this.name) {
        this.validate_name = true;
        return;
      }
      this.loading = true;
      this.$axios
        .$post(
          "/api/updatemember",
          {
            name: this.name,
            linename: this.line,
            mobile: this.mobile,
            id: this.$route.params.id,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.name) {
            window.location.href = "/members";
          } else {
            alert("!!! Error ");
          }
        });
    },
    getMember() {
      this.$axios
        .$post(
          "/api/getmemberbyid",
          {
            id: this.$route.params.id,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.data.length) {
            this.name = result.result.data[0].name;
            this.line = result.result.data[0].linename;
            this.mobile = result.result.data[0].mobile;
          } else {
            window.location.href = "/members";
          }
        });
    },
  },
  mounted() {
    this.getMember();
  },
};
</script>
<style lang="scss" scoped>
.form {
  font-family: "prompt";
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  font-weight: normal;
  font-size: 15px;
}
.btn-login {
  background-color: #4caf50;
  color: #ffffff;
}
</style>
