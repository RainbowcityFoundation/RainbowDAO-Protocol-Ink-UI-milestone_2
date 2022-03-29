<template>
  <div class="dao-home">
    <div class="balance" v-show="daoGCBalance">
      <div class="sub-title">
        <img src="@/assets/daoImgs/title_icon1.png" alt="">
        BALANCE
      </div>
      <div class="number">
        <strong>{{ daoGCBalance ? parseInt(daoGCBalance.replace(/,/g, '')) / 10 ** parseInt(coinInfo.decimals) : 0 }}</strong>
        {{coinInfo.name}}
      </div>
      <div class="address">
        {{ curDaoAddress }}
      </div>
      <div class="category" style="">
        <strong>Category</strong>: {{category}}
      </div>
    </div>
    <div class="part-title-box">
      <div class="left">
        <img src="../../../assets/daoImgs/title_icon1.png" alt="">
        <div class="part-title-name">
          ALL DAO
        </div>
        <div class="part-title-tip">

        </div>
      </div>
      <div class="right">
        <div class="search-box">
          <input type="text" v-model="searchData.all" placeholder="Search">
          <img v-show="searchData.all&&searchData.all.length>0" @click="searchData.all='',getSearchResult('all')" class="clear-btn" src="../../../assets/daoImgs/close.png" alt="">

          <div class="rainbow-button search-btn" style="width: 46px;height: 36px" @click="getSearchResult('all')">
            🔍
          </div>
        </div>
        <div class="rainbow-button" @click="createDao(0)">
          CREATE
        </div>
      </div>
    </div>
    <div class="dao-list">
      <div class="item" :class="{'active': item.daoManagerAddr == curDaoAddress}" v-if="item.name"
           @click="chooseDao(item)" v-show="!allSearchName ||  item.name.indexOf(allSearchName) > -1"
           v-for="(item,index) in daoList" :key="index">
        <div class="logo">
          <img :src="item.logo" alt="">
        </div>
        <div class="dao-info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="address">
            {{ item.daoManagerAddr }}
          </div>
        </div>
      </div>
    </div>

    <div class="part-title-box">
      <div class="left">
        <img src="../../../assets/daoImgs/title_icon1.png" alt="">
        <div class="part-title-name">
          MOTHER DAO
        </div>
        <div class="part-title-tip">

        </div>
      </div>
      <div class="right">
        <div class="search-box">
          <input type="text" v-model="searchData.mother" placeholder="Search">
          <img v-show="searchData.mother&&searchData.mother.length>0" @click="searchData.mother='',getSearchResult('mother')" class="clear-btn" src="../../../assets/daoImgs/close.png" alt="">

          <div class="rainbow-button search-btn" style="width: 46px;height: 36px" @click="getSearchResult('mother')">
            🔍
          </div>
        </div>
        <div class="rainbow-button" @click="createDao(0)">
          CREATE
        </div>
      </div>
    </div>
    <div class="dao-list">
      <div class="item" :class="{'active': item.daoManagerAddr == curDaoAddress}"
           v-if="item.category=='mother' && item.name"
           @click="chooseDao(item)" v-show="!motherSearchName || item.name.indexOf(motherSearchName)>-1"
           v-for="(item,index) in daoList" :key="index">
        <div class="logo">
          <img :src="item.logo" alt="">
        </div>
        <div class="dao-info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="address">
            {{ item.daoManagerAddr }}
          </div>
        </div>
      </div>
    </div>

    <div class="part-title-box">
      <div class="left">
        <img src="../../../assets/daoImgs/title_icon1.png" alt="">
        <div class="part-title-name">
          ALLIANCE DAO
        </div>
        <div class="part-title-tip">

        </div>
      </div>
      <div class="right">
        <div class="search-box">
          <input type="text" v-model="searchData.alliance" placeholder="Search">
          <img v-show="searchData.alliance&&searchData.alliance.length>0" @click="searchData.alliance='',getSearchResult('alliance')" class="clear-btn" src="../../../assets/daoImgs/close.png" alt="">
          <div class="rainbow-button search-btn" style="width: 46px;height: 36px" @click="getSearchResult('alliance')">
            🔍
          </div>
        </div>
        <div class="rainbow-button" @click="createDao(1)">
          CREATE
        </div>
      </div>
    </div>
    <div class="dao-list">
      <div class="item" :class="{'active': item.daoManagerAddr == curDaoAddress}"
           v-if="item.category=='union' && item.name" @click="chooseDao(item,index)" v-for="(item,index) in daoList"
           v-show="!allianceSearchName ||  item.name.indexOf(allianceSearchName) >-1"
           :key="index">
        <div class="logo">
          <img :src="item.logo" alt="">
        </div>
        <div class="dao-info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="address">
            {{ item.daoManagerAddr }}
          </div>
        </div>
      </div>
    </div>
    <div class="part-title-box">
      <div class="left">
        <img src="../../../assets/daoImgs/title_icon1.png" alt="">
        <div class="part-title-name">
          CHILD DAO
        </div>
        <div class="part-title-tip">

        </div>
      </div>
      <div class="right" v-show="curDaoAddress">
        <div class="rainbow-btn" @click="createDao(2)" v-if="category == 'mother'">
          CREATE
        </div>
      </div>
    </div>
    <div class="dao-list">
      <div class="item" :class="{'active': item.daoManagerAddr == curDaoAddress}" @click="chooseChildDao(item,index)"
           v-for="(item,index) in childDaoList" :key="index">
        <div class="logo">
          <img :src="item.logo" alt="">
        </div>
        <div class="dao-info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="address">
            {{ item.daoManagerAddr }}
          </div>
        </div>
      </div>
    </div>
    <div class="part-title-box">
      <div class="left">
        <img src="../../../assets/daoImgs/title_icon1.png" alt="">
        <div class="part-title-name">
          DEPARTMENT
        </div>
        <div class="part-title-tip">

        </div>
      </div>
      <div class="right">
        <div class="rainbow-btn" @click="isShowAddDepartment=true">
          CREATE
        </div>
      </div>
    </div>
    <div class="dao-list">
      <div class="item" @click="chooseDepartment(item,index)" v-for="(item,index) in departmentList" :key="index">
        <div class="logo">
          <img :src="item.logo" alt="">
        </div>
        <div class="dao-info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="address">
            {{ item.departmentList }}
          </div>
        </div>
      </div>
    </div>
    <div class="part-title-box">
      <div class="left">
        <img src="../../../assets/daoImgs/title_icon1.png" alt="">
        <div class="part-title-name">
          CONTRACTS
        </div>
        <div class="part-title-tip">

        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <div class="dao-address">
      <div class="dao-address-item">
        <div class="dao-address-name">
          BASE:
        </div>
        <div class="dao-address-value">
          {{ curDaoControlAddress.baseAddr }}
        </div>
      </div>
      <div class="dao-address-item">
        <div class="dao-address-name">
          ERC20:
        </div>
        <div class="dao-address-value">
          {{ curDaoControlAddress.erc20Addr }}
        </div>
      </div>
      <div class="dao-address-item">
        <div class="dao-address-name">
          VAULT:
        </div>
        <div class="dao-address-value">
          {{ curDaoControlAddress.vaultAddr }}
        </div>
      </div>
      <div class="dao-address-item">
        <div class="dao-address-name">
          PROPOSAL:
        </div>
        <div class="dao-address-value">
          {{ curDaoControlAddress.proposalAddr }}
        </div>
      </div>
      <div class="dao-address-item">
        <div class="dao-address-name">
          SETTING:
        </div>
        <div class="dao-address-value">
          {{ curDaoControlAddress.daoSettingAddr }}
        </div>
      </div>
      <div class="dao-address-item">
        <div class="dao-address-name">
          USER:
        </div>
        <div class="dao-address-value">
          {{ curDaoControlAddress.daoUsersAddr }}
        </div>
      </div>
    </div>

    <div class="rainbow-dialog-box" v-show="isShowAddDepartment">
      <div class="mask" @click="isShowAddDepartment=false"></div>
      <div class="rainbow-dialog">
        <div class="dialog-title">
          ADD DEPARTMENT
        </div>
        <div class="dialog-content">
          <div class="department-form">
            <div class="input-box">
              <div class="input-box-title">
                DEPARTMENT Name
              </div>
              <input type="text" v-model="department.name" placeholder="Name">
            </div>
            <div class="input-box">
              <div class="input-box-title">
                DEPARTMENT Join Directly
              </div>
              <div class="select-box">
                <select v-model="department.joinDirectly">
                  <option selected value="true"> Directly to join</option>
                  <option value="false"> Don't join directly</option>
                </select>
              </div>
            </div>
            <div class="input-box">
              <div class="input-box-title">
                DEPARTMENT Is Open
              </div>
              <div class="select-box">
                <select v-model="department.isOpen">
                  <option selected value="true"> open</option>
                  <option value="false"> not open</option>
                </select>
              </div>
            </div>
            <div class="input-box">
              <div class="input-box-title">
                DEPARTMENT Manager
              </div>
              <input type="text" v-model="department.manager" placeholder="manager Address">
            </div>
          </div>
          <div class="rainbow-btn" @click="addGroup">
            Submit
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {eventBus} from "../../../utils/eventBus";

export default {
  name: "daoHome",
  props: ["daoList", "balance"],
  data() {
    return {
      balance: 0,
      searchData: {
        mother: "",
        all: "",
        alliance: ""
      },
      allSearchName: "",
      motherSearchName: "",
      allianceSearchName: "",
      department: {
        isOpen: "true"
      },
      isShowAddDepartment: false,

    }
  },

  computed: {
    ...mapGetters([
      'isConnected',
      'account'
    ]),
    curdao(){
      return this.$store.state.daoManage.curdao
    },
    daoGCBalance(){
      return this.$store.state.erc20.daoGCBalance
    },
    curDaoControlAddress(){
      if(this.$store.state.daoManage.curDaoControlAddress){
        return this.$store.state.daoManage.curDaoControlAddress
      }else{
        return {}
      }
    },
    departmentList() {
      return this.$store.state.daoUser.departmentList
    },
    curDaoAddress() {
      return this.$store.state.daoManage.curDaoAddress
    },
    coinInfo() {
      if (this.$store.state.erc20.coinInfo) {
        return this.$store.state.erc20.coinInfo
      } else {
        return {}
      }
    },
    category(){
      return this.$store.state.daoManage.category
    },
    childDaoList() {
      return this.$store.state.daoManage.childDaoList
    }
  },
  watch: {

    isConnected() {
      this.getData()
    },
    curDaoControlAddress() {
      this.getData()
    },

  },
  created() {
    if (this.$route.params) {
      this.curDao = this.$route.params
    }
    this.getData()
    this.$eventBus.$on('message', (message) => {
      if (message.type == 'success') {
        if (message.message == "Create Department Success") {
          this.listGroup()
        }
      }
    })

  },
  methods: {
    getSearchResult(type) {
      switch (type) {
        case "mother":
          this.motherSearchName = this.searchData.mother
          break
        case "all":
          this.allSearchName = this.searchData.all
          break
        case "alliance":
          this.allianceSearchName = this.searchData.alliance
          break
      }
    },
    getSelected() {
      if (this.selectIndex == 1) {
        this.category = "union"
      } else {
        this.category = "mother"
      }
    },
    chooseChildDao(item) {
      this.$emit("chooseChildDao", item)
    },
    createDao(index) {
      this.$router.push({name: "createDao", params: {index}})
    },
    getData() {
      if (this.curDaoControlAddress.daoUsersAddr) {
        this.listGroup()
      }
    },
    chooseDao(item) {
      this.$emit("chooseDao", item)
    },
    listGroup() {
      this.$store.dispatch("daoUser/listGroup", this.curDaoControlAddress.daoUsersAddr).then(res => {
        this.$store.commit("daoUser/SET_DEPARTMENTLIST", res)
      })
    },
    chooseDepartment(item, index) {
      this.$router.push({
        name: "department", params: {
          departmentInfo: item,
          departmentId: index
        }
      })
    },
    addGroup() {
      const {name, manager} = this.department
      if (!name) {
        eventBus.$emit('message', {
          type: "error",
          message: "Please input the name"
        })
        return
      }
      if (!manager) {
        eventBus.$emit('message', {
          type: "error",
          message: "Please input the manager Address"
        })
        return
      }
      this.$store.dispatch("daoUser/addGroup", {
        daoUserAddress: this.curDaoControlAddress.daoUsersAddr,
        department: this.department
      }).then(() => {
        this.isShowAddDepartment = false

      }).catch(err => {
        eventBus.$emit('message', {
          type: "error",
          message: err
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dao-home {
  padding: 30px;

  .search-box {
    display: flex;
    .clear-btn{
      width: 20px;
      height: 20px;
      position: relative;
      left: -60px;
      top: 10px;
      z-index: 1;
      cursor: pointer;
    }
    input {
      width: 252px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 10px;
      padding: 0 10px;
      border: none;
      &:focus-visible{
        outline: none!important;
      }
    }

    .search-btn {
      position: relative;
      left: -48px;
      top: 2px;

    }
  }

  .rainbow-dialog {
    .dialog-title {
      font-weight: bold;
      line-height: 50px;
      font-size: 22px;
    }

    .dialog-content {
      min-width: 500px;

      .department-form {
        .input-box {
          margin-top: 20px;

          .input-box-title {
            font-size: 16px;
            font-weight: bold;
            line-height: 30px;
          }

        }
      }

      input {
        width: 360px;
        padding: 0 10px;
        height: 46px;
        background: #f5f5f5;
        border: 1px solid #eaeaea;
        border-radius: 10px;
      }
    }
  }

  .part-title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      padding: 30px 0;

      .part-title-name {
        margin: 0 10px;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
    }

    .right {
      display: flex;

      .rainbow-button {
        margin-right: 10px;
        width: 120px;
        height: 36px;
        line-height: 36px;
      }
    }
  }

  .balance {
    padding: 0px 20px 20px 0;

    .sub-title {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      line-height: 60px;

      img {
        margin-right: 6px;
      }
    }
    .category{
      font-size: 20px;
      padding-top: 20px;
    }
    .number {
      height: 35px;
      font-size: 26px;
      font-weight: 700;
      text-align: left;
      color: #ec1676;
      line-height: 35px;

      strong {
        font-size: 32px;
      }
    }

    .address {
      width: 460px;
      margin-top: 20px;
      padding: 10px;
      color: #F96AAF;
      background: #f5f5f5;
      border: 1px solid rgba(255, 31, 132, 0.15);
      border-radius: 5px;
    }
  }

  .dao-address {
    .dao-address-item {
      margin: 10px 0;
      display: flex;
      align-items: center;

      .dao-address-name {
        font-weight: bold;
        width: 66px;
      }

      .dao-address-value {
        min-width: 460px;
        height: 34px;
        background: #f5f5f5;
        border-radius: 10px;
        line-height: 34px;
        margin-left: 20px;
        padding: 0 10px;
        color: #F96AAF;
      }
    }
  }
}

</style>
