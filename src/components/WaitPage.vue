<template>
  <div class="wait-page">
    <!--div class="wait-image"><img src="/static/svgs/testimage.svg"></div-->
    <div class="bars">
      <div class="yellow"></div>
      <div class="orange"></div>
      <div class="red"></div>
      <div class="purple"></div>
      <div class="turquoise"></div>
      <div class="green"></div>
    </div>
    <div class="wait">
      <div class="lds-heart">
        <div></div>
      </div>
      <div class="message">{{ $t("WaitPage.waitMessage") }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitPage",
  props: {},
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wait {
  padding: 20px;
  display: flex;
  align-items: center;
}

.message {
    padding-left: 20px;
}

.bars {
  flex: 1 0 100%;
  height: 18px;
  display: flex;
  flex-wrap: nowrap;
}

.lds-heart {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  transform-origin: 32px 32px;
}

.lds-heart div {
  top: 23px;
  left: 19px;
  position: absolute;
  width: 26px;
  height: 26px;
  background: var(--main-red);
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}

.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  background: var(--main-red);
}

.lds-heart div:before {
  left: -17px;
  border-radius: 50% 0 0 50%;
}

.lds-heart div:after {
  top: -17px;
  border-radius: 50% 50% 0 0;
}

@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
