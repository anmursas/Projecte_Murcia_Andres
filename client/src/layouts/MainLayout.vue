<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Qualificacions App
        </q-toolbar-title>

        <div>
          {{ fecha }}
          </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side = left
    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Login',
    caption: 'Log in',
    icon: 'login',
    link: '#'
  },
  {
    title: 'About',
    caption: 'Info',
    icon: 'info',
    link: '#/about'
  }
]

// import { date } from 'quasar'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  computed: {
    fecha () {
      const meses = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre']
      const hoy = new Date()
      const diaSemana = hoy.toLocaleDateString('ca-CA', { weekday: 'long' })
      const diaSemanaMayus = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
      return diaSemanaMayus + ', ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear()
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
