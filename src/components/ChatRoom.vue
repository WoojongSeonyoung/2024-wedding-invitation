<template>
  <div class="chat-room">
    <div class="messages" ref="messagesContainer">
      <div
          v-for="(message) in messages"
          :key="message.id"
          class="message transition-opacity duration-300 ease-in-out"
      >
        <div
            :class="[
                    'flex',
                    message.username === username
                      ? 'justify-end'
                      : 'justify-start'
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
            <p class="text-sm whitespace-pre-wrap">
              <span class="font-semibold">{{ message.username }}:</span>
              <br/>
              <span>{{ message.text }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 사용자 이름 입력 영역 -->
    <template v-if="!isUsernameSet">
      <div class="username-input">
        <input
            v-model="usernameInput"
            placeholder="이름을 입력하세요..."
            aria-label="사용자 이름 입력"
        />
        <button
            :disabled="usernameInput.trim().length === 0"
            @click="setUsername"
            class="bg-green-500"
        >
          시작
        </button>
      </div>
    </template>

    <!-- 채팅 입력 영역 -->
    <template v-else>
      <div class="input-area">
        <div
            @click="resetUsername"
            class="text-gray-500 hover:text-gray-900 focus:outline-none mr-2 flex-shrink-0"
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
        </div>
        <textarea
            v-model="newMessage"
            placeholder="축하의 메시지를 남겨주세요..."
            aria-label="메시지 입력"
            @input="autoResizeTextarea"
            rows="1"
            ref="messageTextarea"
        />
        <button
            :disabled="newMessage.trim().length === 0"
            @click="sendMessage"
            class="bg-blue-500"
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
  limitToLast,
} from 'firebase/database';

const messages = ref([]);
const newMessage = ref('');

const usernameInput = ref('');
const username = ref('');
const isUsernameSet = ref(false);

const messagesRef = dbRef(db, 'messages');
const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(200));

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

const sendMessage = () => {
  if (newMessage.value.length === 0) return;

  const messageData = {
    username: username.value,
    text: newMessage.value,
    timestamp: Date.now(),
  };
  console.log(messageData);

  push(messagesRef, messageData)
      .then(() => {
        newMessage.value = '';
        nextTick(() => {
          autoResizeTextarea();
        });
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
    scrollToBottom();
  });

  nextTick(() => {
    autoResizeTextarea();
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const messageTextarea = ref(null);

const autoResizeTextarea = () => {
  const textarea = messageTextarea.value;
  if (textarea) {
    textarea.style.height = 'auto'; // 높이 초기화
    textarea.style.height = textarea.scrollHeight + 'px'; // 내용에 맞게 높이 조절
  }
}

const messagesContainer = ref(null);

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
  @apply flex flex-col h-60vh bg-gray-100 rounded-lg shadow-lg overflow-hidden;
}

.messages {
  @apply overflow-y-auto p-2 space-y-4;
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

.username-input,
.input-area {
  @apply flex items-center p-2 bg-white border-t;
}

.username-input input {
  @apply flex-1 min-w-0 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.input-area textarea {
  @apply flex-1 min-w-0 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
  height: auto;
  min-height: 2.5rem;
  resize: none;
  overflow-y: hidden;
}

.username-input button,
.input-area button {
  @apply ml-2 px-4 py-2 text-white rounded-lg hover:bg-opacity-80 disabled:opacity-50 flex-shrink-0;
}
</style>