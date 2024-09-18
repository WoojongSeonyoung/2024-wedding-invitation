<template>
  <div class="chat-room">
    <div class="messages" ref="messagesContainer">
      <div
          v-for="(message, index) in messages"
          :key="message.id"
          class="message"
      >
        <span class="username">{{ message.username }}:</span>
        <span class="text">{{ message.text }}</span>
      </div>
    </div>

    <!-- 사용자 이름 입력 섹션 -->
    <div v-if="!isUsernameSet" class="username-input">
      <input
          v-model="usernameInput"
          @keyup.enter="setUsername"
          placeholder="채팅을 시작하려면 이름을 입력해주세요."
          aria-label="사용자 이름 입력"
      />
      <button :disabled="usernameInput.trim().length === 0" @click="setUsername">채팅 시작</button>
    </div>

    <!-- 채팅 화면 -->
    <div v-else>
      <div class="input-area">
        <div class="reset-username">
          <button @click="resetUsername">이름 변경</button>
        </div>
        <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="축하 메시지를 입력하세요..."
            aria-label="메시지 입력"
        />
        <button :disabled="newMessage.trim().length === 0" @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch, nextTick} from 'vue';
import db from "@/api/dataService.js";
import {
  ref as dbRef,
  onChildAdded,
  push,
  query,
  orderByChild,
  limitToLast, onValue,
} from 'firebase/database';

const messages = ref([]);
const newMessage = ref('');

// 사용자 이름 관련 상태 변수
const usernameInput = ref('');
const username = ref('');
const isUsernameSet = ref(false);

// 'messages' 노드 참조
const messagesRef = dbRef(db, 'messages');

// 최신 메시지 100개를 가져오는 쿼리 생성
const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(50));

// 사용자 이름 설정 함수
const setUsername = () => {
  if (usernameInput.value.length === 0) return;
  username.value = usernameInput.value.toString().trim();
  localStorage.setItem('username', username.value);
  isUsernameSet.value = true;
};

const resetUsername = () => {
  username.value = '';
  usernameInput.value = '';
  isUsernameSet.value = false;
  localStorage.removeItem('username');
  focusUsernameInput();
};

// 메시지 전송 함수
const sendMessage = () => {
  if (newMessage.value.length === 0) return;

  const messageData = {
    username: username.value,
    text: newMessage.value,
    timestamp: Date.now(), // 서버 시간을 사용할 수 없으므로 클라이언트 시간을 사용
  };

  // 새로운 메시지를 데이터베이스에 추가
  push(messagesRef, messageData)
      .then(() => {
        newMessage.value = '';
        focusInputField();
      })
      .catch((error) => {
        console.error('메시지 전송 오류:', error);
      });
};

watch(messages, () => {
  scrollToBottom();
});

let unsubscribe;

// 새로운 메시지 수신
onMounted(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    username.value = storedUsername;
    isUsernameSet.value = true;
  }

  unsubscribe = onChildAdded(messagesQuery, (data) => {
    const message = data.val();
    message.id = data.key;
    messages.value.push(message);
    // 스크롤을 맨 아래로 이동
    scrollToBottom();
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const messagesContainer = ref(null);

// 스크롤을 맨 아래로 이동하는 함수
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  })
};

const focusInputField = () => {
  const inputField = document.querySelector('.input-area input');
  if (inputField) {
    inputField.focus();
  }
};

const focusUsernameInput = () => {
  nextTick(() => {
    const usernameInputField = document.querySelector('.username-input input');
    if (usernameInputField) {
      usernameInputField.focus();
    }
  });
};
</script>

<style scoped lang="postcss">
.chat-room {
  display: flex;
  flex-direction: column;
  height: 50vh;
}

.username-input {
  display: flex;
}

.username-input input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

.username-input button {
  padding: 10px;
  font-size: 16px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  margin-right: 5px;
}

.input-area {
  display: flex;
}

.input-area input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

.input-area button {
  padding: 10px;
  font-size: 16px;
}

.reset-username {
  display: flex;
}

.reset-username button {
  padding: 10px;
  font-size: 16px;
}
</style>