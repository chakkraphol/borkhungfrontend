<template>
  <div>
    <div class="row mt-5 text-center">
      <h3>วันที่ {{ $convertDate($route.query.round_date) }}</h3>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <table id="table">
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อสมาชิก</th>
            <th>เดิมพัน</th>
            <th>ผลการเดิมพัน</th>
            <th>ค่าน้ำ</th>
            <th>ราคา</th>
            <th>ลบ</th>
            <th>บวก</th>
          </tr>
          <client-only v-for="(data, key) in member_round" :key="key">
            <tr style="background-color: #a9a9a9">
              <td colspan="8" v-if="chdkround(data.round_id)">
                รอบ {{ data.round_name }}
              </td>
            </tr>
            <tr>
              <td>{{ key + 1 }}</td>
              <td style="text-align: left">{{ data.member_name }}</td>

              <td>
                <span v-if="data.bet == 1">คี่</span
                ><span v-if="data.bet == 2">คู่</span>
              </td>
              <td>
                <span v-if="data.bet_result == 1">คี่</span
                ><span v-if="data.bet_result == 2">คู่</span
                ><span v-else>รอผล</span>
              </td>
              <td>{{ data.rate_bet }}%</td>
              <td>{{ sumbetcal(data.price) }}</td>
              <td>
                <span
                  v-if="
                    data.bet != data.bet_result &&
                    (data.bet_result == 1 || data.bet_result == 2)
                  "
                  style="color: #ff0000"
                >
                  -{{ sumrubbetcal(data.price) }}</span
                >
              </td>
              <td>
                <span
                  v-if="
                    data.bet == data.bet_result &&
                    (data.bet_result == 1 || data.bet_result == 2)
                  "
                  style="color: #008000"
                >
                  +{{ sumplusbetcal(data.price, data.rate_bet) }}</span
                >
              </td>
            </tr>
            <tr v-if="chksum(key, data.round_id)">
              <td>รวม</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ showsumbet() }}</td>
              <td style="color: #ff0000">{{ showsumrubbet() }}</td>
              <td style="color: #008000">{{ showsumplusbet() }}</td>
            </tr>
          </client-only>
        </table>
      </div>
      <div class="col-md-12 d-flex justify-content-center mt-5">
        <table id="table">
          <tr>
            <th></th>
            <th>ราคา</th>
            <th>ลบ</th>
            <th>บวก</th>
          </tr>
          <tr>
            <td>รวม</td>

            <td>{{ showsumbetday() }}</td>
            <td style="color: #ff0000">{{ showsumrubbetday() }}</td>
            <td style="color: #008000">{{ showsumplusbetday() }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="mt-4 text-center">
      <span onclick="window.print()" style="cursor: pointer">
        <img src="~/assets/images/print.svg" width="50" />
      </span>
    </div>
  </div>
</template>
<script>
import Menu from "~/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      memberbet: [],
      member_round: [],
      sumplus: 0,
      round_id: null,
    };
  },
  methods: {
    showsumbetday() {
      return this.$formatPrice(sessionStorage.getItem("sumbetall"));
    },
    showsumrubbetday() {
      return this.$formatPrice(sessionStorage.getItem("sumrubbetall"));
    },
    showsumplusbetday() {
      return this.$formatPrice(sessionStorage.getItem("sumplusbetall"));
    },
    sumplusbetcal(price, rate_bet) {
      let data = price - (price * rate_bet) / 100;
      let sumbet = data + parseInt(sessionStorage.getItem("sumplusbetround"));
      let sumbetall = data + parseInt(sessionStorage.getItem("sumplusbetall"));
      sessionStorage.setItem("sumplusbetround", sumbet);
      sessionStorage.setItem("sumplusbetall", sumbetall);
      return this.$formatPrice(data);
    },
    sumrubbetcal(price) {
      let sumbet = price + parseInt(sessionStorage.getItem("sumrubbetround"));
      let sumbetall = price + parseInt(sessionStorage.getItem("sumrubbetall"));
      sessionStorage.setItem("sumrubbetall", sumbetall);
      sessionStorage.setItem("sumrubbetround", sumbet);
      return this.$formatPrice(price);
    },
    showsumplusbet() {
      let sumbetrond = sessionStorage.getItem("sumplusbetround");
      sessionStorage.setItem("sumplusbetround", 0);
      return this.$formatPrice(sumbetrond);
    },
    showsumrubbet() {
      let sumbetrond = sessionStorage.getItem("sumrubbetround");
      sessionStorage.setItem("sumrubbetround", 0);
      return this.$formatPrice(sumbetrond);
    },
    showsumbet() {
      let sumbetrond = sessionStorage.getItem("sumbetround");
      sessionStorage.setItem("sumbetround", 0);
      return this.$formatPrice(sumbetrond);
    },
    sumbetcal(price) {
      let sumbet = price + parseInt(sessionStorage.getItem("sumbetround"));
      let sumbetall = price + parseInt(sessionStorage.getItem("sumbetall"));
      sessionStorage.setItem("sumbetall", sumbetall);
      sessionStorage.setItem("sumbetround", sumbet);
      return this.$formatPrice(price);
    },
    chksum(key, round_id) {
      if (typeof this.member_round[key + 1] === "undefined") {
        return true;
      }

      if (
        this.member_round[key + 1] &&
        this.member_round[key + 1].round_id != round_id
      ) {
        return true;
      } else {
        return false;
      }
    },
    chdkround(round_id) {
      if (sessionStorage.getItem("round") != round_id) {
        this.updateround(round_id);
        //this.round_id = round_id;
        return true;
      }
      return false;
    },
    updateround(round_id) {
      sessionStorage.setItem("round", round_id);
    },
    getData() {
      this.$axios
        .$post(
          "/api/getbetmember",
          {
            round_date: this.$route.query.round_date
              ? this.$route.query.round_date
              : null,
            round_id: this.$route.query.round_id
              ? this.$route.query.round_id
              : "",
          },
          this.$setHeaders(this.$route.query.token)
        )
        .then((result) => {
          if (result.result.data.length) {
            let round_id = -1;
            let chk_round_id = 0;
            this.member_round = result.result.data;
            /*
            Object.entries(result.result.data).forEach(([key, value]) => {
              if (chk_round_id != value.round_id) {
                round_id++;
                chk_round_id = value.round_id;
                this.member_round.push(value);
              }
            });
            */
            console.log(this.member_round);
            //this.memberbet = r;
          }
        });
    },
  },

  mounted() {
    this.getData();
    sessionStorage.removeItem("round");
    sessionStorage.setItem("sumbetall", 0);
    sessionStorage.setItem("sumbetround", 0);
    sessionStorage.setItem("sumrubbetround", 0);
    sessionStorage.setItem("sumrubbetall", 0);
    sessionStorage.setItem("sumplusbetround", 0);
    sessionStorage.setItem("sumplusbetall", 0);
  },
};
</script>
