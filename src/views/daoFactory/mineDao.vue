<template>
  <div class="mine-dao-box">
    <dao-nav></dao-nav>
    <div class="mine-dao">
      <div class="dao-list">
        <div class="item" @click="chooseDao(item)" v-for="(item,index) in daoList" :key="index">
          <div class="logo">
            <img :src="item.logo" alt="">
          </div>
          <div class="dao-info">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="addr">
              {{ item.daoManagerAddr }}
            </div>
          </div>
        </div>
      </div>
      <div class="nodata" v-show="daoList.length==0">
        No Data
      </div>
    </div>
    <dao-footer></dao-footer>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "mineDao",
  data() {
    return {
      daoList: []
    }
  },
  watch: {
    isConnected() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  computed:{
    ...mapGetters([
      'isConnected',
      'account'
    ]),
  },
  methods: {
    chooseDao(item) {
      this.$router.push({name:"daoManage",params:{
          ...item,
          isOwner:true
        }})
    },
    getDaoByIndex(index) {
      this.$store.dispatch("daoFactory/getDaoByIndex", index).then(async res => {
        let category =await this.getDaoCategory(res.daoManagerAddr)
        res.category = category
        console.log(res)
        console.log(category)
        this.daoList.push(res)
      })
    },
    async getDaoCategory(addr){
      return await this.$store.dispatch("daoManage/getDaoCategory", addr)
    },
    getDaosByOwner() {
      this.$store.dispatch("daoFactory/getDaosByOwner").then(res => {
        console.log(res)
        this.daoIndexList = res
        res.forEach(async idx => {
          console.log(idx)
          this.getDaoByIndex(idx)
        })

      })
    },
    getData() {
      console.log(this.isConnected)
      if (this.isConnected) {
        this.getDaosByOwner()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mine-dao{
  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  width: 1200px;
  z-index: 1;
  position: relative;
  margin: -100px auto 80px;
  background: #fff;
  padding-bottom: 20px;
}
.dao-list {
  display: flex;
  flex-wrap: wrap;

  .item {
    margin: 20px;
    display: flex;
    width: 252px;
    height: 80px;
    background: #f5f5f5;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    cursor: pointer;

    .dao-info {
      padding-left: 10px;

      .name {
        font-weight: bold;
      }

      .addr {
        color: #666;
        word-break: break-all;
      }
    }

    .logo {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
