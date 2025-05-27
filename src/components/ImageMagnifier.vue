<template>
  <div class="magnifier-container">
    

    <ImageEditor ref="imageEditor" />
    
    <div v-if="showMagnifier" class="magnifier" :style="magnifierStyle">
      <canvas ref="magnifierCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { fabric } from 'fabric';
import ImageEditor from './ImageEditor.vue';

export default {
  components: { ImageEditor },
  setup() {
    const imageEditor = ref(null);
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
      // Acessa o canvas do editor
      editorCanvas.value = imageEditor.value.getCanvasElement();
      
      if (!editorCanvas.value) {
        console.error('Canvas do editor não encontrado');
        return;
      }

      // Inicializa o canvas da lupa
      fabricCanvas.value = new fabric.Canvas(magnifierCanvas.value, {
        width: magnifierSize.value,
        height: magnifierSize.value,
        selection: false
      });

      // Configura eventos do mouse
      editorCanvas.value.addEventListener('mousemove', handleMouseMove);
      editorCanvas.value.addEventListener('mouseout', handleMouseOut);
      editorCanvas.value.addEventListener('mouseenter', handleMouseEnter);
    };

    const handleMouseEnter = () => {
      showMagnifier.value = true;
    };

    const handleMouseOut = () => {
      showMagnifier.value = false;
    };

    const handleMouseMove = async (e) => {
      if (!showMagnifier.value) return;

      const rect = editorCanvas.value.getBoundingClientRect();
      magnifierPosition.value = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      updateMagnifier();
    };

    const updateMagnifier = async () => {
      if (!imageEditor.value || !fabricCanvas.value) return;

      try {
        const imageData = await imageEditor.value.getImageData();
        
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
          
          // Cria efeito de lupa circular
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
          
          // Aplica clipping circular
          fabricCanvas.value.clipTo = (ctx) => {
            ctx.arc(
              magnifierSize.value / 2,
              magnifierSize.value / 2,
              magnifierSize.value / 2 - 1,
              0,
              Math.PI * 2,
              true
            );
          };
          
          // Atualiza posição
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

    // Função para resetar o zoom
    const resetZoom = () => {
      if (imageEditor.value) {
        imageEditor.value.resetZoom();
      }
    };

    onMounted(() => {
      // Inicia com pequeno delay para garantir que o editor está pronto
      setTimeout(() => {
        initMagnifier();
      }, 500);
    });

    onUnmounted(() => {
      if (editorCanvas.value) {
        editorCanvas.value.removeEventListener('mousemove', handleMouseMove);
        editorCanvas.value.removeEventListener('mouseout', handleMouseOut);
        editorCanvas.value.removeEventListener('mouseenter', handleMouseEnter);
      }
    });

    return {
      imageEditor,
      resetZoom,
      magnifierCanvas,
      zoomLevel,
      showMagnifier,
      magnifierStyle,
      magnifierPosition,
    };
  }
};
</script>

<style scoped>
.magnifier-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.magnifier {
  position: absolute;
  border: 2px solid #333;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

.magnifier canvas {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1001;
}

.reset-zoom-btn {
  padding: 8px 12px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.reset-zoom-btn:hover {
  background: #3a5bd9;
}
</style>