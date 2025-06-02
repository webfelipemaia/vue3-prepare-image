<template>
  <div class="pt-3 extract-wrapper">
    <div class="row gx-2">
      <div class="col extract-wrapper_col">
        <div class="p-2">
          <div class="mb-3">
            <label for="pdfinput" class="form-label">Escolha um arquivo PDF</label>
            <input type="file" id="pdfinput" class="form-control" @change="handleFileChange" accept="application/pdf" />
          </div>

          <div class="mb-3 mt-5">
            Identifique as páginas para extração
          </div>

          <iframe id="pdfFrame" ref="pdfFrame" style="width: 100%; height: 500px;"></iframe>
        </div>
      </div>

      <div class="col-md-3 extract-wrapper_col">
        <div class="p-2">
          <div class="mb-3">
            <h5>Configurações</h5>
            <div class="mb-3">
              <label for="formExtractPages" class="form-label">Extrair as páginas</label>
              <input type="text" v-model="pageRange" placeholder="Ex: 1-3" class="form-control" id="rangeselector" />
            </div>
          </div>
          <button @click="extractPages" id="extractBtn" class="btn btn-primary mb-3">Extrair PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as PDFLib from 'pdf-lib'
import { saveAs } from 'file-saver'

const pdfArrayBuffer = ref(null)
const pageRange = ref('')
const pdfFrame = ref(null)
const filename = ref('')
const summary = ref(null)
const MAX_PAGES = 10

let pdfDoc = null // instância PDF.js global

function readAsyncFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}


function renderPdf(arrayBuff) {
  const tempblob = new Blob([new Uint8Array(arrayBuff)], {
    type: 'application/pdf'
  })
  const docUrl = URL.createObjectURL(tempblob)
  pdfFrame.value.src = docUrl

}


function range(start, end) {
  let length = end - start + 1
  return Array.from({ length }, (_, i) => start + i - 1)
}

async function handleFileChange(event) {
  const files = event.target.files
  if (files.length > 0) {
    pdfArrayBuffer.value = await readAsyncFile(files[0])
    renderPdf(pdfArrayBuffer.value)
  }
}

async function extractPages() {
  if (!pdfArrayBuffer.value) {
    alert('Por favor, carregue um PDF primeiro!')
    return
  }

  const rangelist = pageRange.value.split('-')
  const pdfSrcDoc = await PDFLib.PDFDocument.load(pdfArrayBuffer.value)
  const pdfNewDoc = await PDFLib.PDFDocument.create()

  const pages = await pdfNewDoc.copyPages(
    pdfSrcDoc,
    range(Number(rangelist[0]), Number(rangelist[1]))
  )

  pages.forEach(page => pdfNewDoc.addPage(page))
  const newpdf = await pdfNewDoc.save()
  saveAs(new Blob([newpdf], { type: 'application/pdf' }), `extracted.pdf`)
}

</script>
