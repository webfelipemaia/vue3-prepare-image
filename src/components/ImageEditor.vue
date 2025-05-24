<template>
  <div>
    <div ref="editorContainer" style="height: 700px;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';

const editorContainer = ref(null);
let editor;

onMounted(() => {
  editor = new ImageEditor(editorContainer.value, {
    includeUI: {
      loadImage: {
        path: '',
        name: 'SampleImage',
      },
      theme: {},
      menu: ['crop', 'filter'],
      initMenu: 'filter',
      uiSize: {
        width: '800px',
        height: '540px',
      },
      menuBarPosition: 'bottom',
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

<style scoped>
/* Opcional: ajuste de layout */
</style>
