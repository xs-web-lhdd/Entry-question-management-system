<template>
  <div>
    <div class="cropper-title">
      <div class="cropper-title-left">裁剪区：</div>
      <div class="cropper-title-right">预览区：</div>
    </div>
    <div class="cropper-content">
      <!-- 剪裁框 -->
      <div class="cropper">
        <!-- <img ref="image" :src="imgFile" alt=""> -->
        <!-- <img ref="image" src="../assets/images/imgs/2.png" alt=""> -->
        <!-- {{imgFile}} -->
        <img ref="image" :src=imgFile alt="">
      </div>
      <!-- 预览框 -->
      <div
        class="show-preview"
        :style="{
          overflow: 'hidden',
          margin: '0 25px',
          display: 'flex',
          'align-items': 'center'
        }"
      >
        <div class="preview before" />
      </div>
    </div>
    <div class="footer-btn">
      <!-- 缩放旋转按钮 -->
      <div class="scope-btn">
        <el-tooltip class="item" effect="dark" content="放大" placement="top">
          <el-button icon="el-icon-zoom-in" @click="cropperzoom(0.05)" circle type="primary">
            <Plus style="width: 1em; height: 1em; margin-right: 4px" />
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="缩小" placement="top">
          <el-button icon="el-icon-zoom-out" @click="cropperzoom(-0.05)" circle type="primary">
            <Minus style="width: 1em; height: 1em; margin-right: 2px" />
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="逆时针旋转"
          placement="top"
        >
          <el-button
            icon="el-icon-refresh-left"
            @click="cropperRotate(-90)"
            circle
            type="primary"
          >
            <RefreshLeft style="width: 1em; height: 1em; margin-right: 4px" />
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="顺时针旋转"
          placement="top"
        >
          <el-button
            icon="el-icon-refresh-right"
            @click="cropperRotate(90)"
            circle
            type="primary"
          >
            <RefreshRight style="width: 1em; height: 1em; margin-right: 4px" />
          </el-button>
        </el-tooltip>
      </div>

      <!-- 确认上传按钮 -->
      <div class="upload-btn">
        <!-- <el-button type="primary" @click="uploadImg('blob')">上传</el-button> -->
        <el-button @click="closeCropper">取消裁剪</el-button>
        <el-button
          type="primary"
          :disabled="isDisabled"
          @click="sureSava()"
        >确定裁剪</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import {
  Plus
} from '@element-plus/icons-vue'

export default {
  name: 'VueCropper',
  props: {
    imgFile: {
      type: String,
      default: ''
    },
    autoCropWidth: {
      type: Number,
      default: 0
    },
    autoCropHeight: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      myCropper: null,
      afterImg: '',
      ScaleX: 1,
      ScaleY: 1,
      fixed: false,
      fixedBox: false,
      inputRotate: 0,
      isDisabled: false,
      Plus
    }
  },
  computed: {},
  // watch: {
  //   imgFile: function(file) {
  //     console.log('file', file);
  //     this.imgFile = file
  //   }
  // },
  mounted() {
    this.init()
  },
  methods: {
    closeCropper() {
      console.log('这是关闭剪裁的逻辑：：：');
      // this.$emit('closeCropper')
    },
    handleChangeRotate(value) {
      this.cropperrotateTo(value)
    },
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'move',
        // initialAspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 1,
        zoomOnWheel: true,
        aspectRatio: this.autoCropWidth / this.autoCropHeight
        // movable :true,
        // rotatable :true
      })
    },
    // 裁剪
    uploadImgs() {
      this.afterImg = this.myCropper
        .getCroppedCanvas({
          imageSmoothingQuality: 'high'
        })
        .toDataURL('image/jpeg')
      this.$emit('getCrop', this.afterImg)
    },
    sureSava() {
      // console.log('this.myCropper', this.myCropper);
      // this.isDisabled = true
      this.afterImg = this.myCropper
        .getCroppedCanvas({
          imageSmoothingQuality: 'high'
        })
        .toDataURL('image/jpeg')
      // console.log('裁剪后的图片 base64 位：', this.afterImg);
      this.$emit('upload', this.base64ToBlob(this.afterImg))
    },
    base64ToBlob(code) {
      const parts = code.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length

      const uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], {
        type: contentType
      })
    },
    // 缩放
    cropperzoom(val) {
      this.myCropper.zoom(val)
    },
    // 重置
    cropperReset() {
      this.myCropper.reset()
      this.ScaleX = 1
      this.ScaleY = 1
    },
    // 移动
    croppermove(val1, val2) {
      this.myCropper.move(val1, val2)
    },
    // 旋转
    cropperRotate(val) {
      this.myCropper.rotate(val)
    },
    // 绝对角度旋转
    cropperrotateTo(val) {
      this.myCropper.rotateTo(val)
    },
    // X轴翻转
    cropperScaleX() {
      this.ScaleX = -this.ScaleX
      if (this.myCropper.getImageData().rotate === -90 || this.myCropper.getImageData().rotate === 90) {
        this.myCropper.scaleY(this.ScaleX)
      } else {
        this.myCropper.scaleX(this.ScaleX)
      }
    },
    // y轴翻转
    cropperScaleY() {
      // console.log(this.myCropper.getImageData().rotate)
      this.ScaleY = -this.ScaleY
      if (this.myCropper.getImageData().rotate === -90 || this.myCropper.getImageData().rotate === 90) {
        this.myCropper.scaleX(this.ScaleY)
      } else {
        this.myCropper.scaleY(this.ScaleY)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cropper {
  border: 1px solid #fff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC);
  img{
    width: 100%;
    opacity: 0;
  }
}
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}
.cropper-title {
  display: flex;
  margin-bottom: 5px;
  &-left {
    flex: 1;
  }
  &-right {
    margin-left: 180px;
    flex: 1;
  }
}
.cropper-content .cropper {
  width: 550px;
  height: 400px;
  overflow: hidden;
}
.cropper-content .show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  overflow: hidden;
  /* border: 1px solid #cccccc; */
  background: #cccccc;
  margin-left: 40px;
}
.preview {
  overflow: hidden;
  border: 1px solid #468ac8;
  background: #cccccc;
}
.footer-btn {
  margin-top: 10px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}
.footer-btn .scope-btn {
  width: 260px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.footer-btn .scope-btn span {
  display: inline-block;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
}
.footer-btn .scope-btn span i {
  font-size: 32px;
  color: #333333;
}
.footer-btn .upload-btn {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  margin-right: 25px;
}
.footer-btn .btn {
  outline: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.solide {
  margin-left: 25px;
  width: 200px;
}
.before {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 这个属性可以得到想要的效果 */
}
</style>
