<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ error}}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="text_boto"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404',
  data () {
    return {
      error: 'Pàgina no existent',
      text_boto: 'Torna a l\'inici'
    }
  }
})
</script>
