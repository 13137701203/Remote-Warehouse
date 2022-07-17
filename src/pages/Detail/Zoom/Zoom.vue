<template>
  <div class="spec-preview">
    <img :src="skuInfo.skuDefaultImg" />
    <div class="event" @mousemove="enLarge" ref="event"></div>
    <div class="big">
      <img :src="skuInfo.skuDefaultImg" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: ['skuInfo'],
  mounted() {
    this.$bus.$on('sendBigImg', (index) => {
      this.skuInfo.skuDefaultImg = this.skuInfo.skuImageList[index].imgUrl
    })
    this.maskWidth = this.$refs.event.clientWidth / 2
  },
  methods: {
    enLarge(event) {
      const { offsetX, offsetY } = event
      let left = 0
      let top = 0
      left = offsetX - this.maskWidth / 2
      top = offsetY - this.maskWidth / 2
      if (left < 0) {
        left = 0
      } else if (left > this.maskWidth) {
        left = this.maskWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > this.maskWidth) {
        top = this.maskWidth
      }
      this.$refs.mask.style.left = left + 'px'
      this.$refs.mask.style.top = top + 'px'

      this.$refs.bigImg.style.left = -2 * left + 'px'
      this.$refs.bigImg.style.top = -2 * top + 'px'
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
