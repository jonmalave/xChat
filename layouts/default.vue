<template>
  <!-- Main -->
  <main>
    <!-- Navbar -->
    <navbar
      :title="$store.site.title"
      :logo="$store.site.logo"
      :toggleMenuOn="true"
      :socialEnabled="true" 
      @action="action"/>

    <!-- Menu -->
    <navmenu 
      v-if="$store.menu.show"
      :title="$store.site.title"
      :logo="$store.site.logo"
      :toggleMenuOn="true"      
      @action="action"/>

    <!-- Overlay -->
    <overlay/>

    <!-- Content -->
    <nuxt/>
  </main>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Navmenu from '~/components/Navmenu.vue';
import Overlay from '~/components/Overlay.vue';

export default {
  components: {
    Navbar,
    Navmenu,
    Overlay
  },
  data() {
    return {
      $store: this.$store
    };
  },
  computed: {
  },
  methods: {
    action(payload) {
      switch(payload.type) {
        case 'route':
          $nuxt._router.push(payload.value);
          break;
        case 'login':
          this.$fireAuth.signInWithRedirect(this.$googleAuth);
          break;
        case 'logout':
          this.$fireAuth.signOut().then(() => {
            this.$store.user = {};
            console.log('Sign-out successful.');
          }).catch(error => {
            console.log(error);
          });
          break;          
        default:
      }
    }
  },
  mounted() {
    // get auth results
    this.$fireAuth.getRedirectResult().then(result => {
      if (result.credential) {
        this.$store.user = result.user;           
        console.log('Sign-in successful.');   
      }
    }).catch(error => {
      console.log(error);
    });

    // listen for chat updates
    this.$fireStore.collection('chat').orderBy('date')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          this.$store.chat.messages.push(change.doc.data());
        }
        if (change.type === 'modified') {
        }
        if (change.type === 'removed') {
          this.$store.chat.messages = [];
        }
      });
    });      

    // track route path
    this.$store.route.path = this.$route.path;   
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal && window.innerWidth < 1280) {
        this.$store.menu.show = false;
      }
    }
  }
};
</script>

<style>
/* Block Elements */
* {
  text-decoration: none;
  box-sizing: border-box;
  margin: 0;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #494b4b;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-x: hidden;  
  user-select: none;
}
hr {
  border-width: 0.5px;
  border-color: #e0e0e0;
  margin: 16px 0 8px 0;      
}
main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 72px 8px 8px 8px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
}
.content__section {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content__section-grid {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.content__section-article {
  font-size: 14px;
  width: 100%;
  padding: 0 16px;
}
.content__section-article-title {
  font-size: 22px;
  font-weight: bold;
  padding: 8px 0;  
}
.content__section-article-details {
  font-weight: normal;
}
.content__section-article-notice {
  display: initial;
}

/* Modifiers */
.content__section--margin {
  margin-top: 32px;
}
.footer--display {
  display: none;
}

/* Media Queries */
@media only screen and (min-width: 512px) {  
  .footer--offset {
    margin-left: 240px;
  }  
  .content {
    width: 492px;
  }
  .content--offset {
    margin-left: 256px;    
  }  
}
@media only screen and (min-width: 1024px) {
  .content {
    width: 800px;
  }
}
@media only screen and (min-width: 1104px) {
  .content {
    width: 1056px;
  }
}
@media only screen and (min-width: 1280px) {
  .content {
    width: 1256px;
  }
  .content--offset {
    width: 1056px !important;
    margin-left: 256px;
  }        
}
</style>
