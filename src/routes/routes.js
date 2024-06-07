import Venta from "../components/Venta.vue"
import Producto from "../components/Producto.vue"
import Compra from "../components/Compra.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {path:"/", component: Venta},
    {path: "/producto", component: Producto},
    {path: "/compra", component:Compra}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})