<template>
  <div class="department">
    <dao-nav></dao-nav>
      <div class="department-box">
        <daoHeaderInfo @joinDao="joinDao"></daoHeaderInfo>
        <div class="department-content">
          <div class="rainbow-nav-box">
            <div class="nav-item"  :class="{'active': 0 == activeNavIndex}" @click="activeNavIndex=0">
              HOME
            </div>
            <div class="nav-item"  :class="{'active': 3 == activeNavIndex}" @click="activeNavIndex=3">
              DEPARTMENT MEMBER
            </div>
          </div>
          <departmentHome @joinDepartment="joinDepartment" :departmentInfo="departmentInfo" v-show="activeNavIndex==0"></departmentHome>
          <proposalList :address="curDao.manage" :vault="curDao.vault" :proposal-list="proposalArr" v-show="activeNavIndex==1"></proposalList>
          <departmentFinance :token-list="tokenList" v-show="activeNavIndex==2"></departmentFinance>
          <departmentMember :members-list="membersList" v-show="activeNavIndex==3"></departmentMember>
        </div>
      </div>
    <dao-footer></dao-footer>
  </div>
</template>

<script>
import departmentMember from "./department/departmentMember";
import proposalList from "./department/proposalList";
import departmentHome from "./department/departmentHome";
// import applyList from "./department/applyList";
import {mapGetters} from "vuex";
import departmentFinance from "./department/departmentFinance"
import {eventBus} from "../../utils/eventBus";

export default {
  name: "department",
  components: {
    departmentMember,
    departmentHome,
    proposalList,
    departmentFinance
  },
  data() {
    return {
      departmentInfo:{},
      curDao: {},
      membersLength: 0,
      activeNavIndex: 0,
      daoList: [],
      tokenList: [],
      applyArr: [],
      membersList: [],
      proposalArr: [],
      daoIndexList:[],
      departmentId:null
    }
  },
  created() {
    console.log( this.$route.params)
    this.membersList = this.$route.params.departmentInfo.users
    this.departmentInfo = this.$route.params.departmentInfo
    this.departmentId = this.$route.params.departmentId
  },
  computed: {
    ...mapGetters([
      'isConnected',
      'account'
    ]),
    departmentList() {
      return this.$store.state.daoUser.departmentList
    },
    curDaoControlAddress(){
      if(this.$store.state.daoManage.curDaoControlAddress){
        return this.$store.state.daoManage.curDaoControlAddress
      }else{
        return {}
      }
    },
  },
  methods: {
    listGroup() {
      this.$store.dispatch("daoUser/listGroup", this.curDaoControlAddress.daoUsersAddr).then(res => {
        this.$store.commit("daoUser/SET_DEPARTMENTLIST", res)
        res.forEach(item=>{
          console.log(item)
          if(item.id == this.departmentInfo.id){
            this.$set(this.departmentInfo,{...this.departmentInfo,users:item.users})
          }
        })
      })
    },
    joinDepartment(){
      for (const address in  this.membersList) {
        if(address == sessionStorage.getItem("currentAccount")){
          eventBus.$emit('message', {
            type:"error",
            message:"You has joined this Department"
          })
          return
        }
      }
      this.$store.dispatch("daoUser/joinGroup", {
        address:this.curDaoControlAddress.daoUsersAddr,
        id: this.departmentInfo.id
      }).then(()=>{
        this.$eventBus.$on('message', (message) => {
          if (message.type == "success" && message.message == "Join Department Success") {
            this.listGroup()
          }
        })
      })
    },
    getBalance(){
      this.$store.dispatch("app/getBalance", this.curDaoAddress).then(balance => {
        this.balance = balance
      })
    },

    joinDao() {
      this.$store.dispatch("daoUser/join", this.curDaoControlAddress.daoUsersAddr)
    },
  }
}
</script>

<style lang="scss" scoped>
.department {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .department-box{
    flex: 1;
    width: 100%;
    position: relative;
    margin-top: -100px;
    z-index: 1;
  }
  .department-content {
    position: relative;
    z-index: 1;
    border-radius: 20px;
    width: 1200px;
    background: #fff;
    margin: 10px auto;
    padding-bottom: 50px;
    .nav-item{
      padding: 20px 50px;
    }
  }
}
</style>
