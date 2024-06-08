<template>

  <body>
    <div id="divPrincipal" :style="`background-color:${pokemonColor}`">
      <div class="q-pa-md">
        <div class="inputClass">
          <div class="q-gutter-md row items-start">
            <q-input v-model="search" filled type="search" placeholder="Name or ID of the Pokemon" id="input"
              @keyup.enter="traer()" aria-required="">
              <template v-slot:append>
                <q-btn icon="search" @click="traer()" :style="`color:${contrastingColor}`" />
                <q-btn icon="volume_up" @click="reproducir()" v-show="visible" :style="`color:${contrastingColor}`" />
              </template>
            </q-input>
          </div>
        </div>
        <h1 id="pokemonName" style="text-transform: uppercase;" :style="`color:${contrastingColor}`">{{ namPokemon }}
        </h1>
      </div>
      <div class="pokemonDiv1">
        <img :src="imgPokemon" alt="" id="imgPokemon">
      </div>
      <div class="textPokemon">
        <h3 v-show="visible" :style="`color:${contrastingColor}`">{{ idPokemon }}</h3>
        <!-- <h3 v-show="visible">{{ namPokemon }}</h3> -->
        <h3 v-show="visible" :style="`color:${contrastingColor}`">{{ abiPokemon1 }}</h3>
        <h3 v-show="visible" :style="`color:${contrastingColor}`">{{ heiPokemon }}</h3>
        <h3 v-show="visible" :style="`color:${contrastingColor}`">{{ weiPokemon }}</h3>
      </div>
      <div class="btnStatistics">
        <q-btn v-for="filter in backdropFilterList" :key="filter.label" color="primary" :label="filter.label" no-caps
          @click="filter.onClick" id="btnStatis" v-show="visible" />
        <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
          <q-card class="mdlStatis" :style="`background-color:${contrastingColor}`">
            <q-card-section class="row items-center q-pb-none text-h6" id="mdlTitle">
              Statistics
            </q-card-section>

            <q-card-section>
              <div id="circularClass" class="q-pa-md flex flex-center">
                <q-circular-progress id="circularProgress" show-value font-size="20%" :value="value" size="810%"
                  :thickness="0.15" color="teal" track-color="grey-3" class="q-ma-md" v-show="visible">
                  Hp
                </q-circular-progress>
                <q-circular-progress id="circularProgress" show-value font-size="20%" :value="value1" size="810%"
                  :thickness="0.15" color="teal" track-color="grey-3" class="q-ma-md" v-show="visible">
                  Attack
                </q-circular-progress>
                <q-circular-progress id="circularProgress" show-value font-size="20%" :value="value2" size="810%"
                  :thickness="0.15" color="teal" track-color="grey-3" class="q-ma-md" v-show="visible">
                  Defense
                </q-circular-progress>
                <q-circular-progress id="circularProgress" show-value font-size="20%" :value="value3" size="810%"
                  :thickness="0.15" color="teal" track-color="grey-3" class="q-ma-md" v-show="visible">
                  Special <br> Attack
                </q-circular-progress>
                <q-circular-progress id="circularProgress" show-value font-size="20%" :value="value4" size="810%"
                  :thickness="0.15" color="teal" track-color="grey-3" class="q-ma-md" v-show="visible">
                  Special <br> Defense
                </q-circular-progress>
                <q-circular-progress id="circularProgress" show-value font-size="20%" :value="value5" size="810%"
                  :thickness="0.15" color="teal" track-color="grey-3" class="q-ma-md" v-show="visible">
                  Speed
                </q-circular-progress>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
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
let contrastingColor = ref('')
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
const contrastingColors = {
  fire: 'black', //6
  water: 'yellow', //393
  grass: 'purple', //pendiente 3
  electric: 'darkblue', //25
  ground: 'lightblue', //28
  rock: 'lightgray', //74
  fairy: 'darkblue',//888
  poison: 'lime',//23 y 890
  bug: 'lightgreen',//666
  dragon: 'cyan',//887
  psychic: 'yellow',//196
  flying: 'darkred',//641
  fighting: 'lightgreen',//891
  normal: 'black',//143
  ice: 'darkblue',//873
  ghost: 'gold',//200
  steel: 'lightblue',//1000
  dark: 'lightgrey'//799
};

const list = ['STATISTICS']

const dialog = ref(false)
const backdropFilter = ref(null)

let backdropFilterList = list.map(filter => ({
  label: filter, onClick: () => {
    backdropFilter.value = filter
    dialog.value = true
  }
}))

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
  contrastingColor.value = contrastingColors[pokemonType];
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

body {
  background-image: url("https://wallpapers-clan.com/wp-content/uploads/2024/04/pokemon-eevee-sitting-in-field-anime-preview-desktop-wallpaper.jpg");
  background-size: cover;
}

#divPrincipal {
  width: 100%;
  height: 100vh;
}

.inputClass {
  align-content: center;
}

#pokemonName {
  letter-spacing: 5px;
  margin: 0%;
  position: absolute;
  transform: translate(750px, -50px);
}

.btnStatistics {
  margin-bottom: 5%;

}

#btnStatis {
  background-color: black !important;
  color: white !important;
  border: none;
  border-radius: 25px;
  margin: 2%;
  width: 25%;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  font-size: 40px;
  box-shadow: 0 9px rgba(0, 0, 0, 0.662);
  transition: all 0.3s ease;
}

#btnStatis:hover {
  box-shadow: 0 5px #666;
  transform: translateY(-4px);
  color: green;
}

#btnStatis:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

h3 {
  margin: 2%;
  background-color: rgba(126, 126, 126, 0.477);
  width: 25%;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

#mdlTitle {
  font-size: 30px;
  display: flex;
  justify-content: center;
}

.mdlStatis {
  background-color: rgba(126, 126, 126, 0.905);
}

.q-pa-md {
  padding-bottom: 0px;
  padding-top: 5px;
}

.pokemonDiv1 {
  position: absolute;
  transform: translate(110%, 10%);
  width: 40%;
}

#imgPokemon {
  width: 95%;
}

@media screen and (max-width:800px) and (min-width:300px) {
  body {
    background-image: url("https://cdn.andro4all.com/andro4all/2019/02/Fondo-pantalla-pokemon-snorlax.jpg?height=600");
    background-size: cover;
  }

  #divPrincipal {
    width: 100%;
    height: auto;
  }

  .q-pa-md {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

  .inputClass {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #pokemonName {
    position: inherit;
    transform: translate(0%, 0%);
    display: flex;
    justify-content: center;
    margin: 0%;
    font-size: 300%;
  }

  .pokemonDiv1 {
    position: absolute;
    transform: translate(50%, 0%);
  }

  #imgPokemon {
    width: 180%;
  }

  .textPokemon {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 3%;
    margin-top: 75%;
  }

  h3 {
    width: 90%;
    font-size: 170%;
  }

  #circularClass {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }

  .btnStatistics {
    margin: 0%;
    margin-top: 5%;
    display: flex;
    justify-content: center;
  }

  #btnStatis {
    font-size: 150% !important;
    width: 50%;
  }
}

@media screen and (max-width:1400px) and (min-width:801px) {
  #divPrincipal {
    width: 100%;
  }

  #pokemonName {
    width: 50%;
    position: inherit;
    transform: translate(80%, -70%);
    display: flex;
    justify-content: center;
    margin: 0%;
    font-size: 350%;
  }

  .pokemonDiv1 {
    position: absolute;
    transform: translate(135%, -18%);
  }

  #imgPokemon {
    width: 70%;
  }

  .textPokemon {
    margin: 0%;
    transform: translate(0%, -20%);
  }

  h3 {
    width: 30%;
    font-size: 170%;
  }

  .btnStatistics {
    margin: 0%;
    width: 50%;
    display: flex;
    justify-content: center;
    transform: translate(90%, -190%);
  }

  #btnStatis {
    font-size: 150% !important;
    width: 50%;
  }
}
</style>
