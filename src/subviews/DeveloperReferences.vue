<script setup>
import MasterHrLine from '@components/MasterHrLine.vue'
import MasterIcon from '@components/MasterIcon.vue'
import MasterPrintBreak from '@components/MasterPrintBreak.vue'

defineProps({
  devRefs: {
    default: () => [],
    type: Array
  },
  sectionTitle: {
    default: '',
    type: String
  }
})
</script>

<template>
  <div class="personal_details dev_refs">
    <div class="flex-between">
      <h3 class="section_title">{{ sectionTitle }}</h3>
      <MasterIcon
        svgName="friends"
        size="medium"
        fillColor="var(--secondary-icon)"
        hoverColor="var(--themed-icon)"
      />
    </div>
    <MasterHrLine thickness="1px" hrColor="var(--glob-light)" />
    <div class="refs_details">
      <div class="refs_line" v-for="(refdetail, idx) in devRefs" :key="idx">
        <h4 class="section_title">{{ refdetail.ref_name }}</h4>
        <div class="role_company">
          <span class="ref_role">{{ refdetail.ref_role }}</span>
          <span class="ref_company">{{ refdetail.ref_company }}</span>
        </div>
        <MasterHrLine
          thickness="1px"
          styleType="solid"
          hrColor="var(--glob-dark)"
          margin-top="0.5rem"
          margin-bottom="0.5rem"
        />
        <span class="ref_mobile">
          <MasterIcon
            svgName="phone-call"
            size="x-small"
            fillColor="var(--primary-icon)"
            hoverColor="var(--themed-icon)"
          />
          {{ refdetail.ref_mobile }}
        </span>
        <span class="ref_email">
          <MasterIcon
            svgName="email-small"
            size="x-small"
            fillColor="var(--primary-icon)"
            hoverColor="var(--themed-icon)"
          />
          {{ refdetail.ref_email }}
        </span>
      </div>
    </div>
    <MasterPrintBreak />
  </div>
</template>

<style lang="scss" scoped>
.dev_refs {
  .refs_details {
    display: flex;
    flex-direction: column;
    margin: 0.625rem 0;
    gap: 1rem;

    .refs_line {
      background-color: var(--theme-color);
      color: var(--text-default);
      padding: px2rem(10);

      .section_title {
        padding-left: 0;
      }
      .role_company {
        .ref_role,
        .ref_company {
          display: inline-flex;
        }

        .ref_role {
          @include verticalBar();
        }
      }

      .ref_mobile,
      .ref_email {
        display: flex;
        gap: px2rem(10);
        padding: 2px 0;
      }
    }
  }
}
</style>
