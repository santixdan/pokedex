<template>

  <body>
    <div id="divPrincipal" :style="`background-color:${pokemonColor}`">
      <div class="q-pa-md">
        <div id="inputClass" class="q-gutter-md row items-start">
          <q-input v-model="search" filled type="search" placeholder="Name or ID of the Pokemon" id="input"
            @keydown.enter="buscarPokemon" aria-required="">
            <template v-slot:append>
              <q-btn icon="search" @click="traer()" />
            </template>
          </q-input>
        </div>
        <h1 id="pokemonName" style="text-transform: uppercase;">{{ namPokemon }}</h1>
      </div>
      <div class="pokemonDiv1">
        <img :src="imgPokemon" alt="" id="imgPokemon">
      </div>
      <div class="textPokemon">
        <h3 v-show="visible">{{ idPokemon }}</h3>
        <!-- <h3 v-show="visible">{{ namPokemon }}</h3> -->
        <h3 v-show="visible">{{ abiPokemon1 }}</h3>
        <h3 v-show="visible">{{ heiPokemon }}</h3>
        <h3 v-show="visible">{{ weiPokemon }}</h3>
      </div>
      <div id="circularClass" class="q-pa-md flex flex-center">
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value="value" size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          Hp
        </q-circular-progress>
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value="value1" size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          Attack
        </q-circular-progress>
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value="value2" size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          Defense
        </q-circular-progress>
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value="value3" size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          Special <br> Attack
        </q-circular-progress>
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value="value4" size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          Special <br> Defense
        </q-circular-progress>
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value="value5" size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          Speed
        </q-circular-progress>
        <q-circular-progress id="circularProgress" show-value font-size="20px" :value=100 size="120px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md" v-show="visible">
          <q-btn icon="volume_up" @click="reproducir()" />
        </q-circular-progress>
      </div>
    </div>
  </body>
</template>
<script setup>
import axios from "axios"
import { ref } from "vue";

const search = ref('')
let imgPokemon = ref("")
let namPokemon = ref("Pokémon")
let abiPokemon1 = ref("")
let idPokemon = ref("")
let heiPokemon = ref("")
let weiPokemon = ref("")
let value = ref()
let value1 = ref()
let value2 = ref()
let value3 = ref()
let value4 = ref()
let value5 = ref()
let visible = ref(false)
let pokemonType = ref("")
let pokemonColor = ref('');
const pokemonColors = {
  fire: 'orange',
  water: 'blue',
  grass: 'green',
  electric: 'yellow',
  ground: 'darkgoldenrod',
  rock: 'rgb(97, 89, 89)',
  fairy: 'pink',
  poison: 'rgb(84, 10, 84)',
  bug: 'brown',
  dragon: 'red',
  psychic: 'purple',
  flying: 'cornflowerblue',
  fighting: 'rgb(145, 0, 0)',
  normal: 'grey',
  ice: 'aqua',
  ghost: 'cadetblue',
  steel: 'rgb(86, 86, 86)',
  dark: 'rgb(44, 44, 44)',
};
function buscarPokemon(event) {
  if (event.key === 'Enter') {
    traer();
  }
}
async function traer() {
  let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.value}`)
  visible.value = true
  imgPokemon.value = pokemon.data.sprites.other["official-artwork"].front_default
  idPokemon.value = "#" + pokemon.data.id
  namPokemon.value = pokemon.data.species.name
  abiPokemon1.value = "Type: " + pokemon.data.types.map(t => t.type.name).join(", ");
  heiPokemon.value = "Height: " + pokemon.data.height / 10 + "m"
  weiPokemon.value = "Weight: " + pokemon.data.weight / 10 + "Kg"
  pokemonType = pokemon.data.types[0].type.name
  pokemonColor.value = pokemonColors[pokemonType];
  value.value = (pokemon.data.stats[0].base_stat * 100) / 255
  value1.value = (pokemon.data.stats[1].base_stat * 100) / 255
  value2.value = (pokemon.data.stats[2].base_stat * 100) / 255
  value3.value = (pokemon.data.stats[3].base_stat * 100) / 255
  value4.value = (pokemon.data.stats[4].base_stat * 100) / 255
  value5.value = (pokemon.data.stats[5].base_stat * 100) / 255
  console.log(pokemon);
  console.log(pokemonColor);
  console.log(pokemonType);
}
async function reproducir() {
  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.value}`);
  const soundUrl = pokemon.data.cries.latest;
  const audio = new Audio(soundUrl);
  audio.play();
}
</script>
<style>
@font-face {
  font-family: pokeletra;
  src: url("./font/PokemonSolid.ttf");
}

* {
  font-family: pokeletra;
  z-index: 9;
}

/* body{
  background-image: url("https://wallpapers-clan.com/wp-content/uploads/2024/04/pokemon-eevee-sitting-in-field-anime-preview-desktop-wallpaper.jpg");
  background-image: url("https://i.pinimg.com/736x/8a/21/05/8a21052e2cf3617f797381d759ab730e.jpg");
  background-size: cover;
  object-fit: cover;
  width: 100%;
} */
#pokemonName {
  letter-spacing: 5px;
  /* margin: 0%; */
  /* position: absolute; */
  /* transform: translate(350px, 0px); */
}

h3 {
  margin: 2%;
  background-color: rgba(126, 126, 126, 0.477);
  width: 30%;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.q-pa-md {
  padding-bottom: 0px;
  padding-top: 5px;
}

.pokemonDiv1 {
  position: absolute;
  transform: translate(150%, 0%);
  width: 40%;
}

#imgPokemon {
  width: 80%;
}

@media screen and (max-width:600px) and (min-width:300px) {
  #divPrincipal {
    width: 100%;
    /* height: 340vh; */
  }

  .q-pa-md {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    /* gap: 30%; */
    align-items: center;
  }

  #pokemonName{
    display: flex;
    justify-content: center;
    margin: 0%;
    font-size: 350%;
  }

  .pokemonDiv1 {
    position: absolute;
    transform: translate(30%, 5%);
  }

  #imgPokemon {
    width: 200%;
  }

  .textPokemon{
    /* width: 33%; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 1%;
    margin-top: 90%;
    /* align-items: center; */
  }
  h3{
    width: 90%;
    font-size: 200%;
    /* text-align: center;*/
    align-content: center; 
  }
  #circularClass{
    /* width: 80%; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    /* justify-content: center; */
    /* gap: 1%; */
  }
  q-circular-progress{
    size: 50%;
  }
}
</style>
