<template>
  <div class="chat-room h-50vh bg-gray-100 rounded-lg shadow-lg overflow-hidden flex flex-col">
    <div class="messages flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <div
          v-for="(message) in messages"
          :key="message.id"
          class="message transition-opacity duration-300 ease-in-out"
      >
        <div
            :class="[
                    'flex items-end',
                    message.username === username ? 'justify-end' : 'justify-start'
                  ]"
        >
          <div
              :class="[
                        'max-w-xs mx-2 rounded-lg p-2',
                        message.username === username
                          ? 'bg-blue-300 text-white'
                          : 'bg-rose-300 text-white'
                      ]"
          >
            <p class="text-sm">
              <span class="font-semibold">{{ message.username }}:</span>
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 사용자 이름 입력 섹션 -->
    <template v-if="!isUsernameSet">
      <div class="username-input flex items-center p-2 bg-white border-t">
        <input
            v-model="usernameInput"
            placeholder="이름을 입력하세요..."
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="사용자 이름 입력"
        />
        <button
            :disabled="usernameInput.trim().length === 0"
            @click="setUsername"
            class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          시작
        </button>
      </div>
    </template>

    <!-- 채팅 화면 -->
    <template v-else>
      <div class="input-area flex items-center p-2 bg-white border-t">
        <button
            @click="resetUsername"
            class="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
        >
          <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
        </button>
        <input
            v-model="newMessage"
            placeholder="축하의 메시지를 남겨주세요..."
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="메시지 입력"
        />
        <button
            :disabled="newMessage.trim().length === 0"
            @click="sendMessage"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          전송
        </button>
      </div>
    </template>
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

const messagesRef = dbRef(db, 'messages');
const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(50));

// 사용자 이름 설정 함수
const setUsername = () => {
  if (usernameInput.value.length === 0) return;
  username.value = usernameInput.value.toString().trim();
  localStorage.setItem('username', username.value);
  isUsernameSet.value = true;
  focusInputField();
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
  nextTick(() => {
    const inputField = document.querySelector('.input-area input');
    if (inputField) {
      inputField.focus();
    }
  });
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
  @apply flex flex-col;
}

.messages {
  @apply flex-1 overflow-y-auto p-2;
}

.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.messages::-webkit-scrollbar-track {
  background-color: transparent;
}

.message {
  @apply mb-2;
}

.username-input {
  @apply flex;
}

.username-input input {
  @apply flex-1 p-2 text-base;
}

.username-input button {
  @apply p-2 text-base;
}

.input-area {
  @apply flex;
}

.input-area input {
  @apply flex-1 p-2 text-base;
}

.input-area button {
  @apply p-2 text-base;
}

</style>