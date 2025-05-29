<template>
  <div class="magnifier-container">
    <!-- Botão deve estar sempre visível 
    <button @click="resetZoom" class="reset-zoom-btn">
      Resetar Zoom (100%)
    </button>-->


    <div v-if="showMagnifier" class="magnifier" :style="magnifierStyle">
      <canvas ref="magnifierCanvas"></canvas>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { fabric } from 'fabric';

const props = defineProps({
  imageEditor: Object
});

const magnifierCanvas = ref(null);
const magnifierSize = ref(150);
const zoomLevel = ref(2);
const showMagnifier = ref(false);
const magnifierPosition = ref({ x: 0, y: 0 });
const fabricCanvas = ref(null);
const editorCanvas = ref(null);

const magnifierStyle = ref({
  width: `${magnifierSize.value}px`,
  height: `${magnifierSize.value}px`,
  left: '0px',
  top: '0px'
});

const initMagnifier = () => {
  try {
    const canvas = props.imageEditor?._graphics?.getCanvasElement?.();
    if (!canvas) {
      console.warn('Editor ainda não inicializado.');
      return;
    }

    editorCanvas.value = canvas;

    fabricCanvas.value = new fabric.Canvas(magnifierCanvas.value, {
      width: magnifierSize.value,
      height: magnifierSize.value,
      selection: false
    });

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);
    canvas.addEventListener('mouseenter', handleMouseEnter);
  } catch (err) {
    console.error('Erro ao inicializar a lupa:', err);
  }
};

const handleMouseEnter = () => showMagnifier.value = true;
const handleMouseOut = () => showMagnifier.value = false;

const handleMouseMove = (e) => {
  if (!showMagnifier.value) return;

  const rect = editorCanvas.value.getBoundingClientRect();
  magnifierPosition.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

  updateMagnifier();
};

const updateMagnifier = async () => {
  const editor = props.imageEditor;
  if (!editor || !fabricCanvas.value) return;

  try {
    const imageData = await editor.toDataURL(); // capturando imagem do canvas
    fabric.Image.fromURL(imageData, (img) => {
      fabricCanvas.value.clear();

      const scale = zoomLevel.value;
      const x = magnifierPosition.value.x / editorCanvas.value.width * img.width;
      const y = magnifierPosition.value.y / editorCanvas.value.height * img.height;

      img.scaleX = scale;
      img.scaleY = scale;
      img.left = magnifierSize.value / 2 - x * scale;
      img.top = magnifierSize.value / 2 - y * scale;

      fabricCanvas.value.add(img);

      const circle = new fabric.Circle({
        radius: magnifierSize.value / 2,
        left: magnifierSize.value / 2,
        top: magnifierSize.value / 2,
        originX: 'center',
        originY: 'center',
        fill: 'transparent',
        stroke: '#333',
        strokeWidth: 2,
        selectable: false
      });

      fabricCanvas.value.add(circle);
      fabricCanvas.value.renderAll();

      magnifierStyle.value = {
        ...magnifierStyle.value,
        left: `${magnifierPosition.value.x - magnifierSize.value / 2}px`,
        top: `${magnifierPosition.value.y - magnifierSize.value / 2}px`
      };
    });
  } catch (error) {
    console.error('Erro ao atualizar lupa:', error);
  }
};

const resetZoom = async () => {
  if (props.imageEditor?.resetZoom) {
    await props.imageEditor.resetZoom();
    //updateMagnifier();
  }
};

onMounted(() => {
  // Espera o editor estar disponível antes de iniciar
  setTimeout(() => {
    initMagnifier();
  }, 200);
});

onUnmounted(() => {
  if (editorCanvas.value) {
    editorCanvas.value.removeEventListener('mousemove', handleMouseMove);
    editorCanvas.value.removeEventListener('mouseout', handleMouseOut);
    editorCanvas.value.removeEventListener('mouseenter', handleMouseEnter);
  }
});
</script>
