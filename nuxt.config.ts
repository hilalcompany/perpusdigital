// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules:["@nuxtjs/supabase"],
  supabase: {redirect: false },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
})
