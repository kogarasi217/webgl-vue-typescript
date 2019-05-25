<template>
  <canvas ref="canvas" id="canvas" :width="WIDTH" :height="HEIGHT" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component
export default class RotateBoxComp extends Vue {

  // =========================================
  // Private Property
  // =========================================

  private WIDTH = 960;
  private HEIGHT = 540;

  private scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer | null = null;
  private camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 1, 10000);
  private light = new THREE.DirectionalLight(0xffffff);
  private geometry = new THREE.SphereGeometry(300, 30, 30);
  private controls = new OrbitControls(this.camera);
  private loader = new THREE.TextureLoader();
  private texture = this.loader.load('/earthmap1k.jpg');
  private material = new THREE.MeshStandardMaterial({map: this.texture});
  private mesh = new THREE.Mesh(this.geometry, this.material);

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

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    this.camera.position.set(0, 0, +1000);
    this.light.position.set(1, 1, 1);
    this.scene.add(this.mesh);
    this.scene.add(this.light);

    this.createStarField();

    this.animate();
  }

  // =========================================
  // Private Property
  // =========================================

  private animate() {
    requestAnimationFrame(this.animate);
    this.mesh.rotation.y += 0.001;
    this.mesh.rotation.x += 0.001;
    this.controls.update();
    this.renderer!.render(this.scene, this.camera);
  }

  private createStarField() {
    const geometry = new THREE.Geometry();
    const numParticles = 1000;
    const SIZE = 3000;
    for(let i=0; i<numParticles; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5)
        )
      );
    }

    const material = new THREE.PointsMaterial({
      size: 5,
      color: 0xffffff
    });

    const mesh = new THREE.Points(geometry, material);
    this.scene.add(mesh);

  }
}
</script>
