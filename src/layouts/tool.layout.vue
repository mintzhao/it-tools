<script lang="ts" setup>
import ToolCard from "@/components/ToolCard.vue";
import {useToolStore} from "@/tools/tools.store";
import {Home2} from "@vicons/tabler";
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();
const { t } = useI18n();
const toolStore = useToolStore();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
const toolKeywords = computed<string>(() => t(`tools.${i18nKey.value}.keywords`, ((route.meta.keywords ?? []) as string[]).join(',')));
const relatedTools = computed<[]>(() => toolStore.filterToolsByPaths(route.meta.relatedToolPaths ?? []));

const head = computed<HeadObject>(() => ({
  title: `${toolTitle.value} - Toolify Lab`,
  meta: [
    {
      name: 'description',
      content: `${toolDescription.value}`,
    },
    {
      name: 'keywords',
      // content: ((route.meta.keywords ?? []) as string[]).join(','),
      content: `${toolKeywords.value}`,
    },
  ],
}));
useHead(head);
</script>

<template>
  <BaseLayout>
    <div class="tool-layout">
      <div class="tool-header">
        <div flex flex-nowrap items-center justify-between>
          <n-h1>
            {{ toolTitle }}
          </n-h1>

          <div>
            <FavoriteButton :tool="{ name: route.meta.name } as Tool" />
            <c-tooltip :tooltip="$t('home.home')">
              <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
                <NIcon size="25" :component="Home2" />
              </c-button>
            </c-tooltip>
          </div>
        </div>

        <div class="separator" />

        <div class="description">
          {{ toolDescription }}
        </div>
      </div>
    </div>

    <div class="tool-content">
      <slot />
    </div>

    <div v-if="relatedTools.length > 0" style="margin-top: 40px">
      <n-h3>{{ $t('global.relatedtools') }}</n-h3>
      <n-grid x-gap="12" y-gap="12" cols="1 400:2 800:3 1200:4 2000:8">
        <n-gi v-for="tool in relatedTools" :key="tool.name">
          <transition>
            <ToolCard :tool="tool" />
          </transition>
        </n-gi>
      </n-grid>
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  ::v-deep(& > *) {
    flex: 0 1 600px;
  }
}

.tool-layout {
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

  .tool-header {
    padding: 40px 0;
    width: 100%;

    .n-h1 {
      opacity: 0.9;
      font-size: 40px;
      font-weight: 400;
      margin: 0;
      line-height: 1;
    }

    .separator {
      width: 200px;
      height: 2px;
      background: rgb(161, 161, 161);
      opacity: 0.2;

      margin: 10px 0;
    }

    .description {
      margin: 0;

      opacity: 0.7;
    }
  }
}
</style>
