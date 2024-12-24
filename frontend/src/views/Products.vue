<template>
    <div class="fruits-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-6">Fruits</h2>
        
        <!-- Load, Update, and Delete buttons -->
        <div class="flex justify-between mb-4">
          <button class="btn btn-primary" @click="load">Load Fruits</button>
          <button class="btn btn-primary" @click="update" :disabled="selectedId === null">Update</button>
          <button class="btn btn-primary" @click="remove">Delete</button>
        </div>
        
        <!-- Fruits list -->
        <ul class="list-disc pl-5 mb-4">
          <li v-for="fruit in fruits" :key="fruit.id" class="mb-2">
            <input type="radio" :value="fruit.id" v-model="selectedId" class="mr-2">
            {{ fruit.name }} : {{ fruit.color }}
          </li>
        </ul>
        
        <!-- Input fields for new fruit -->
        <input v-model="fruitName" placeholder="Fruit Name" class="input mb-2" />
        <input v-model="fruitColor" placeholder="Fruit Color" class="input mb-4" />
  
        <!-- Add and Clear buttons -->
        <div class="flex justify-between">
          <button class="btn btn-primary" @click="create" :disabled="!fruitName || !fruitColor">Add Fruit</button>
          <button class="btn btn-default" @click="clearFields" :disabled="!fruitName && !fruitColor">Clear Fields</button>
        </div>
  
        <!-- Debug information -->
        <div class="mt-4">{{ debug }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  
  // Base URL
  const base_url = import.meta.env.VITE_API_BASE_URL || '';
  // Reactive state variables
  const fruits = ref<{ id: number; name: string; color: string }[]>([]);
  const selectedId = ref<number | null>(null);
  const fruitName = ref('');
  const fruitColor = ref('');
  const debug = ref('');
  
  // Fetch all fruits
  async function load() {
    try {
      const res = await axios.get(`${base_url}/fruits`);
      fruits.value = res.data;
      message.success('Fruits loaded successfully');
    } catch (error) {
      message.error('Failed to load fruits');
    }
  }
  
  // Create a new fruit
  async function create() {
    if (!fruitName.value || !fruitColor.value) {
      message.error('Please enter both fruit name and color');
      return;
    }
  
    try {
      const res = await axios.post(`${base_url}/fruits`, {
        name: fruitName.value,
        color: fruitColor.value,
      });
      if (res.status === 201) {
        await load(); // Reload fruits list
        clearFields(); // Clear input fields
        message.success('Fruit added successfully');
      } else {
        message.error('Failed to add fruit');
      }
    } catch (error) {
      message.error('Failed to add fruit');
    }
  }
  
  // Update a fruit
  async function update() {
    if (selectedId.value === null) {
      message.error('Please select a fruit to update');
      return;
    }
  
    try {
      const res = await fetch(`${base_url}/fruits/${selectedId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fruitName.value, color: fruitColor.value })
      });
      if (res.ok) {
        await load(); // Reload fruits list
        clearFields(); // Clear input fields
        message.success('Fruit updated successfully');
        debug.value = 'Update ' + selectedId.value;
      } else {
        message.error('Failed to update fruit');
      }
    } catch (error) {
      message.error('Failed to update fruit');
    }
  }
  
  // Remove a fruit
  async function remove() {
    if (selectedId.value === null) {
      message.error('Please select a fruit to delete');
      return;
    }
  
    try {
      const res = await axios.delete(`${base_url}/fruits/${selectedId.value}`);
      if (res.status === 200) {
        await load(); // Reload fruits list
        selectedId.value = null;
        message.success('Fruit removed successfully');
      } else {
        message.error('Failed to remove fruit');
      }
    } catch (error) {
      message.error('Failed to remove fruit');
    }
  }
  
  // Clear input fields
  function clearFields() {
    fruitName.value = '';
    fruitColor.value = '';
  }
  
  // Watch for changes in selectedId and update input fields
  watch(selectedId, (newId) => {
    if (newId !== null) {
      const selectedFruit = fruits.value.find(fruit => fruit.id === newId);
      if (selectedFruit) {
        fruitName.value = selectedFruit.name;
        fruitColor.value = selectedFruit.color;
      }
    } else {
      clearFields();
    }
  });
  
  onMounted(load);
  </script>
  
  <style scoped>
  .fruits-container {
    @apply bg-gradient-to-r from-gray-200 to-gray-400;
  }
  .btn {
    @apply px-4 py-2 rounded;
  }
  .btn-primary {
    @apply bg-blue-500 text-white;
  }
  .btn-default {
    @apply bg-gray-300 text-black;
  }
  .input {
    @apply w-full px-3 py-2 border rounded;
  }
  </style>