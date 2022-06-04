<template>
  <div class="main">
    <Pdf class="pdf"></Pdf>
    <div class="edit">这是编辑区域</div>
  </div>
</template>

<script>
import Pdf from '../components/Pdf.vue'

export default {
  name: 'PdfTopic',
  components: { Pdf },
  setup() {
    
  },
}
</script>

<style scoped>
.main {
  display: flex;
}
.pdf {
  
}
.edit {
  margin-left: 10px;
  width: 600px;
  height: 1000px;
  background-color: black;
}
</style>