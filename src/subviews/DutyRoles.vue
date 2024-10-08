<script setup>
import MasterIcon from '@components/MasterIcon.vue'
import MasterHrLine from '@components/MasterHrLine.vue'
import useResponsibilitiesStore from '@src/stores/responsibilities.js'
import MasterPrintBreak from '@components/MasterPrintBreak.vue'

const responsibilities = useResponsibilitiesStore()
const devRnRs = responsibilities.getResponsibilities
</script>

<template>
  <div class="roles_resps">
    <div class="flex-between">
      <h1 class="section_title">Roles & Responsibilities</h1>
      <MasterIcon
        svgName="tasks-dark"
        size="medium"
        fillColor="var(--primary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="2px" />
    <div class="roles_resp_list">
      <span v-for="(item, idx) in devRnRs" :key="idx">
        {{ idx + 1 + '. ' + item }}
      </span>
    </div>
    <MasterHrLine margin-bottom="2rem" />
  </div>
  <MasterPrintBreak />
</template>

<style lang="scss" scoped>
.roles_resps {
  padding: 0 2rem;

  .roles_resp_list span {
    display: block;
    padding: px2rem(10);
    font-weight: bolder;
  }
}
</style>
