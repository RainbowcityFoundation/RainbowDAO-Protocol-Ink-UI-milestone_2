<template>
  <div class="layout">
    <div id="resize-box">
      <div class="layout-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "layout",

  data() {
    return {}
  },
  mounted() {


  },
  methods: {

  }
}
</script>


<style lang="scss" scoped>
@media screen and (min-width:1960px){
  #resize-box{
    zoom: 1.3;
  }
}
#galaxy {
  width: 100%;
  height: 100%;
  opacity: 0.8;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
}


@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 20px #12C2E9;
  }
  40% {
    text-shadow: 0 0 20px #C471ED;
  }
  75% {
    text-shadow: 0 0 20px #F64F59;
  }
}
//public css
::v-deep .rainbow-panel{
  position: relative;
  color: black;
  width: 1120px;
  top: -130px;
  margin: 0px auto 0;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 20px 20px 3px rgba(156,156,156,0.10);
  .title{
    font-size: 26px;
    font-weight: 900;
    text-align: left;
    color: #333333;
    line-height: 37px;
  }
}


.layout {
  background: #10101B;
  ::v-deep .rainbow-nav-box{
    display: flex;
    border-bottom: 2px solid #eaeaea;
    .nav-item{
      padding: 10px 20px 16px 0;
      cursor: pointer;
      font-size: 16px;
      font-weight: 900;
      text-align: left;
      color: #333333;
      line-height: 17px;
      &.active{
        color: #DB1F7E;
        position: relative;
        &::after{
          content: '';
          position: absolute;
          bottom: 0;
          width: calc(100% - 20px);
          height: 2px;
          background: #DB1F7E;
          left: 0;
        }
      }
    }
  }
  ::v-deep .swiper-container, .swiper-slide {
    height: 100% !important;
  }

  ::v-deep .swiper-pagination {
    width: 30px;
    position: fixed;
    left: 10px !important;
    top: calc(50% - 100px);
    z-index: 3;

    .swiper-pagination-bullet {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid #2c3e50 !important;
      margin-top: 6px;
      //border-image: linear-gradient(90deg, #12c2e9, #c471ed 55%, #f64f59) 1 1;
      border-radius: 50%;
      cursor: pointer;
    }

    .swiper-pagination-bullet-active {
      border: 3px solid #2c3e50 !important;
      background: linear-gradient(90deg, #12c2e9 0%, #c471ed 64%, #f64f59 100%);
    }
  }

  .layout-content {
    height: calc(100% - 52px);
    min-height: 500px;
    background: #fff url("./assets/imgs/content_bg.png");
    background-size: 100% 100%;
  }


}
</style>
