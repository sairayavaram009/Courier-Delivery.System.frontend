
<script setup>
import { defineProps, toRef, defineEmits } from "vue";

const props = defineProps({
  title: String,
  value: {
    type: String,
    required: true,
  },
  disabled: Boolean,
  id: String,
  className: String,
});

const emit = defineEmits(["update:value"]);

const handleChange = (event) => {
  emit("update:value", event.target.value);
};
</script>

<template>
  <div :class="className" style="margin-bottom: 10px">
    <v-text-field
      :label="title"
      variant="outlined"
      :value="value"
      :disabled="disabled"
      @input="handleChange"
    ></v-text-field>
  </div>
</template>