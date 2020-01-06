<template>
  <div>
    <dragging-sphere />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DraggingSphere from '../components/DraggingSphere.vue';

@Component({ components: { DraggingSphere }})
export default class MousedragSpherePage extends Vue {}
</script>
