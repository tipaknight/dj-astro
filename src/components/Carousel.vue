<script setup>
import { ref } from 'vue';
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Cart from './Cart.vue';


const slides = ref([
  {
    id: 1,
    img: '/img/1-cart.jpg',
    town: 'Chandler, AZ',
    text: 'The Park at Wild Horse Pass',
    data: 'Apr 02 2021',
    linkUrl: '#',
    linkName: 'TICKETS'
  },
  {
    id: 2,
    img: '/img/2-cart.jpg',
    town: 'Ibiza, IBZ',
    text: 'Swag Ibiza Club',
    data: 'Jul 08 2021',
    linkUrl: '#',
    linkName: 'TICKETS'
  },
  {
    id: 3,
    img: '/img/3-cart.jpg',
    town: 'Ibiza, IBZ',
    text: 'El Swing Ibiza',
    data: 'Jul 10 2021',
    linkUrl: '#',
    linkName: 'TICKETS'
  },
  {
    id: 4,
    img: '/img/1-cart.jpg',
    town: 'Chandler, AZ',
    text: 'The Park at Wild Horse Pass',
    data: 'Apr 02 2021',
    linkUrl: '#',
    linkName: 'TICKETS'
  },
  {
    id: 5,
    img: '/img/2-cart.jpg',
    town: 'Ibiza, IBZ',
    text: 'Swag Ibiza Club',
    data: 'Jul 08 2021',
    linkUrl: '#',
    linkName: 'TICKETS'
  },
]);

const breakpoints = ref({
  settings: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  760: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'start'
  }
});
</script>
<template>
  <section class="section section-carousel"><div class="container" id="tours">
  <Carousel :settings="settings" :wrap-around="true" :breakpoints="breakpoints" client:only="vue">
    <Slide v-for="slide in slides" :key="slide.id" client:load>
      <div class="carousel__item">
        <Cart :img="true" :srcImg="slide.img" :town="slide.town" :text="slide.text" :data="slide.data" :linkName="slide.linkName" :linkUrl="slide.linkUrl" client:load></Cart>
      </div>
    </Slide>
    <template #addons>
      <Navigation client:load/>
    </template>
  </Carousel>
</div></section>

</template>
<style scoped>
.section-carousel {
  padding: 30px 0 60px;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--carousel-color-primary);
  color: var(--carousel-color-white);
  /* font-size: 20px;
  border-radius: 8px; */
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
<style>
.carousel__slide {
  padding: 20px;

}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 1px solid var(--white);
  border-radius: 8px 0 8px 0;
  color: var(--white);
}

.carousel__prev:hover,
.carousel__next:hover {
  color: var(--danube);
}
</style>