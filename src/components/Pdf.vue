<template>
  <div class="main-container">
    <div class="input">
      <el-button type="primary" @click="input">选择 PDF</el-button>
      <el-button type="success" @click="inputMessage">上传</el-button>
      <input class="select" type="file" ref="fielinput" @change="uploadFile" />
      <div class="title" ref="title"></div>
    </div>
    <div class="canvas-container">
      <canvas ref="myCanvas" class="pdf-container"></canvas>
    </div>
    <div class="pagination-wrapper">
      <el-button @click="clickPre">上一页</el-button>
      <span class="page">第{{ pageNo }} / {{ pdfPageNumber }}页</span>
      <el-button @click="clickNext">下一页</el-button>
    </div>
  </div>
</template>

<script>
import ajax from '../utils/ajax'
import { ElMessage } from 'element-plus'
import pdfJS  from "pdfjs-dist/build/pdf.js"

import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry.js';

pdfJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
export default {
  name: 'vuePdf',
  props: {
    detailMessage: {
      type: Object,
      default: {
        input: "",
        grade: "1",
        subject: "1",
        year: "",
        kind: "1",
        ab: "1"
      }
    }
  },
  mounted() {},
  data() {
    return {
      pageNo: null,
      pdfPageNumber: null,
      pdfTotalPages: 1,
      renderingPage: false,
      pdfData: null, // PDF的base64
      scale: 1, // 缩放值
      pdfValue: null,
      file: null
    };
  },
  methods: {
    uploadFile() {
      let inputDom = this.$refs.fielinput;
      let file = inputDom.files[0];
      console.log(file);
      if(file.type !== "application/pdf") {
        ElMessage.error('请选择 PDF 格式文件')
        return
      }
      this.file = file
      // this.file.append('file', inputDom.files[0])
      // console.log(this.file);
      this.$refs.title.textContent = file.name
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let data = atob(
          reader.result.substring(reader.result.indexOf(",") + 1)
        );
        this.pdfValue = data
        this.loadPdfData(data);
      };
    },
    loadPdfData(data) {
      // 引入pdf.js的字体
      let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
      //读取base64的pdf流文件
      this.pdfData = pdfJS.getDocument({
        data: data, // PDF base64编码
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
      console.log(this.pdfData);
      this.renderPage(1);
      this.renderScrollPdf();
    },

    // 根据页码渲染相应的PDF
    renderPage(num) {
      this.renderingPage = true;
      this.pdfData.promise.then((pdf) => {
        this.pdfPageNumber = pdf.numPages;

        pdf.getPage(num).then((page) => {
          // 获取DOM中为预览PDF准备好的canvasDOM对象
          let canvas = this.$refs.myCanvas;
          // let viewport = page.getViewport(this.scale);
          // 改变 pdf 页面清晰度的问题
          let viewport = page.getViewport(2.0);
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          let ctx = canvas.getContext("2d");
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          page.render(renderContext).then(() => {
            this.renderingPage = false;
            this.pageNo = num;
          });
        });
      });
    },
    clickPre() {
      if (!this.renderingPage && this.pageNo && this.pageNo > 1) {
        this.renderPage(this.pageNo - 1);
      }
    },
    clickNext() {
      if (
        !this.renderingPage &&
        this.pdfPageNumber &&
        this.pageNo &&
        this.pageNo < this.pdfPageNumber
      ) {
        this.renderPage(this.pageNo + 1);
      }
    },
    renderScrollPdf() {
      this.pdfData.promise.then((pdf) => {
        this.pdfTotalPages = pdf.numPages;
        // this.renderScrollPdfPage(1);
      });
    },
    input() {
      this.$refs.fielinput.click()
    },
    async inputMessage() {
      if(!this.pdfData) {
        ElMessage({
          message: '请先选择 PDF 后再上传',
          type: 'warning',
        })
        return
      }
      const res = await ajax({
        action: 'https://www.fastmock.site/mock/b846b9ca901d017a72546d2589b4eb0d/api/dept/operate',
        data: this.detailMessage,
        filename: 'file',
        file: this.file,
        onError: (msg) => {
          console.log('失败的信息', msg);
        },
        onSuccess: (msg) => {
          console.log('成功的信息', msg);
        }
      })
      // const res = await this.$api.pdf({
      //   // ...this.detailMessage,
      //   // pdfVale: this.pdfValue,
      //   pdf: this.file
      // })
      console.log(res);
    }
  },
};
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .input {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .select {
    visibility: hidden;
    width: 1px;
  }
  .title {
    width: 80%;
    height: 24px;
    overflow: hidden;
    margin-left: 20px;
    font-size: 12px;
    line-height: 24px;
  }
}
.canvas-container {
  width: 100%;
  height: 100%;
  border: 1px dashed black;
  position: relative;
  display: flex;
  justify-content: center;
}
/* .scroll-pdf-contanier {
  width: 400px;
  height: 500px;
  border: 1px dashed black;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
} */
.pdf-container {
  width: 100%;
  height: 100%;
}
/* .scroll-pdf-container {
  width: 350px;
} */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.page {
  font-size: 12px;
}
</style>

