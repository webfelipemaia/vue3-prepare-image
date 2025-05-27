<template>
  <div>
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineExpose } from 'vue';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import locale_ptBR from '@/locales/locale-pt-br';
import blackTheme from '@/theme/black-theme.js';

const editorContainer = ref(null);
const editor = ref(null);

const getCanvasElement = () => {
  if (!editor.value) return null;
  return editor.value._graphics.getCanvasElement();
};

const getImageData = async () => {
  return new Promise((resolve) => {
    editor.value.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1
    }).then(resolve);
  });
};

const resetZoom = () => {
  if (editor.value) {
    editor.value.resetZoom();
  }
}

onMounted(() => {
  editor.value = new ImageEditor(editorContainer.value, {
    includeUI: {
      loadImage: {
        path: '',
        name: 'SampleImage',
      },
      theme: blackTheme,
      locale: locale_ptBR,
      menu: ['crop', 'filter'],
      initMenu: 'filter',
      uiSize: {
        width: '1024px',
        height: '680px',
      },
      menuBarPosition: 'right',
    },
    cssMaxWidth: 700,
    cssMaxHeight: 500,
    selectionStyle: {
      cornerSize: 20,
      rotatingPointOffset: 70,
    },
  });

    // Adicione o handler para o item customizado
  editor.value.ui.eventHandler['customResetZoom'] = () => {
    editor.value.resetZoom();
  };
});

// Expõe métodos para o componente pai
defineExpose({
  getCanvasElement,
  getImageData,
  resetZoom,
  instance: editor
});
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>