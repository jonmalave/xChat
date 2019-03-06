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
            this.$xStorage.delete();            
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
    // init xStorage
    const storage = this.$xStorage.init('xStorage');
    if (storage !== null) {
      if (storage.user !== undefined) {
        this.$store.user = storage.user;
      }     
      console.log('xStorage initialized');
    }

    // get auth results
    this.$fireAuth.getRedirectResult().then(result => {
      if (result.credential) {
        this.$store.user.displayName = result.user.displayName;
        this.$store.user.email = result.user.email;
        this.$store.user.photoURL = result.user.photoURL;
        this.$store.user.uid = result.user.uid;                
        
        this.$xStorage.update({ 
          key: 'xStorage', 
          value: { 
            user: this.$store.user
          }
        });                   
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
  width: 100%;
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
  width: 100%;
  padding: 0 16px;
  z-index: 4;
}

/* Modifiers */
@media only screen and (min-width: 800px) {
  .content {
    padding: 0 48px;    
  } 
  .content--offset {
    width: calc(100% - 240px);
    margin-left: 240px;
  } 
}
</style>
