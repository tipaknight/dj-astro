<script setup>
const props = defineProps({
  img: {
    type: Boolean,
    required: false
  },
  srcImg: {
    type: String,
    required: false
  },
  town: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  data: {
    type: String,
    required: false
  },
  linkUrl: {
    type: String,
    required: false
  },
  linkName: {
    type: String,
    required: false
  }

}

)


</script>
<template>
  <div class="cart">
    <slot v-if="!img" client:load></slot>
<img class="cart-img" v-else :src="srcImg" alt="" >
<span class="town" v-if="town">{{ town }}</span>
<span class="text" v-if="text">{{ text }}</span>
<div class="cart-ticket">
  <span class="data" v-if="data">{{ data }}</span>
  <a class="link" :href="linkUrl" v-if="linkName">{{ linkName }}</a>
</div>
  </div>

</template>
<style>
.cart {
  display: block;
  background-color: #2F2B2B;
  border-radius: 30px 0 30px 0;
  width: 250px;

}

.cart-ticket {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-img {
  display: block;
  border-radius: 30px 0 30px 0;
  width: 250px;
}

.town {
  display: block;
  text-align: left;
  padding: 15px 5px 10px 25px;
  font-weight: bold;
  font-size: 16px;
  color: rgb(255, 255, 255, 0.5);
}

.text {
  display: block;
  text-align: left;
  padding: 0 5px 15px 25px;
  font-size: 16px;
  font-weight: 500;
}

.data {
  padding: 15px 5px 10px 25px;
  font-weight: bold;
  font-size: 14px;
  color: rgb(255, 255, 255, 0.5);
}

.link {
  text-decoration: none;
  background-color: #7A66CC;
  border-radius: 30px 0 30px 0;
  padding: 10px 30px;
  font-family: 'Helvetica';
  font-size: 12px;
  color: white;
}
</style>