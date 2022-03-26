<template>
  <div class="department-home">
    <div class="balance">
      <div class="sub-title" style="font-size: 20px">
        DEPARTMENT INFO
      </div>
      <div class="sub-title">
        <img src="@/assets/daoImgs/title_icon1.png" alt="">
        Name
      </div>
      <div class="number" style="display:flex;">
        {{departmentInfo.name}}
        <div class="rainbow-button" @click="joinDepartment" style="width: 160px;margin-left: 30px">
          Join Department
        </div>
      </div>
      <div class="sub-title">
        <img src="@/assets/daoImgs/title_icon1.png" alt="">
        ID
      </div>
      <div class="number">
        <strong></strong>
         {{departmentInfo.id}}
      </div>
      <div class="sub-title">
        <img src="@/assets/daoImgs/title_icon1.png" alt="">
        IS OPEN
      </div>
      <div class="number">
        <strong></strong>
        {{departmentInfo.isOpen}}
      </div>
      <div class="sub-title">
        <img src="@/assets/daoImgs/title_icon1.png" alt="">
        Join Directly
      </div>
      <div class="number">
        {{departmentInfo.joinDirectly}}
      </div>
      <div class="sub-title">
        <img src="@/assets/daoImgs/title_icon1.png" alt="">
        Manager
      </div>
      <div class="address">
        {{departmentInfo.manager}}
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "departmentHome",
  props:{
    departmentInfo:Object
  },
  data(){
    return{

    }
  },
  methods:{
    joinDepartment(){
      this.$emit("joinDepartment")
    }
  }
}
</script>

<style lang="scss" scoped>
.department-home {
  padding: 30px 50px;
  .address {
    width: 460px;
    margin-top: 20px;
    padding: 10px;
    color: #F96AAF;
    background: #f5f5f5;
    border: 1px solid rgba(255, 31, 132, 0.15);
    border-radius: 5px;
  }
  .sub-title{
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #333333;
    line-height: 50px;
    display: flex;
    align-items: center;
    img{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
  .balance{

    .number{
      height: 35px;
      font-size: 26px;
      font-weight: 700;
      text-align: left;
      color: #ec1676;
      line-height: 35px;
      strong{
        font-size: 32px;
      }
    }
  }
  .child-dao{

  }
  .contract-list{

  }
}
</style>
