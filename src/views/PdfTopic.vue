<template>
  <div class="select">
    <!-- <el-button type="primary">选择 PDF</el-button> -->
    <el-form-item label="试卷名字" class="select__name unification">
      <el-input v-model="form.input" placeholder="请输入试卷名称" />
    </el-form-item>
    <el-form-item label="年级" class="select__grade unification">
      <el-select v-model="form.grade" placeholder="请选择试卷年级">
        <el-option label="初一" value="1" />
        <el-option label="初二" value="2" />
        <el-option label="初三" value="3" />
        <el-option label="高一" value="4" />
        <el-option label="高二" value="5" />
        <el-option label="高三" value="6" />
      </el-select>
    </el-form-item>
    <el-form-item label="文理科" class="select__kind">
      <el-select v-model="form.kind" placeholder="文科 | 理科">
        <el-option label="文科" value="1" />
        <el-option label="理科" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="ab卷" class="select__ab">
      <el-select v-model="form.ab" placeholder="a | b 卷">
        <el-option label="a卷" value="1" />
        <el-option label="b卷" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="科目" class="select__subject unification">
      <el-select v-model="form.subject" placeholder="请选择试卷科目">
        <el-option label="数学" value="1" />
        <el-option label="语文" value="2" />
        <el-option label="英语" value="3" />
        <el-option label="物理" value="4" />
        <el-option label="化学" value="5" />
        <el-option label="生物" value="6" />
        <el-option label="地理" value="7" />
        <el-option label="政治" value="8" />
        <el-option label="历史" value="9" />
      </el-select>
    </el-form-item>
    <el-form-item label="试卷年份" class="select__year unification">
      <el-input v-model="form.year" placeholder="请输入试卷年份" />
    </el-form-item>
  </div>
  <div class="main">
    <Pdf class="pdf"></Pdf>
    <div class="clapboard"></div>
    <div class="edit">
      <!-- <p>这是编辑区域</p> -->
      <div class="">
        <el-button type="success">全部上传</el-button>
        <el-button type="danger">全部删除</el-button>
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/0.png' alt="">
        <div class="operation">
          <el-button type="primary">修改信息</el-button>
          <el-button type="success">确定上传</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/1.png' alt="">
        <div class="operation">          
          <el-button type="primary">修改信息</el-button>
          <el-button type="success">确定上传</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/2.png' alt="">
        <div class="operation">
          <el-button type="primary">修改信息</el-button>
          <el-button type="success">确定上传</el-button>
          <el-button type="danger">删除</el-button>
        </div>
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/3.png' alt="">
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/4.png' alt="">
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/5.png' alt="">
      </div>
      <div class="topic">
        <img class="topic__img" src='../assets/images/imgs/6.png' alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pdf from '../components/Pdf.vue'
const imgs = [
  '../assets/images/imgs/0.png',
  '../assets/images/imgs/1.png',
  '../assets/images/imgs/2.png',
  '../assets/images/imgs/3.png',
  '../assets/images/imgs/4.png',
  '../assets/images/imgs/5.png',
  '../assets/images/imgs/6.png',
  '../assets/images/imgs/7.png',
  '../assets/images/imgs/8.png',
  '../assets/images/imgs/9.png',
]

const form = reactive({
  input: "",
  grade: "",
  subject: "",
  year: "",
  kind: "",
  ab: ""
})

export default {
  name: 'PdfTopic',
  components: { Pdf },
  setup() {
    return { imgs, form }
  },
}
</script>

<style scoped lang="scss">
.select {
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  &__name {
    width: 300px;
  }
  .unification {
    margin-left: 20px;
    width: 200px;
  }
  &__kind {
    margin-left: 20px;
    width: 150px;
  }
  &__ab {
    margin-left: 20px;
    width: 150px;
  }
}
.main {
  display: flex;
}
.pdf {
  width: 50%;
}
.clapboard {
  width: 2%;
}
.edit {
  margin-left: 10px;
  width: 48%;
  height: 1000px;
  /* background-color: black; */
}

.topic {
  width: 100%;
  margin-top: 10px;
  &__img {
    width: 100%;
  }
  .operation {
    margin: 0 auto;
    width: 50%;
    margin-top: 5px;
  }
}
</style>