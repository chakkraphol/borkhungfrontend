<template>
  <div>
    <Loading v-if="loading" />
    <div class="row"><Menu active="Round" /></div>
    <div style="width: 90%; margin: 0 auto; padding-bottom: 25px">
      <div class="row mt-4 text-center">
        <h3>วันที่ {{ $convertDate(round_date) }}</h3>
      </div>
      <div class="row mt-2 text-center">
        <h3>รอบ {{ round_name }}</h3>
      </div>
      <div class="row mt-5 text-left" v-if="status_bet == 1">
        <div style="text-align: right">
          <span @click="hidemenu('bet')" style="cursor: pointer">
            <span v-if="menu_bet">ซ่อนเมนู</span><span v-else>แสดงเมนู</span>
          </span>
        </div>
        <div class="col-md-6" v-if="menu_bet">
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
                  :class="validate_bet_member_even ? 'is-invalids' : ''"
                ></v-select>
              </div>
              <div class="forms-inputs mb-4">
                <span>ราคา</span>
                <input
                  autocomplete="off"
                  type="number"
                  class="form-control"
                  v-model="bet_even"
                  :class="validate_bet_even ? 'is-invalids' : ''"
                  @change="validate_bet_even = false"
                />
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submitbet(2)"
                  class="btn btn-login w-100"
                >
                  แทงคู่
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-if="menu_bet">
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
                  :class="validate_bet_member_odd ? 'is-invalids' : ''"
                ></v-select>
              </div>
              <div class="forms-inputs mb-4">
                <span>ราคา</span>
                <input
                  autocomplete="off"
                  type="number"
                  class="form-control"
                  v-model="bet_odd"
                  :class="validate_bet_odd ? 'is-invalids' : ''"
                  @change="validate_bet_odd = false"
                />
              </div>
              <div class="mb-3">
                <button
                  v-on:click.stop.prevent="submitbet(1)"
                  class="btn btn-login w-100"
                >
                  แทงคี่
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 text-left">
        <div class="col-md-12">
          <div class="card px-3 py-3 formdup">
            <div class="text-center">
              <a
                :href="`/reportresult?round_date=${round_date}&token=${token}`"
                target="_blank"
                ><h3>ดูผลย้อนหลัง</h3></a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 text-left">
        <div class="col-md-12">
          <div class="card px-3 py-3 formdup">
            <div class="text-center">
              <h1>ส่วนต่าง {{ $formatPrice(caldup()) }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 text-left">
        <div class="col-md-6">
          <div class="card px-3 py-3 form">
            <div class="text-center">
              <h1>คู่ {{ $formatPrice(sum_bet_even) }}</h1>
            </div>
            <table id="bettableeven">
              <tr>
                <th style="width: 50px">ลำดับ</th>
                <th style="width: 150px">ชื่อบิล</th>
                <th style="width: 150px">ยอดเดิมพัน</th>
                <th style="width: 50px" v-if="status_bet == 1">ลบ</th>
              </tr>
            </table>
            <div style="height: 400px; overflow: auto">
              <table id="bettableeven" style="width: 100%">
                <tr v-for="(data, key) in bet_even_data" :key="key">
                  <td style="width: 50px; text-align: center">{{ key + 1 }}</td>
                  <td style="width: 150px">{{ data.member_name }}</td>
                  <td style="width: 150px; text-align: center">
                    {{ $formatPrice(data.price) }}
                  </td>
                  <td
                    style="width: 50px; text-align: center"
                    v-if="status_bet == 1"
                  >
                    <span @click="delbet(data.id)" style="cursor: pointer"
                      >ลบ</span
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card px-3 py-3 form">
            <div class="text-center">
              <h1>คี่ {{ $formatPrice(sum_bet_odd) }}</h1>
            </div>
            <table id="bettableeven">
              <tr>
                <th style="width: 50px">ลำดับ</th>
                <th style="width: 150px">ชื่อบิล</th>
                <th style="width: 150px">ยอดเดิมพัน</th>
                <th style="width: 50px" v-if="status_bet == 1">ลบ</th>
              </tr>
            </table>
            <div style="height: 400px; overflow: auto">
              <table id="bettableeven" style="width: 100%">
                <tr v-for="(data, key) in bet_odd_data" :key="key">
                  <td style="width: 50px; text-align: center">{{ key + 1 }}</td>
                  <td style="width: 150px">{{ data.member_name }}</td>
                  <td style="width: 150px; text-align: center">
                    {{ $formatPrice(data.price) }}
                  </td>
                  <td
                    style="width: 50px; text-align: center"
                    v-if="status_bet == 1"
                  >
                    <span @click="delbet(data.id)" style="cursor: pointer"
                      >ลบ</span
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 text-left">
        <div style="text-align: right">
          <span @click="hidemenu('membertoday')" style="cursor: pointer">
            <span v-if="menu_membertoday">ซ่อนเมนู</span
            ><span v-else>แสดงเมนูสมาชิกที่เดิมพันวันนี้</span>
          </span>
        </div>
        <div class="col-md-12" v-if="menu_membertoday">
          <div class="card px-3 py-3 formdup">
            <div class="text-center">
              <h1>ผู้เล่นทั้งหมดของวันที่ {{ $convertDate(round_date) }}</h1>
            </div>

            <table id="bettableeven">
              <tr>
                <th>ชื่อผู้เล่น</th>
              </tr>
              <div style="height: 400px; overflow: auto">
                <table id="bettableeven" style="width: 100%">
                  <tr v-for="(data, key) in membertoday" :key="key">
                    <td>
                      {{ key + 1 }} .
                      <a
                        :href="`/bet/member?member_id=${data.member_id}&round_date=${round_date}&name=${data.member_name}&token=${token}`"
                        target="_blank"
                        >{{ data.member_name }}</a
                      >
                    </td>
                  </tr>
                </table>
              </div>
            </table>
          </div>
        </div>
      </div>
      <div class="row mt-5 text-left" v-if="status_bet == 1">
        <div class="card px-3 py-3 form">
          <div class="text-center">
            <h2>ผลการเดิมพัน</h2>
          </div>
          <div class="form-data">
            <div class="forms-inputs mb-4">
              <span>ผลการเดิมพัน</span>
              <select
                class="form-control"
                v-model="bet_result"
                :class="validate_bet_result ? 'is-invalids' : ''"
                @change="validate_bet_result = false"
              >
                <option value="">เลือกผลการเดิมพัน</option>
                <option value="2">คู่</option>
                <option value="1">คี่</option>
              </select>
            </div>
            <div class="forms-inputs mb-4">
              <span>น้ำหนัก</span>
              <input
                autocomplete="off"
                type="number"
                class="form-control"
                v-model="bet_weight"
                :class="validate_bet_weight ? 'is-invalids' : ''"
                @change="validate_bet_weight = false"
              />
            </div>
            <div class="mb-3">
              <button
                v-on:click.stop.prevent="closebet"
                class="btn btn-login w-100"
              >
                ปิดการเดิมพัน
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
import Loading from "~/components/Loading.vue";
export default {
  components: {
    Menu,
    Loading,
  },
  data() {
    return {
      memberlist: [],
      membereven: null,
      memberodd: null,
      member_id: null,
      member_name: null,
      round_id: 0,
      round_date: null,
      round_name: null,
      price: 0,
      rate_bet: 0,
      bet: 0,
      validate_bet_member_even: false,
      validate_bet_member_odd: false,
      validate_bet_even: false,
      validate_bet_odd: false,
      bet_even: null,
      bet_odd: null,
      bet_odd: null,
      loading: false,
      bet_odd_data: [],
      bet_even_data: [],
      sum_bet_odd: 0,
      sum_bet_even: 0,
      menu_bet: true,
      menu_membertoday: true,
      membertoday: [],
      token: sessionStorage.getItem("token"),
      status_bet: null,
      bet_result: null,
      validate_bet_result: false,
      bet_weight: null,
      validate_bet_weight: false,
    };
  },
  methods: {
    closebet() {
      if (!this.bet_result) {
        this.validate_bet_result = true;
        return;
      }
      if (!this.bet_weight) {
        this.validate_bet_weight = true;
        return;
      }
      this.$axios
        .$post(
          "/api/updateresult",
          {
            id: this.round_id,
            weight: this.bet_weight,
            bet_result: this.bet_result,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.data == 1) {
            this.getData();
          }
        });
    },
    hidemenu(menu) {
      if (menu == "bet") {
        if (this.menu_bet) {
          this.menu_bet = false;
        } else {
          this.menu_bet = true;
        }
      } else if (menu == "membertoday") {
        if (this.menu_membertoday) {
          this.menu_membertoday = false;
        } else {
          this.menu_membertoday = true;
        }
      }
    },
    submitbet(bet) {
      let data = {
        round_id: this.round_id,
        round_date: this.round_date,
        round_name: this.round_name,
        rate_bet: this.rate_bet,
        bet: bet,
      };
      if (1 == bet) {
        if (!this.memberodd) {
          this.validate_bet_member_odd = true;
          return;
        } else {
          this.validate_bet_member_odd = false;
        }
        if (!this.bet_odd) {
          this.validate_bet_odd = true;
          return;
        }
        data["price"] = this.bet_odd;
        data["member_id"] = this.memberodd.code;
        data["member_name"] = this.memberodd.label;
        this.addBet(data);
        this.loading = true;
      } else {
        if (!this.membereven) {
          this.validate_bet_member_even = true;
          return;
        } else {
          this.validate_bet_member_even = false;
        }
        if (!this.bet_even) {
          this.validate_bet_even = true;
          return;
        }
        data["price"] = this.bet_even;
        data["member_id"] = this.membereven.code;
        data["member_name"] = this.membereven.label;
        this.addBet(data);
        this.loading = true;
      }
    },
    addBet(data) {
      this.$axios
        .$post(
          "/api/addbet",
          {
            data,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          this.memberodd = null;
          this.membereven = null;
          this.bet_even = null;
          this.bet_odd = null;
          this.loading = false;
          if (result.code != `1`) {
            alert("Error !!!!");
          } else {
            this.getBet(data.bet);
            this.getMembertoday();
          }
        });
    },
    getMembertoday() {
      this.$axios
        .$post(
          "/api/getmembertoday",
          {
            date: this.round_date,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.data.length) {
            this.membertoday = result.result.data;
          }
        });
    },
    getBet(bet) {
      this.$axios
        .$post(
          "/api/getbet",
          {
            round_id: this.round_id,
            bet: bet,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          if (result.result.data.length) {
            if (bet == 1) {
              this.bet_odd_data = result.result.data;
              this.sum_bet_odd = result.result.data.reduce(function (
                tot,
                record
              ) {
                return tot + record.price;
              },
              0);
            } else {
              this.bet_even_data = result.result.data;
              this.sum_bet_even = result.result.data.reduce(function (
                tot,
                record
              ) {
                return tot + record.price;
              },
              0);
            }
          }
        });
    },
    caldup() {
      if (this.sum_bet_odd > this.sum_bet_even) {
        return this.sum_bet_odd - this.sum_bet_even;
      } else {
        return this.sum_bet_even - this.sum_bet_odd;
      }
    },
    delbet(id) {
      if (confirm("คุณแน่ใจที่จะทำการลบการเดิมพันนี้") == true) {
        this.$axios
          .$post(
            "/api/delbet",
            {
              id: id,
            },
            this.$setHeaders(sessionStorage.getItem("token"))
          )
          .then((result) => {
            if (result.code == `1`) {
              this.getBet(1);
              this.getBet(2);
              this.getMembertoday();
            }
          });
      }
    },
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
            this.round_id = this.$route.params.id;
            this.round_date = result.result.data[0].date
              ? result.result.data[0].date
              : null;
            this.round_name = result.result.data[0].name
              ? result.result.data[0].name
              : null;
            this.bet = result.result.data[0].rate
              ? result.result.data[0].rate
              : 0;
            this.status_bet = result.result.data[0].status
              ? result.result.data[0].status
              : 0;
            this.rate_bet = result.result.data[0].rate
              ? result.result.data[0].rate
              : 0;
            this.getBet(1);
            this.getBet(2);
            this.getMembertoday();
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
                label: result.result.data[member].name,
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
.formdup {
  font-family: "prompt";
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  font-weight: normal;
  font-size: 15px;
}
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

#bettableeven th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04aa6d;
  border: 1px solid #ddd;
  color: white;
}
#bettableeven td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
