<template>
  <div>
    <div class="row"><Menu active="Round" /></div>
    <div class="row mt-4">
      <div class="container col-md-11">
        <a href="/addrounds">
          <button type="button" class="btn btn-success">+ เพิ่มรอบ</button></a
        >
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <table id="table">
          <tr>
            <th>ชื่อรอบ</th>
            <th>วันที่</th>
            <th>น้ำหนักที่ออก</th>
            <th>อัตราค่าน้ำ</th>
            <th>สถานะ</th>
            <th>รายละเอียด</th>

            <th>แก้ไขข้อมูล</th>
          </tr>

          <tr v-for="(data, key) in round" :key="key">
            <td>{{ data.name }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.weight }}</td>
            <td>{{ data.rate }}%</td>
            <td>{{ data.status == "1" ? "กำลังเดิมพัน" : "จบการเดิมพัน" }}</td>
            <td><a :href="`bet/${data.id}`">เดิมพัน</a></td>
            <td><a :href="`round/${data.id}`">แก้ไข</a></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="row mt-4">
      <div class="container col-md-11">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-1">page:</div>
            <div class="col-md-1">
              <select class="form-select input-small" @change="changepage">
                <option
                  v-for="startpage in page"
                  :value="startpage"
                  :selected="$route.query.page == startpage"
                >
                  {{ startpage++ }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
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
      start: 0,
      limit: process.env.LIMIT_PAGE || 20,
      round: [],
      page: 1,
      startpage: 0,
    };
  },
  methods: {
    getData() {
      this.start =
        this.$route.query.page > 1
          ? (parseInt(this.$route.query.page) - 1) * this.limit
          : 0;
      this.$axios
        .$post(
          "/api/getround",
          {
            start: this.start,
            limit: this.limit,
          },
          this.$setHeaders(sessionStorage.getItem("token"))
        )
        .then((result) => {
          this.page =
            this.limit >= parseInt(result.result.count)
              ? 1
              : Math.ceil(parseInt(result.result.count) / this.limit);
          this.round = result.result.data;
        });
    },

    changepage(e) {
      window.location.href = "/rounds?page=" + e.target.value;
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
