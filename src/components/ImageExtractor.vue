<template>
  <div>
    <input type="file" @change="handleFileChange" accept="application/pdf" />
    <iframe ref="pdfFrame" style="width: 100%; height: 500px;"></iframe>

    <div style="margin-top: 1rem;">
      <input type="text" v-model="pageRange" placeholder="Ex: 2-4" />
      <label>Qualidade (1-5):</label>
      <input type="number" v-model.number="scale" min="0.5" max="5" step="0.1" />
      <div style="margin-top: 0.5rem;">
        <button @click="extractImages">Salvar como imagens</button>
      </div>
    </div>

    <div v-if="summary" style="margin-top: 1rem;">
      <h4>Resumo da extração:</h4>
      <ul>
        <li><strong>Arquivo:</strong> {{ summary.filename }}</li>
        <li><strong>Total de páginas extraídas:</strong> {{ summary.pagesExtracted }}</li>
        <li><strong>Páginas:</strong> {{ summary.pages.join(', ') }}</li>
        <li><strong>Qualidade:</strong> {{ summary.scale }}</li>
      </ul>
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

async function extractPages() {
  if (!pdfArrayBuffer.value) return alert('Carregue um PDF primeiro.')

  const totalPages = pdfDoc.numPages
  const pages = parseRange(pageRange.value, totalPages)
  if (!pages.length) return alert('Intervalo inválido.')
  const selectedPages = pages.slice(0, MAX_PAGES)

  // Clona o buffer para evitar erro "detached ArrayBuffer"
  const bufferClone = pdfArrayBuffer.value.slice(0)
  const pdfSrcDoc = await PDFLib.PDFDocument.load(bufferClone)
  const pdfNewDoc = await PDFLib.PDFDocument.create()

  const copiedPages = await pdfNewDoc.copyPages(pdfSrcDoc, selectedPages.map(i => i - 1))
  copiedPages.forEach(p => pdfNewDoc.addPage(p))

  const newpdf = await pdfNewDoc.save()
  saveAs(new Blob([newpdf], { type: 'application/pdf' }), `${filename.value}-extraido.pdf`)
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
