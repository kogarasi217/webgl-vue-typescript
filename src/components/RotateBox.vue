<template>
  <canvas ref="canvas" id="canvas" width="600" height="400" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as THREE from 'three';

@Component
export default class RotateBoxComp extends Vue {

  // =========================================
  // Props
  // =========================================

  @Prop({default: 0.02})
  public speedX!: number;

  @Prop({default: 0.02})
  public speedY!: number;

  // =========================================
  // Private Property
  // =========================================

  private scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer | null = null;
  private camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
  private light = new THREE.DirectionalLight(0xffffff);
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshNormalMaterial();
  private cube = new THREE.Mesh(this.geometry, this.material);

  // =========================================
  // Constructor
  // =========================================

  constructor() {
    super();
  }

  // =========================================
  // Mounted
  // =========================================

  public mounted() {
    const $canvas = this.$refs.canvas as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas,
    });

    this.camera.position.set(0, 0, 2);
    this.light.position.set(0, 0, 10);
    this.scene.add(this.cube);
    this.scene.add(this.light);

    this.animate();
  }

  // =========================================
  // Private Property
  // =========================================

  private animate() {
    requestAnimationFrame(this.animate);
    this.cube.rotation.x += this.speedX;
    this.cube.rotation.y += this.speedY;
    this.renderer!.render(this.scene, this.camera);
  }
}
</script>
