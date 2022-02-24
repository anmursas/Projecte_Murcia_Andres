<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row">
        <h5 class="text-grey">Register</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1" style="width: 400px; height: 300">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                v-model="nomcomplet"
                type="nomcomplet"
                label="Nom Complet"
                lazy-rules
                :rules="[required, this]"
              />
              <q-input
                filled
                v-model="dni"
                type="dni"
                label="DNI"
                lazy-rules
                :rules="[required, this.dniValido]"
              />
              <q-input
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
                :rules="[required, this.short, val=> val.length > 8 || 'La contrasenya ha de tindre mínim 8 caràcters']"
              />
              <q-input
                filled
                v-model="confpassword"
                :type="isPwd ? 'password' : 'text'"
                label="confirm password"
                lazy-rules
                :rules="[required, this.short,val => val === this.password || 'Les contrasenyes no coincideixen']"
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
              label="REGISTER"
            />
          </q-card-actions>
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
      nomcomplet: '',
      dni: '',
      username: '',
      password: '',
      confpassword: '',
      isPwd: (true)
    }
  },
  methods: {
    required (val) {
      return (val.length > 0) || 'Camp requerit'
    },
    dniValido (val) {
      const validDni = /^[XYZ]?\d{8}[A-Z]$/
      val = val.toUpperCase()
      if (validDni.test(val) === true) {
        return true
      } else {
        return 'DNI Incorrecto'
      }
    }
  }
})
</script>
