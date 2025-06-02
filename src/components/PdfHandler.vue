<template>
    <div class="extract-title">
    <h4>
      Extrator de PDF
    </h4>
    <p class="mt-2">
      Selecione páginas de um arquivo PDF e salve como PDF.
    </p>
  </div>
  <PdfExtractor />
</template>

<script setup>
import PdfExtractor from '@/components/PdfExtractor.vue'
</script>
