<template>
  <div>
    <div style="width: 90%; margin: 0 auto; padding-bottom: 25px">
      <div class="row mt-4 text-center">
        <h1>วันที่ {{ $convertDate(round_date) }}</h1>
      </div>
      <div class="row mt-2 text-center">
        <h1>รอบ {{ round_name }}</h1>
      </div>
      <div class="row mt-5 text-left">
        <div class="col-md-6">
          <div class="card px-3 py-3 form">
            <div class="text-center">
              <h1>คู่</h1>
            </div>
            <table id="bettableeven">
              <tr style="background-color: #feff83">
                <th style="width: 50px">ลำดับ</th>
                <th style="width: 150px">ชื่อ</th>
                <th style="width: 150px">ยอด</th>
              </tr>
              <tr v-for="(data, key) in bet_even_data" :key="key">
                <td style="width: 50px; text-align: center">{{ key + 1 }}</td>
                <td style="width: 150px">{{ data.member_name }}</td>
                <td style="width: 150px; text-align: center">
                  {{ $formatPrice(data.price) }}
                </td>
              </tr>
              <client-only v-if="length_even < length_odd">
                <tr v-for="length_even in length_odd - length_even">
                  <td style="width: 50px; text-align: center">&nbsp;</td>
                  <td style="width: 150px">&nbsp;</td>
                  <td style="width: 150px; text-align: center">&nbsp;</td>
                </tr>
              </client-only>
              <tr>
                <td style="width: 50px; text-align: center">รวม</td>
                <td style="width: 150px"></td>
                <td style="width: 150px; text-align: center">
                  {{ $formatPrice(sum_bet_even) }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card px-3 py-3 form">
            <div class="text-center">
              <h1>คี่</h1>
            </div>
            <table id="bettableeven">
              <tr style="background-color: #feff83">
                <th style="width: 50px">ลำดับ</th>
                <th style="width: 150px">ชื่อ</th>
                <th style="width: 150px">ยอด</th>
              </tr>
              <tr v-for="(data, key) in bet_odd_data" :key="key">
                <td style="width: 50px; text-align: center">{{ key + 1 }}</td>
                <td style="width: 150px">{{ data.member_name }}</td>
                <td style="width: 150px; text-align: center">
                  {{ $formatPrice(data.price) }}
                </td>
              </tr>
              <client-only v-if="length_odd < length_even">
                <tr v-for="length_odd in length_even - length_odd">
                  <td style="width: 50px; text-align: center">&nbsp;</td>
                  <td style="width: 150px">&nbsp;</td>
                  <td style="width: 150px; text-align: center">&nbsp;</td>
                </tr>
              </client-only>
              <tr>
                <td style="width: 50px; text-align: center">รวม</td>
                <td style="width: 150px"></td>
                <td style="width: 150px; text-align: center">
                  {{ $formatPrice(sum_bet_odd) }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="row mt-5 text-center">
        <div class="col-md-12">
          <h1 style="color: #008000">
            <span v-if="bet_result == 1">คี่</span>
            <span v-if="bet_result == 2">คู่</span>
            <span v-if="bet_result != 1 && bet_result != 2">รอผล</span>
          </h1>
        </div>
      </div>
      <div class="row mt-5 text-center">
        <div class="col-md-12">
          <h1 style="color: #ff0000">
            ** รบกวนตรวจสอบยอด ชั่งแล้วผลได้ผลเสียยึดตามตารางเท่านั้น **
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bet_odd_data: [],
      bet_even_data: [],
      sum_bet_odd: 0,
      sum_bet_even: 0,
      length_odd: 0,
      length_even: 0,
      round_date: null,
      round_name: null,
      bet_result: null,
    };
  },
  methods: {
    getBet(bet) {
      this.$axios
        .$post(
          "/api/getbet",
          {
            round_id: this.$route.query.id,
            bet: bet,
          },
          this.$setHeaders(this.$route.query.token)
        )
        .then((result) => {
          if (result.result.data.length) {
            if (bet == 1) {
              this.round_date = result.result.data[0].round_date;
              this.round_name = result.result.data[0].round_name;
              this.bet_result = result.result.data[0].bet_result;
              this.length_odd = result.result.data.length;
              this.bet_odd_data = result.result.data;
              this.sum_bet_odd = result.result.data.reduce(function (
                tot,
                record
              ) {
                return tot + record.price;
              },
              0);
            } else {
              this.round_date = result.result.data[0].round_date;
              this.round_name = result.result.data[0].round_name;
              this.bet_result = result.result.data[0].bet_result;
              this.length_even = result.result.data.length;
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
  },

  mounted() {
    this.getBet(1);
    this.getBet(2);
  },
};
</script>
<style lang="scss" scoped>
.btn-login {
  background-color: #4caf50;
  color: #ffffff;
}

#bettableeven th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  border: 1px solid #ddd;
  color: #000;
}
#bettableeven td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
