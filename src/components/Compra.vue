<template>
  <div>
    <input type="text" name="" id="" v-model="id" placeholder="Name or ID of the Pokemon">
    <button @click="traer()">Traer datos</button>
    <img :src="imgPokemon" alt="">
    <h1>{{ idPokemon }}</h1>
    <h1>{{ namPokemon }}</h1>
    <h1>{{ abiPokemon1 }}</h1>
    <h1>{{ heiPokemon }}</h1>
    <h1>{{ weiPokemon }}</h1>
    <q-linear-progress size="25px" :value="progress1" color="accent">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progressLabel1" :aria-placeholder="progress1" />
      </div>
    </q-linear-progress>
    <q-linear-progress size="25px" :value="progress2" color="accent">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progressLabel1" :aria-placeholder="progress1" />
      </div>
    </q-linear-progress>
  </div>
</template>
<script setup>
import axios from "axios"
import { ref } from "vue";

let id = ref()
let imgPokemon = ref("")
let namPokemon = ref("")
let abiPokemon1 = ref("")
let idPokemon = ref("")
let heiPokemon = ref("")
let weiPokemon = ref("")
let progress1 = ref()
let progress2 = ref()

async function traer() {
  let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id.value}`)
  //pokemon.data.stats[0].base_stat

  imgPokemon.value = pokemon.data.sprites.other["official-artwork"].front_default
  idPokemon.value = "Id: " + pokemon.data.id
  namPokemon.value = "Name: " + pokemon.data.species.name
  abiPokemon1.value = "Type: " + pokemon.data.types.map(t => t.type.name).join(", ");
  heiPokemon.value = "Height: " + pokemon.data.height / 10 + "m"
  weiPokemon.value = "Weight: " + pokemon.data.weight / 10 + "Kg"
  progress1 = pokemon.data.stats[0].base_stat /100
  progress2 = pokemon.data.stats[1].base_stat /100
  return {
    progress1,
    progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + '%'),
    
  }




  
}
</script>
<style></style>