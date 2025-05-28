<template>
  <div class="editor-wrapper">
    <div ref="editorContainer" class="editor-container"></div>
    <!-- Só renderiza o magnifier quando o editor estiver pronto -->
    <ImageMagnifier v-if="editorReady" :imageEditor="editor" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import locale_ptBR from '@/locales/locale-pt-br';
import blackTheme from '@/theme/black-theme.js';
import ImageMagnifier from './ImageMagnifier.vue';

const editorContainer = ref(null);
const editor = ref(null);
const editorReady = ref(false); // sinaliza quando estiver pronto

const getCanvasElement = () => {
  return editor.value?._graphics?.getCanvasElement() ?? null;
};

const getImageData = async () => {
  return editor.value?.toDataURL({ format: 'png', quality: 1 });
};

const resetZoom = () => {
  editor.value?.resetZoom();
};

onMounted(() => {
  editor.value = new ImageEditor(editorContainer.value, {
    includeUI: {
      loadImage: { path: '', name: 'SampleImage' },
      theme: blackTheme,
      locale: locale_ptBR,
      menu: ['crop', 'filter', ],
      initMenu: 'filter',
      uiSize: { width: '1024px', height: '680px' },
      menuBarPosition: 'right',
    },
    cssMaxWidth: 700,
    cssMaxHeight: 500,
    selectionStyle: {
      cornerSize: 20,
      rotatingPointOffset: 70,
    },
  });

  setTimeout(() => {
    const helpMenu = document.querySelector('.tui-help-menu');
    if (helpMenu) {
      const resetBtn = document.createElement('button');
      resetBtn.innerText = 'Resetar Zoom';
      resetBtn.className = 'tui-custom-reset-btn';
      resetBtn.style.marginTop = '10px';
      resetBtn.style.padding = '8px';
      resetBtn.style.background = '#4a6cf7';
      resetBtn.style.color = 'white';
      resetBtn.style.border = 'none';
      resetBtn.style.borderRadius = '4px';
      resetBtn.style.cursor = 'pointer';

      resetBtn.onclick = () => {
        editor.value.resetZoom();
      };

      helpMenu.appendChild(resetBtn);
    }
  }, 1000);

  // Sinaliza que o editor está pronto
  setTimeout(() => {
    editorReady.value = true;
  }, 500); // delay de segurança
});

defineExpose({
  getCanvasElement,
  getImageData,
  resetZoom,
  instance: editor
});
</script>

<style scoped>
.editor-wrapper {
  position: relative;
}
</style>
