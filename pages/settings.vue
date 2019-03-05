<template>
  <!-- Content -->
  <div class="content content__chat" :class="scaleContent">
    <!-- Messages -->
    <div class="content__chat-message-container" ref="chat">
      <div 
        v-for="(message, index) in $store.chat.messages" 
        :key="index"
        class="content__chat-message">
        <img :src="message.profile" class="content__chat-message-profile"/>

        <div class="content__chat-message-name">
          {{ message.name }}
        </div>

        <div class="content__chat-message-message">
          {{ message.message }}
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="content__chat-input-container">
      <input 
      class="content__chat-input" 
      :disabled="allowInput"
      :placeholder="showPlaceholder" 
      v-model="$store.chat.input"
      @keyup.enter="send"
      @click="send">

      <div class="content__chat-input-button" @click="send">
        <i class="fa fa-paper-plane"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      $store: this.$store,
      $chat: ''
    };
  },
  computed: {
    $messages() {
      return this.$store.chat.messages;
    },
    allowSend() {
      return this.$store.user.uid ? true : false;
    },
    allowInput() {
      return !this.$store.user.uid ? true : false;
    },
    showPlaceholder() {
      return !this.$store.user.uid ? 'Sign In to Chat' : 'Aa';
    },
    scaleContent() {
      return this.$store.menu.show ? 'content__chat--offset' : '';
    }
  },
  methods: {
    send() {
      if (this.allowSend && this.$store.chat.input.trim() !== '') {
        const messageRef = this.$fireStore.collection('chat').doc();
        messageRef.set({
          name: this.$store.user.displayName,
          profile: this.$store.user.photoURL, 
          message: this.$store.chat.input,
          date: Date.now()
        });

        this.$store.chat.input = '';
        this.scroll();
      }
    },
    scroll() {
      this.$nextTick(()=> {
        this.$chat.scrollTo(0, this.$chat.scrollHeight);          
      });
    }     
  },
  mounted() {
    // set reference to chat element
    this.$chat = this.$refs.chat;

    // auto-scroll chat 
    this.scroll();

    // reset styles
    document.querySelector('main').style.height = '100vh';
    document.querySelector('html').style.overflowY = 'hidden';

    // track route path
    this.$store.route.path = this.$route.path;       
  },
  watch: {
    $messages(newVal, oldVal) {
      if (newVal) {
        this.scroll();
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    document.querySelector('main').style.height = '100%';
    document.querySelector('html').style.overflowY = 'initial';
    next();
  }  
};
</script>

<style>
/* Block Elements */
.content__chat {
  height: 100%;
  width: 100%;
  position: relative;
}
.content__chat-container {
  width: 100%;
  position: relative;
}
.content__chat-message-container {
  display: block;
  height: 100%;
  width: 100%;
  padding-bottom: 24px;  
  position: absolute;
  top: -16px;
  left: 0;
  overflow-x: hidden;
}
.content__chat-message {
  display: inline-flex;  
  height: auto;
  width: 100%;
  margin: 12px 0;
  position: relative;
}
.content__chat-message-profile {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.content__chat-message-name {
  font-size: 13px;
  font-weight: bold;
  color: #696969;
  position: absolute;
  top: 0;
  left: 48px;
}
.content__chat-message-message {
  display: inline-flex;
  width: 100%;
  font-size: 14px;
  color: black;
  padding: 20px 0 0 8px;
}
.content__chat-input-container {
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
  position: absolute;
  bottom: -8px;
  z-index: 5;
}
.content__chat-input {
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
.content__chat-input-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 32px;
  width: 32px;
  cursor: pointer;
}

/* Modifiers */
.content__chat--offset {
  width: 100%;
  margin-left: 0;    
} 

/* Media Queries */
@media only screen and (min-width: 512px) {   
  .content__chat--offset {
    width: calc(100% - 256px);
    margin-left: 256px;    
  } 
  .overlay--display {
    display: none;   
  }
}
</style>
