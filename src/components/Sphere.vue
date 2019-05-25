<template>
  <canvas ref="canvas" id="canvas" :width="WIDTH" :height="HEIGHT" />
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

  private WIDTH = 600;
  private HEIGHT = 400;

  private scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer | null = null;
  private camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 1, 10000);
  private light = new THREE.DirectionalLight(0xffffff);
  private geometry = new THREE.SphereGeometry(300, 30, 30);
  private material = new THREE.MeshStandardMaterial({color: 0xFF0000});
  private mesh = new THREE.Mesh(this.geometry, this.material);
  // private cube = new THREE.Mesh(this.geometry, this.material);

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

    this.camera.position.set(0, 0, 1000);
    this.light.position.set(1, 1, 1);
    this.scene.add(this.mesh);
    this.scene.add(this.light);

    this.animate();
  }

  // =========================================
  // Private Property
  // =========================================

  private animate() {
    requestAnimationFrame(this.animate);
    this.mesh.rotation.x += this.speedX;
    this.mesh.rotation.y += this.speedY;
    this.renderer!.render(this.scene, this.camera);
  }
}
</script>
