<template>
  <div class="editor-wrapper">
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import locale_ptBR from '@/locales/locale-pt-br';
import whiteTheme from '@/theme/white-theme.js';
import blackTheme from '@/theme/black-theme.js';

const editorContainer = ref(null);
let editor;

onMounted(() => {
  editor = new ImageEditor(editorContainer.value, {
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
});
</script>