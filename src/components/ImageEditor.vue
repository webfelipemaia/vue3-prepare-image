<template>
  <div class="editor-wrapper">
    <div ref="editorContainer" class="editor-container"></div>
    <ImageMagnifier v-if="editorReady" :imageEditor="editor" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageMagnifier from './ImageMagnifier.vue';

// Temas e Locales
import blackTheme from '@/theme/black-theme';
import whiteTheme from '@/theme/white-theme';
import locale_ptBR from '@/locales/pt-BR';
import locale_en from '@/locales/en';


const themeMap = {
  blackTheme,
  whiteTheme
};

const localeMap = {
  locale_ptBR,
  locale_en
};


const editorContainer = ref(null);
const editor = ref(null);
const editorReady = ref(false);

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
      loadImage: {
        path: '',
        name: import.meta.env.VITE_IMAGE_NAME
      },
      theme: themeMap[import.meta.env.VITE_EDITOR_THEME],
      locale: localeMap[import.meta.env.VITE_EDITOR_LOCALE],
      menu: import.meta.env.VITE_MENU.split(','),
      initMenu: import.meta.env.VITE_INIT_MENU,
      uiSize: {
        width: import.meta.env.VITE_UI_WIDTH,
        height: import.meta.env.VITE_UI_HEIGHT,
      },
      menuBarPosition: import.meta.env.VITE_MENU_BAR_POSITION,
    },
    cssMaxWidth: parseInt(import.meta.env.VITE_CSS_MAX_WIDTH),
    cssMaxHeight: parseInt(import.meta.env.VITE_CSS_MAX_HEIGHT),
    selectionStyle: {
      cornerSize: parseInt(import.meta.env.VITE_CORNER_SIZE),
      rotatingPointOffset: parseInt(import.meta.env.VITE_ROTATING_POINT_OFFSET),
    },
  });

  setTimeout(() => {
    const helpMenu = document.querySelector('.tui-image-editor-help-menu');
    if (helpMenu) {
      const resetBtn = document.createElement('li');
      resetBtn.className = 'tie-btn-zoomoff tui-image-editor-item help';
      resetBtn.setAttribute('tooltip-content', 'Resetar Zoom');
      resetBtn.style.cursor = 'pointer';
      resetBtn.innerHTML = `
        <svg class="zoom-out" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 64 64">
          <style>
            .zoom-out {
              fill: none;
              stroke: #8a8a8a;
              stroke-width: 3;
              fill-rule: evenodd;
            }
            .zoom-out:hover {
              fill: none;
              stroke: #e9e9e9;
            }
          </style>
          <circle cx="26" cy="26" r="20" class="use-default"/>
          <line x1="38" y1="38" x2="60" y2="60" stroke-linecap="round" class="use-default"/>
          <line x1="18" y1="18" x2="34" y2="34" stroke-linecap="round" class="use-default"/>
          <line x1="34" y1="18" x2="18" y2="34" stroke-linecap="round" class="use-default"/>
        </svg>
      `;

      resetBtn.onclick = () => {
        editor.value.resetZoom();
      };

      helpMenu.insertBefore(resetBtn, helpMenu.firstChild);
    }
  }, 1000);

  setTimeout(() => {
    editorReady.value = true;
  }, 500);
});

defineExpose({
  getCanvasElement,
  getImageData,
  resetZoom,
  instance: editor
});
</script>