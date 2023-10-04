<template>
  <button :disabled="disabled" @click="clickHandler" class="app-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'StandardButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandler() {
      this.$emit('click');
    }
  }
};
</script>

<style>
    .app-button {
        padding: 10px 15px;
        background-color: #4CAF50;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }
    .app-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>
