<template>
  <div>
    <div class="row"><Menu active="Round" /></div>
    <div class="row mt-4 text-center">
      <h3>วันที่ {{ $convertDate(date) }}</h3>
    </div>
    <div class="row mt-2 text-center">
      <h3>รอบ {{ nameround }}</h3>
    </div>
    <div class="row mt-5 text-left">
      <div class="col-md-6">
        <div class="card px-3 py-3 form">
          <div class="text-center">
            <h1>คู่</h1>
          </div>
          <div class="form-data">
            <div class="forms-inputs mb-4">
              <span>ชื่อผู้เล่น</span>
              <v-select
                :options="memberlist"
                style="background: #fff"
                v-model="membereven"
              ></v-select>
            </div>
            <div class="forms-inputs mb-4">
              <span>ราคา</span>
              <input autocomplete="off" type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <button
                v-on:click.stop.prevent="submit"
                class="btn btn-login w-100"
              >
                แทงคู่
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card px-3 py-3 form">
          <div class="text-center">
            <h1>คี่</h1>
          </div>
          <div class="form-data">
            <div class="forms-inputs mb-4">
              <span>ชื่อผู้เล่น</span>
              <v-select
                :options="memberlist"
                style="background: #fff"
                v-model="memberodd"
              ></v-select>
            </div>
            <div class="forms-inputs mb-4">
              <span>ราคา</span>
              <input autocomplete="off" type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <button
                v-on:click.stop.prevent="submit"
                class="btn btn-login w-100"
              >
                แทงคี่
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "~/components/Menu.vue";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      date: null,
      nameround: null,
      memberlist: [],
      membereven: null,
      memberodd: null,
    };
  },
  methods: {
    getData() {
      this.$axios
        .$post(
          "/api/getroundbyid",
          {
            id: this.$route.params.id,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.data.length) {
            this.date = result.result.data[0].date
              ? result.result.data[0].date
              : null;
            this.nameround = result.result.data[0].name
              ? result.result.data[0].name
              : null;
          } else {
            window.location.href = "/rounds";
          }
        });
    },
    getMember() {
      this.$axios
        .$post(
          "/api/getmemberall",
          {},
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          let memberarray = [];
          if (result.result.data.length) {
            for (let member in result.result.data) {
              memberarray.push({
                code: result.result.data[member].id,
                label:
                  result.result.data[member].name +
                  "/" +
                  result.result.data[member].linename,
              });
            }
          }
          this.memberlist = memberarray;
        });
    },
  },

  mounted() {
    this.getData();
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
  width: 90%;
  margin-left: 50px;
}
.btn-login {
  background-color: #4caf50;
  color: #ffffff;
}
</style>
