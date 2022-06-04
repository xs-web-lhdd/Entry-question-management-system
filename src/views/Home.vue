\<template>
  <div class="basic-layout">
    <!-- 左侧 -->
    <div :class="['nav-side', isCollapse?'fold':'unfold']">
      <!-- logo部分 -->
      <div class="logo">
        <img src="./../assets/logo.png" class="img" alt="">
        <span>收题鸟</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        class="nav-menu"
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
      >
        <!-- <TreeMenu :userMenu="userMenu"/> -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>上传题目</span>
          </template>
            <el-menu-item index="PdfTopic">PDF 上传</el-menu-item>
            <el-menu-item index="HandTopic">手动上传</el-menu-item>
        </el-sub-menu>

      </el-menu>
    </div>
    <!-- 右侧 -->
    <div :class="['content-right', isCollapse?'fold':'unfold']">
      <!-- 上方面包屑部分 -->
      <div class="nav-top">
        <div class="nav-left">
          <el-icon v-if="!isCollapse" @click="toggle"  class="menu-flod">
            <Fold />
          </el-icon>
          <el-icon v-else @click="toggle"  class="menu-flod">
            <Expand />
          </el-icon>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <!-- 用户信息 -->
        <div class="userinfo">
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{userInfo?.userName}}
              <el-icon size="14px" class="userAvatar"><Avatar /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱：{{userInfo?.userEmail}}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 下方内容区域 -->
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from '../components/TreeMenu.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
export default {
  name: 'Home',
  components: { TreeMenu, BreadCrumb },
  data() {
    return {
      userInfo: this.$store.state.userInfo || {
        userName: '六好好',
        userEmail: '3042146237@qq.com'
      },
      isCollapse: false,
      userMenu: ["xxx"],
      activeMenu: location.hash.slice(1)
    }
  },
  methods: {
    handleLogout(key) {
      if (key === 'email') return
      this.$store.commit('saveUserInfo', '')
      this.userInfo = null
      this.$router.push('/login')
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-layout{
  position: relative;
  .nav-side{
    overflow: hidden;
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition:  width .5s;
    .logo{
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      .img{
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }
    .nav-menu{
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold{
      width: 64px;
    }
    // 展开
    &.unfold{
      width: 200px;
    }
  }
  .content-right{
    transition:  margin-left .5s;
    margin-left: 200px;
    // 合并
    &.fold{
      margin-left: 64px;
    }
    // 展开
    &.unfold{
      margin-left: 200px;
    }
    .nav-top{
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #ddd;
      .nav-left{
        display: flex;
        align-items: center;
        .menu-fold{
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .userinfo{
        cursor: pointer;
        width: 100px;
        .user-link{
          width: 80px;
          height: 35px;
          line-height: 35px;
          color: #4091ff;
          display: block;
          margin-top: 8px;
          font-size: 12px;
        }
      }
    }
    .wrapper{
      background: #eef0f3;
      padding: 20px;
      min-height: calc(100vh - 50px);
      // .main-page{
      //     height: 100%;
      // }
    }
  }
}
.bread {
  margin-left: 10px;
}
.userAvatar {
  display: block;
  margin-right: 15px;
  float: right;
  margin-top: 10px;
}
</style>
