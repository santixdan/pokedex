<template>
    <q-circular-progress show-value font-size="25px" :value="normalizedValue" size="90px" :thickness="0.22" color="teal"
        track-color="grey-3" class="q-ma-md">
        {{ normalizedValue }}%
    </q-circular-progress>
</template>

<script>
export default {
    data() {
        return {
            value: 0, // Valor real
            maxValue: 255 // Valor máximo deseado
        }
    },
    computed: {
        normalizedValue() {
            // Normalizamos el valor real para que esté en el rango de 0 a 255
            return Math.round(this.value / this.maxValue * 100)
        }
    }
}
</script>