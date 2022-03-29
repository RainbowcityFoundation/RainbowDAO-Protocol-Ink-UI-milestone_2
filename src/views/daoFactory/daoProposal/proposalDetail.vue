<template>
  <div class="proposalDetail">
    <dao-nav></dao-nav>
    <div class="detail-content">
      <div class="rainbow-panel part1">
        <div class="left">
          <div class="content">
            {{ proposal.title }}
          </div>
          <div class="status-box">
            <div class="status">
              {{ proposal.state }}
            </div>
            <div class="date">
              active block:{{
                parseInt(proposal.endBlock.toString().replace(',', '')) - parseInt(proposal.publicityDelay.toString().replace(',', ''))
              }} ~{{ proposal.endBlock }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            My
            votes({{ account ? account.substr(0, 6) + '...' + account.substr(account.length - 3, 3) : "please connect" }})
          </div>
          <div class="number">
            {{ myVotes }}
          </div>
          <div class="btn-box">
            <div class="support" @click="isShowDelegate=true">
              delegate
            </div>
            <div class="support" @click="castVote(1)">
              Support
            </div>
            <div class="Refuse" @click="castVote(0)">
              Refuse
            </div>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="rainbow-panel left-part">
          <div class="left">
            <div class="title-box">
              <div class="title">
                Support
              </div>
              <div class="address">
                {{ proposal.supportArr.length }} Address
              </div>
            </div>
            <div class="vote-number">
              <div class="number">
                {{ proposal.forVotes.replace(/,/g, '') / 10**this.coinInfo.decimals }}
              </div>
              <div class="number-line">
                <div class="active-number" :style="'width:' + (proposal.supportArr.length / proposal.receiptsArr.length) * 340 + 'px'">

                </div>
              </div>
            </div>
            <div class="members">
              <div class="member-item" v-for="(item,index) in proposal.supportArr" :key="index">
                <div class="icon">
                  <img src="" alt="">
                </div>
                <div class="name">
                  {{ item.address }}
                </div>
                <div class="number">
                  {{ item.votes }}
                </div>
              </div>

            </div>
            <div class="more-btn" @click="isShowMembers=true">
              MORE
            </div>
          </div>
          <div class="right">
            <div class="title-box">
              <div class="title">
                Refuse
              </div>
              <div class="address">
                {{ proposal.refuseArr.length }} Address
              </div>
            </div>
            <div class="vote-number">
              <div class="number" style="color: #ff1a1a">
                {{ proposal.againstVotes.replace(/,/g, '') / 10**this.coinInfo.decimals }}
              </div>
              <div class="number-line">
                <div class="active-number" :style="'width:' + (proposal.refuseArr.length / proposal.receiptsArr.length) * 340 + 'px'">

                </div>
              </div>
            </div>
            <div class="members">
              <div class="member-item" v-for="(item,index) in proposal.refuseArr" :key="index">
                <div class="icon">
                  <img src="" alt="">
                </div>
                <div class="name">
                  {{ item.address }}
                </div>
                <div class="number">
                  {{ item.votes }}
                </div>
              </div>

            </div>
            <div class="more-btn" @click="isShowMembers=true">
              MORE
            </div>
          </div>
        </div>
        <div class="rainbow-panel right-part">
          <div class="title">
            Timeline
          </div>
          <div class="step-box">
            <div class="step">
              <div class="icon" :class="{'active':statusIndex > 0}">
                <img src="../../../assets/imgs/right_icon.png" alt="">
              </div>
              <div class="name">
                Establish
              </div>
              <div class="date">
                {{ proposal.startBlock }} block
              </div>
            </div>
            <div class="step">
              <div class="icon" :class="{'active':statusIndex > 1}">
                <img src="../../../assets/imgs/right_icon.png" alt="">
              </div>
              <div class="name">
                Voting period
              </div>
              <div class="date">
                {{ proposal.endBlock }}block
              </div>
            </div>
            <div class="step">
              <div class="icon" :class="{'active':statusIndex > 2}">
                <img src="../../../assets/imgs/right_icon.png" alt="">
              </div>
              <div class="name">
                Publicity period
              </div>
              <div class="date">

              </div>
            </div>
            <div class="step">
              <div class="icon" :class="{'active':statusIndex > 3}">
                <img src="../../../assets/imgs/right_icon.png" alt="">
              </div>
              <div class="name">
                Publicity period
              </div>
              <div class="date">

              </div>
            </div>
            <div class="step">
              <div class="icon" :class="{'active':statusIndex > 4}">
                <img src="../../../assets/imgs/right_icon.png" alt="">
              </div>
              <div class="name">
                Finished
              </div>
              <div class="date">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rainbow-panel part3">
        <div class="title">
          Details
        </div>
        <div class="part3-content">
          {{ proposal.desc }}
        </div>
      </div>
    </div>
    <page-footer/>
    <div class="rainbow-dialog-box" v-show="isShowMembers">
      <div class="mask" @click="isShowMembers=false"/>
      <div class="rainbow-dialog" @click.stop>
        <div class="title-box">
          <div class="title">
            All Members
          </div>
          <div class="address">

          </div>
        </div>
        <div class="vote-number">
          <div class="number">
            {{ proposal.forVotes.replace(/,/g, '') / 10**this.coinInfo.decimals }}
          </div>
          <div class="number-line">
            <div class="active-number" :style="'width:' + (proposal.supportArr.length / proposal.receiptsArr.length) * 340 + 'px'">


            </div>
          </div>
        </div>
        <div class="members">
          <div class="member-item" v-for="(item,index) in proposal.receiptsArr" :key="index">
            <div class="icon">
              <img src="" alt="">
            </div>
            <div class="name">
              {{ item.address }}
            </div>
            <div class="number">
              {{ item.votes }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rainbow-dialog-box" v-show="isShowDelegate">
      <div class="mask" @click="isShowDelegate=false"/>
      <div class="rainbow-dialog">
        <div class="title-box">
          <div class="title" style="font-size: 20px">
            DELEGATE
          </div>
        </div>
        <div class="input-box">
          <div class="input-box-title">
            DELEGATE ADDRESS
          </div>
          <div class="select-box">
            <input type="text" v-model="delegateAddress" placeholder="please input delegateAddress">
          </div>
        </div>
        <div class="rainbow-button" @click="delegate" style="width: 200px;margin-top: 30px;height: 40px">
          Delegate
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {eventBus} from "../../../utils/eventBus";

export default {
  name: "proposalDetail",
  data() {
    return {
      proposal: {
        delegateAddress: "",
        endBlock: 0,
        supportArr: [],
        receiptsArr:[],
        refuseArr: [],
        publicityDelay: 0
      },
      isShowMembers: false,
      statusIndex: 0,
      myVotes: 0,
      blockNumber: 0,
      isShowDelegate: false
    }
  },
  computed: {
    ...mapGetters(['account', 'isConnected']),
    coinInfo() {
      if (this.$store.state.erc20.coinInfo) {
        return this.$store.state.erc20.coinInfo
      } else {
        return {}
      }
    },

    curDaoControlAddress() {
      return this.$store.state.daoManage.curDaoControlAddress
    },
  },
  watch: {
    isConnected() {
      this.getData()
    },
    account() {
      this.getData()
    }
  },
  mounted() {
    this.proposal = this.$route.params.item
    this.coinAddress = this.curDaoControlAddress.erc20Addr

    this.dealUpdateList()
    switch (this.proposal.state) {
      case "Active":
        this.statusIndex = 1
    }
    this.getData()
    this.$eventBus.$on('message', (message) => {
      this.getData()
    })
  },
  beforeDestroy() {
    this.$eventBus.$on('message', () => {
    })
  },
  methods: {
    dealUpdateList(){
      if (this.proposal.receipts) {
        this.proposal.receiptsArr = []
        this.proposal.supportArr = []
        this.proposal.refuseArr=[]
        for (let key in this.proposal.receipts) {
          if (this.proposal.receipts[key] && this.proposal.receipts[key].votes) {

            this.proposal.receipts[key].votes = ((this.proposal.receipts[key].votes).toString().replace(/,/g, '')) / 10**this.coinInfo.decimals
            this.proposal.receiptsArr.push({
              address: key,
              ...this.proposal.receipts[key],
            })
            if (this.proposal.receipts[key].support == 1) {
              this.proposal.supportArr.push({
                address: key,
                ...this.proposal.receipts[key],
              })
            } else {
              this.proposal.refuseArr.push({
                address: key,
                ...this.proposal.receipts[key],
              })
            }
          }
        }
      }
    },
    delegate() {
      if (!this.delegateAddress) {
        eventBus.$emit('message', {
          type: "error",
          message: "Please input delegate address"
        })
        return
      }
      this.$store.dispatch("erc20/delegate", {
        address: this.delegateAddress,
        coinAddress: this.coinAddress
      }).then(() => {
        this.isShowDelegate = false
        this.$eventBus.$on('message', (message) => {
          if(message&&message=="Delegate Success"){
            this.getData()
          }
        })
      }).catch(err => {
        eventBus.$emit('message', {
          type: "error",
          message: err
        })
      })
    },
    getData() {
      this.$store.dispatch("erc20/getPriorVotes", {
        blockNumber: parseInt(this.proposal.endBlock.toString().replace(',', '')) - this.proposal.publicityDelay,
        coinAddress: this.coinAddress
      })
      this.$store.dispatch("erc20/getCurrentVotes", this.curDaoControlAddress.erc20Addr).then(res => {
        if (res) {
          res = res.toString().replace(/,/g, '')
          this.myVotes = parseInt(res) / (10 ** this.coinInfo.decimals)
        }
      })

    },
    getProposalList() {
      if (this.isConnected && this.curDaoControlAddress) {
        this.$store.dispatch("daoProposal/listProposals", this.curDaoControlAddress.proposalAddr).then(async res => {
          for (let i = 0; i < res.length; i++) {
            await this.$store.dispatch("daoProposal/state", {
              proposalId: res[i].proposalId,
              address: this.curDaoControlAddress.proposalAddr
            }).then(state => {
              res[i].state = state
            })
            if(res[i].proposalId == this.proposal.proposalId){
              this.proposal = res[i]
            }
          }
          this.dealUpdateList()

          this.$store.commit("daoProposal/SET_PROPOSALLIST",JSON.parse(JSON.stringify(res)))
        })
      }
    },
    castVote(support) {
      if(this.myVotes==0){
        this.$eventBus.$emit('message', {
          message: "you  Votes is 0",
          type: "error"
        })
        return
      }
      if(this.proposal.state!="Active"){
        this.$eventBus.$emit('message', {
          message: "Proposal state Not Active",
          type: "error"
        })
        return
      }
      this.$store.dispatch("daoProposal/castVote", {
        proposalAddress: this.$store.state.daoManage.curDaoControlAddress.proposalAddr,
        coinAddress: this.coinAddress,
        proposal_id: this.proposal.proposalId,
        support
      }).then(() => {
        this.$eventBus.$on('message', (message) => {
          if(message.type == "success" && message.message=="Vote Success"){
              this.getProposalList()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.proposalDetail {
  .rainbow-dialog {
    .title-box {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        color: #333333;
        line-height: 18px;
      }

      .address {
        font-size: 12px;
        font-weight: 600;
        color: #999999;
      }
    }

    .input-box {
      margin-top: 20px;

      .input-box-title {
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
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

    .vote-number {
      .number {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        color: #5edba6;
        line-height: 30px;
      }

      .number-line {
        width: 340px;
        height: 5px;
        background: #eaeaea;
        border-radius: 2px;

        .active-number {
          width: 0px;
          height: 5px;
          background: #5edba6;
          border-radius: 2px;
        }
      }
    }


  }

  .members {
    .member-item {
      display: flex;
      align-items: center;
      padding: 6px 20px 16px 0;
      position: relative;
      margin-top: 10px;

      .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;

        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;

        }
      }

      .name {
        margin-left: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #6919bb;
        width: 200px;
        overflow: hidden;
        line-height: 20px;
      }

      .number {
        position: absolute;
        right: 10px;
        font-weight: bold;
        color: #6919bb;
        line-height: 18px;
        width: 80px;
        overflow: hidden;
      }
    }
  }

  .detail-content {
    .part1 {
      display: flex;

      .left, .right {
        width: 50%;
      }

      .left {
        .content {
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          color: #333333;
          line-height: 26px;
        }

        .status-box {
          display: flex;
          margin-top: 30px;

          .status {
            padding: 2px 10px;
            height: 26px;
            line-height: 24px;
            background: rgba(255, 174, 37, 0.20);
            border: 1px solid rgba(255, 174, 37, 0.50);
            border-radius: 5px;
            color: #ffae25;
          }

          .date {
            padding: 4px 10px;
            height: 17px;
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            color: #ffae25;
            line-height: 17px;
          }
        }
      }

      .right {
        .title {
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          color: #333333;
        }

        .number {
          font-size: 24px;
          font-weight: bold;
          text-align: left;
          color: #db1f7e;
          line-height: 36px;
        }

        .btn-box {
          display: flex;
          margin-top: 10px;

          .support, .Refuse {
            cursor: pointer;
            width: 80px;
            height: 30px;
            border-radius: 10px;
            color: #fff;
            text-align: center;
            line-height: 30px;

          }

          .support {
            background: #5edba6;
            margin-left: 10px;
            box-shadow: 0px 3px 5px 0px rgba(99, 226, 172, 0.50);
          }

          .Refuse {

            margin-left: 10px;
            background: linear-gradient(90deg, #ff6a6a, #ff1a1a 100%);
            box-shadow: 0px 3px 5px 0px rgba(254, 151, 134, 0.50);
          }
        }
      }
    }

    .part2 {
      display: flex;
      width: 1140px;
      margin: 16px auto;
      justify-content: space-between;

      .rainbow-panel.left-part {
        width: 800px;
      }

      .rainbow-panel.right-part {
        width: 300px;

        .title {
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          color: #333333;
          line-height: 20px;
        }

        .step-box {
          .step {
            padding-left: 30px;
            position: relative;

            .icon {
              position: absolute;
              left: 0px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #eee;

              &.active {
                background: #5EDBA6;
              }

              img {
                margin: 10%;
                width: 80%;
                height: 80%;
              }
            }

            .name {
              font-weight: bold;
              color: #333;
              font-size: 16px;
            }

            .date {
              height: 40px;
              line-height: 40px;
              color: #999999;
              font-size: 14px;
            }
          }
        }
      }

      .left-part {
        display: flex;

        .left, .right {
          width: 50%;
          padding-right: 20px;

          .title-box {
            display: flex;
            justify-content: space-between;

            .title {
              font-size: 16px;
              font-weight: bold;
              text-align: left;
              color: #333333;
              line-height: 18px;
            }

            .address {
              font-size: 12px;
              font-weight: 600;
              color: #999999;
            }
          }

          .vote-number {
            .number {
              font-size: 20px;
              font-weight: 400;
              text-align: left;
              color: #5edba6;
              line-height: 30px;
            }

            .number-line {
              width: 340px;
              height: 5px;
              background: #eaeaea;
              border-radius: 2px;

              .active-number {
                width: 0px;
                height: 5px;
                background: #5edba6;
                border-radius: 2px;
              }
            }
          }


          .more-btn {
            margin-top: 20px;
            margin-left: calc(50% - 40px);
            color: #999999;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            width: 80px;
            height: 30px;
            background: #f0f0f0;
            border-radius: 10px;
          }
        }

        .right {
          .vote-number {
            .active-number {
              background: linear-gradient(90deg, #ff6a6a, #ff1a1a 100%) !important;
            }
          }
        }
      }
    }

    .part3 {

      .title {

      }

      .part3-content {
        margin-top: 20px;
        line-height: 20px;
        width: 100%;
        word-break: break-word;
        color: #333333;
      }
    }
  }
}
</style>
