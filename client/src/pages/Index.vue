<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row">
        <h5 class="text-grey">Login</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1" style="width: 400px; height: 300">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                v-model="username"
                type="username"
                label="username"
                lazy-rules
                :rules="[required, this]"
              />
              <q-input
                filled
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="password"
                lazy-rules
                :rules="[required, this]"
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class= "cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-blue-7"
              size="lg"
              class="full-width"
              label="LOGIN"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">
              No estàs registrat? <a href="#/register">Registra't</a>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      username: '',
      password: '',
      isPwd: (true)
    }
  },
  methods: {
    required (val) {
      return (val && val.length > 0) || 'Campo necesario'
    }
  }
})
</script>
