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

  private readonly WIDTH: number;
  private readonly HEIGHT: number;

  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer | null;
  private camera: THREE.PerspectiveCamera;
  private light: THREE.DirectionalLight;
  private geometry: THREE.SphereGeometry;
  private controls!: OrbitControls;
  private loader: THREE.TextureLoader;
  private texture: THREE.Texture;
  private material: THREE.MeshStandardMaterial;
  private mesh: THREE.Mesh;

  // =========================================
  // Constructor
  // =========================================

  constructor() {
    super();

    this.WIDTH = 960;
    this.HEIGHT = 540;

    this.scene = new THREE.Scene();
    this.renderer = null;
    this.camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 1, 10000);
    this.light = new THREE.DirectionalLight(0xffffff);
    this.geometry = new THREE.SphereGeometry(300, 30, 30);
    this.loader = new THREE.TextureLoader();
    this.texture = this.loader.load('/earthmap1k.jpg');
    this.material = new THREE.MeshStandardMaterial({ map: this.texture });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

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
