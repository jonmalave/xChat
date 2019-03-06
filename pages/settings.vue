<template>
  <!-- Content -->
  <div class="settings" :class="scaleContent">
    <!-- Section -->
    <section class="settings__section">
      <p class="settings__section-title">
        DisplayName
      </p>

      <!-- Input -->
      <div class="settings__input-container">
        <input 
        class="settings__input" 
        :disabled="allowInput"
        v-model="$store.user.displayName"
        @keyup="save">
      </div>       
    </section>

    <!-- Section -->
    <section class="settings__section">
      <p class="settings__section-title">
        E-Mail
      </p>

      <!-- Input -->
      <div class="settings__input-container">
        <input 
        class="settings__input" 
        :disabled="allowInput"
        v-model="$store.user.email"
        @keyup="save">
      </div>       
    </section>

    <!-- Section -->
    <section class="settings__section">
      <p class="settings__section-title">
        PhotoURL
      </p>

      <!-- Input -->
      <div class="settings__input-container">
        <input 
        class="settings__input" 
        :disabled="allowInput"
        v-model="$store.user.photoURL"
        @keyup="save">
      </div>       
    </section>

    <!-- Section -->
    <section class="settings__section">
      <p class="settings__section-title">
        UID
      </p>

      <!-- Input -->
      <div class="settings__input-container">
        <input 
        class="settings__input" 
        :disabled="true"
        v-model="$store.user.uid">
      </div>       
    </section>                       
  </div>
</template>

<script>
export default {
  data() {
    return {
      $store: this.$store
    };
  },
  computed: {
    scaleContent() {
      return this.$store.menu.show ? 'settings--offset' : '';
    },
    allowInput() {
      return !this.$store.user.uid ? true : false;
    }    
  },
  methods: {
    save() {
      this.$xStorage.update({ 
        key: 'xStorage', 
        value: { 
          user: this.$store.user
        }
      });       
    }
  },
  mounted() {
  }  
};
</script>

<style>
/* Block Elements */
.settings {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.settings__section {
  height: 100px;
  width: 100%;
  padding: 0 10px;
}
.settings__section-title {
  font-size: 22px;
  font-weight: bold;
  padding: 8px 0;  
}
.settings__input-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  width: 100%;
  background-color: white;
  border-radius: 4px 0 0 4px;
  border-width: 0;
  border-style: solid;
  border-color: #979897;
  z-index: 5;
}
.settings__input {
  font-size: 16px;
  color: #494b4b;
  height: 32px;
  width: 100%;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #979897;
  box-sizing: border-box;
  outline: none;
  padding: 8px;
}

/* Modifiers */
@media only screen and (min-width: 512px) {
  .settings__section {
    width: 312px;
  }  
  .settings--offset {
    width: calc(100% - 240px);
    margin-left: 240px;
  }        
}
</style>
