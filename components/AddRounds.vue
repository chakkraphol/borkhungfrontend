<template>
  <div>
    <Loading v-if="loading" />
    <div class="row"><Menu active="Round" /></div>

    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card px-5 py-5 form" id="form1">
            <div class="form-data">
              <div class="forms-inputs mb-4">
                <span>ชื่อรอบ</span>
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
                <span>วันที่</span>
                <date-picker
                  placeholder="DD/MM/YYYY"
                  format="dd/MM/yyyy"
                  inputClass="form-control"
                  v-model="date_today"
                />
              </div>
              <div class="forms-inputs mb-4">
                <span>ค่าน้ำ</span>
                <input
                  autocomplete="off"
                  type="number"
                  class="form-control"
                  :class="validate_rate ? 'is-invalids' : ''"
                  v-model="rate_bet"
                  @change="validate_rate = false"
                />
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submit"
                  class="btn btn-login w-100"
                >
                  เพิ่มรอบ
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
      date_today: new Date(),
      rate_bet: process.env.RATE_BET || 10,
      name: null,
      validate_name: false,
      validate_rate: false,
      loading: false,
    };
  },
  methods: {
    submit() {
      if (!this.name || !this.name.trim()) {
        this.validate_name = true;
        return;
      }
      if (!this.rate_bet || !this.rate_bet.trim() || this.rate_bet > 100) {
        this.validate_rate = true;
        return;
      }
      this.loading = true;
      this.$axios
        .$post(
          "/api/addround",
          {
            name: this.name,
            date: new Date(this.date_today).toISOString().substring(0, 10),
            rate: this.rate_bet,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.id) {
            window.location.href = "/bet/" + result.result.id;
          } else {
            window.location.href = "/round";
          }
        });
    },
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
