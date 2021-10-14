import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/interests",
            name: "interests",
            component: () => import("./components/interests-list")
        },
        {
            path: "/interests/:id",
            name: "interest-details",
            component: () => import("./components/interest")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/add-interest")
        }
    ]
});