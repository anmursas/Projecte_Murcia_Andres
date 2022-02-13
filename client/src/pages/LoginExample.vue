<template>
  <q-page padding>
    <div id="q-app">
      <q-layout view="lHh Lpr fff">
        <q-page
          class="window-height window-width row justify-center items-center"
          style="background: linear-gradient(#8274c5, #5a4a9f)"
        >
          <div class="column q-pa-lg">
            <div class="row">
              <q-card
                square
                class="shadow-24"
                style="width: 400px; height: 540px"
              >
                <q-card-section class="bg-deep-purple-7">
                  <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
                </q-card-section>
                <q-card-section>
                  <q-fab
                    color="primary"
                    icon="add"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%)"
                    @click="switchTypeForm"
                  >
                    <q-tooltip> TOOLTIP </q-tooltip>
                  </q-fab>
                  <q-form class="q-px-sm q-pt-xl">
                    <q-input
                      ref="email"
                      v-model="email"
                      square
                      clearable
                      type="email"
                      lazy-rules
                      :rules="[required, isEmail, this.short]"
                      label="Email"
                    >
                      <template #prepend>
                        <q-icon name="email" />
                      </template>
                    </q-input>
                    <q-input
                      v-if="register"
                      ref="username"
                      v-model="username"
                      square
                      clearable
                      lazy-rules
                      :rules="[required, this.short]"
                      type="username"
                      label="usuario"
                    >
                      <template #prepend>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                    <q-input
                      ref="password"
                      v-model="password"
                      square
                      clearable
                      :type="passwordFieldType"
                      lazy-rules
                      :rules="[required, this.short]"
                      label="Pass"
                    >
                      <template #prepend>
                        <q-icon name="lock" />
                      </template>
                      <template #append>
                        <q-icon
                          :name="visibilityIcon"
                          class="cursor-pointer"
                          @click="switchVisibility"
                        />
                      </template>
                    </q-input>
                    <q-input
                      v-if="register"
                      ref="repassword"
                      v-model="repassword"
                      square
                      clearable
                      :type="passwordFieldType"
                      lazy-rules
                      :rules="[required, this.short, diffPassword]"
                      label="password check"
                    >
                      <template #prepend>
                        <q-icon name="lock" />
                      </template>
                      <template #append>
                        <q-icon
                          name="visibilityIcon"
                          class="cursor-pointer"
                          @click="switchVisibility"
                        />
                      </template>
                    </q-input>
                  </q-form>
                </q-card-section>

                <q-card-actions class="q-px-lg">
                  <q-btn
                    unelevated
                    size="lg"
                    color="secondary"
                    class="full-width text-white"
                    :label="btnLabel"
                    @click="submit"
                  />
                </q-card-actions>
                <q-card-section v-if="!register" class="text-center q-pa-sm">
                  <p class="text-grey-6">Te has olvidao?</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page>
      </q-layout>
    </div>
  </q-page>
</template>

<script>
export default {
  el: "#q-app",

  name: "LoginExample",

  data() {
    return {
      title: "Ejemplo Login",
      email: "",
      username: "",
      password: "",
      repassword: "",
      register: false,
      passwordFieldType: "password",
      btnLabel: "Вход",
      visibility: false,
      visibilityIcon: "visibility",
    };
  },

  methods: {
    required(val) {
      return (val && val.length > 0) || "Поле должно быть заполнено";
    },
    diffPassword(val) {
      const val2 = this.$refs.password.value;
      return (val && val === val2) || "Пароль не совпадает!";
    },
    short(val) {
      return (val && val.length > 3) || "Значение слишком короткое";
    },
    isEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Введите корректный email";
    },
    submit() {
      if (this.register) {
        this.$refs.email.validate();
        this.$refs.username.validate();
        this.$refs.password.validate();
        this.$refs.repassword.validate();
      } else {
        this.$refs.email.validate();
        this.$refs.password.validate();
      }

      if (!this.register)
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.$q.notify({
            icon: "done",
            color: "positive",
            message: "Авторизация",
          });
        }
    },
    switchTypeForm() {
      this.register = !this.register;
      this.title = this.register ? "Новый пользователь" : "Авторизация";
      this.btnLabel = this.register ? "Регистрация" : "Вход";
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
  },
};
</script>
