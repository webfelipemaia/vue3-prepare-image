<template>
  <div class="container pt-3 extract-wraper">
    <div class="row gx-2">
      <div class="col extract-wraper_col">
        <div class="p-2">
          <div class="mb-3">
            <label for="formFile" class="form-label">Escolha um arquivo PDF</label>
            <input type="file" @change="handleFileChange" accept="application/pdf" class="form-control" id="formFile">
          </div>

          <div class="mb-3 mt-5">
            Identifique as páginas para extração
          </div>

          <iframe ref="pdfFrame" style="width: 100%; height: 500px;"></iframe>
        </div>
      </div>
      <div class="col-md-3 extract-wraper_col">
        <div class="p-2">
          <div class="mb-5">
            <h5>Configurações</h5>
            <div class="mb-3">
              <label for="formExtractPages" class="form-label">Extrair as páginas</label>
              <input type="text" v-model="pageRange" placeholder="Ex: 2-4" class="form-control" id="formExtractPages">
            </div>
            <div class="mb-3">
              <label for="formQuality" class="form-label">Qualidade</label>
              <input type="number" class="form-control" id="formQuality" v-model.number="scale" min="0.5" max="5"
                step="0.1" aria-describedby="qualityDescription">
              <span id="qualityDescription" class="form-text">
                Escolha um valor de 1 a 5.
              </span>
            </div>

            <button @click="extractImages" type="submit" class="btn btn-primary mb-3">
              Salvar como imagens
            </button>
          </div>

          <div v-if="summary" style="margin-top: 1rem;">
            <h5 class="mb-3">Resumo da extração</h5>
            <ul>
              <li>Arquivo: <em>{{ summary.filename }}</em></li>
              <li>Total de páginas extraídas: {{ summary.pagesExtracted }}</li>
              <li>Páginas: {{ summary.pages.join(', ') }}</li>
              <li>Qualidade: {{ summary.scale }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { saveAs } from 'file-saver'
import * as PDFLib from 'pdf-lib'

const pdfArrayBuffer = ref(null)
const pageRange = ref('')
const scale = ref(2)
const pdfFrame = ref(null)
const filename = ref('')
const summary = ref(null)
const MAX_PAGES = 10

let pdfDoc = null

function readAsyncFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

function renderPdf(arrayBuff) {
  const blob = new Blob([arrayBuff], { type: 'application/pdf' })
  const docUrl = URL.createObjectURL(blob)
  pdfFrame.value.src = docUrl
}

function parseRange(input, totalPages) {
  const match = input.match(/^(\d+)-(\d+)$/)
  if (!match) return []
  let start = parseInt(match[1])
  let end = parseInt(match[2])
  if (start > end || start < 1 || end > totalPages) return []
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

async function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  filename.value = file.name.replace(/\.pdf$/, '')
  const buffer = await readAsyncFile(file)
  pdfArrayBuffer.value = buffer
  renderPdf(buffer)

  const loadingTask = window.pdfjsLib.getDocument({ data: buffer })
  pdfDoc = await loadingTask.promise
}

async function extractImages() {
  if (!pdfDoc) return alert('Carregue um PDF primeiro.')

  const totalPages = pdfDoc.numPages
  const pages = parseRange(pageRange.value, totalPages)
  if (!pages.length) return alert('Intervalo inválido.')

  const limitedPages = pages.slice(0, MAX_PAGES)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  let index = 1
  for (const pageNum of limitedPages) {
    const page = await pdfDoc.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value })
    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvasContext: ctx, viewport }).promise

    await new Promise(resolve => {
      canvas.toBlob(blob => {
        const fname = `${filename.value}-${pageNum}-${index}.png`
        saveAs(blob, fname)
        resolve()
      }, 'image/png')
    })

    index++
  }

  summary.value = {
    filename: filename.value,
    pagesExtracted: limitedPages.length,
    pages: limitedPages,
    scale: scale.value
  }
}
</script>

<style scoped>
iframe {
  border: 1px solid #ccc;
}
</style>
