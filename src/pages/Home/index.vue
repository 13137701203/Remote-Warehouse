<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Brand></Brand>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },

  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor,
  },

  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },

  mounted() {
    this.$store.dispatch('getFloorList')
  },

  methods: {},
}
</script>
<style lang="less" scoped></style>
