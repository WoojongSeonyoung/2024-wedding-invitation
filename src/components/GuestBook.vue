<template>
  <section>
    <button @click="saveComment">
      글 추가
    </button>
    <QuoteCard v-for="(comment, index) in comments" :key="index" :title="comment.title" :content="comment.content"/>
  </section>
</template>

<script setup>
import db from "@/api/dataService.js";
import {ref} from 'vue';
import {ref as dbRef, onValue, push, set} from 'firebase/database';
import QuoteCard from "@/components/QuoteCard.vue";

const comments = ref([]);

const commentsRef = dbRef(db, 'comments');
onValue(commentsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    // 데이터를 배열로 변환
    comments.value = Object.values(data);
  } else {
    comments.value = [];
  }
});

const saveComment = () => {
  console.log('saveComment');
  const title = '제목';
  const content = '내용';

  // Firebase Realtime Database에 댓글 저장
  const newCommentRef = push(dbRef(db, 'comments'));
  set(newCommentRef, {
    title: title,
    content: content
  })
      .then(() => {
        console.log('댓글이 성공적으로 저장되었습니다.');
      })
      .catch((error) => {
        console.error('댓글 저장 실패:', error);
      });
};

</script>

<style scoped lang="postcss">

</style>