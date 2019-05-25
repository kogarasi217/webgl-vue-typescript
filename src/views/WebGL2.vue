<template>
  <div>
    <div>
      <label for="speedX">speed - X</label>
      <input
        v-model.number="vmSpeedX"
        name="speedX"
        id="speed"
        type="range"
        min="-0.1"
        max="0.1"
        step="0.005"
      />
    </div>
    <div>
      <label for="speedY">speed - Y</label>
      <input
        v-model.number="vmSpeedY"
        name="speedY"
        id="speed"
        type="range"
        min="-0.1"
        max="0.1"
        step="0.005"
      />
    </div>
    <sphere
      :speedX="vmSpeedX"
      :speedY="vmSpeedY"
    />
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Sphere from '../components/Sphere.vue';

@Component({
  components: {
    Sphere,
  },
})
export default class WebGLPage extends Vue {

  // =========================================
  // V-Model
  // =========================================

  private vmSpeedX: number;
  private vmSpeedY: number;

  // =========================================
  // constructor
  // =========================================

  constructor() {
    super();
    this.vmSpeedX = 0.02;
    this.vmSpeedY = 0.02;
  }

}
</script>
