<script setup></script>

<template>
  <main class="main_template">
    <div class="main_sidebar">
      <slot name="sidebar"> </slot>
    </div>
    <div class="main_content">
      <slot name="content"></slot>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main_template {
  display: flex;

  @mixin commonCode {
    position: relative;
    flex: 1 0 auto;
    height: auto;
    padding-bottom: 2rem;
  }
  .main {
    &_sidebar {
      @include commonCode();
      display: flex;
      flex-direction: column;
      width: calc(30vw);
      background: var(--sidebar-bg-color);
      color: var(--sidebar-txt-color);
    }

    &_content {
      @include commonCode();
      display: block;
      width: calc(70vw);
      background: var(--bg-color);
      color: var(--item-color);
    }
  }
}

@include mediaQuery(mobile) {
  .main_template {
    flex-direction: column;

    .main {
      &_sidebar,
      &_content {
        width: calc(100vw);
      }
    }
  }
}
</style>
