<script setup lang="ts">
import { useBase64 } from '@vueuse/core';
import type { Ref } from 'vue';
import { useCopy } from '@/composable/copy';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';
import { useValidation } from '@/composable/validation';
import { isValidBase64 } from '@/utils/base64';

const base64Input = ref('');
const { t } = useI18n();
const { download } = useDownloadFileFromBase64({ source: base64Input });
const base64InputValidation = useValidation({
  source: base64Input,
  rules: [
    {
      message: t(`tools.base64-file-converter.invalid`, 'Invalid base 64 string'),
      validator: value => isValidBase64(value.trim()),
    },
  ],
});

function downloadFile() {
  if (!base64InputValidation.isValid) {
    return;
  }

  try {
    download();
  }
  catch (_) {
    //
  }
}

const fileInput = ref() as Ref<File>;
const { base64: fileBase64 } = useBase64(fileInput);
const { copy: copyFileBase64 } = useCopy({ source: fileBase64, text: t(`tools.base64-file-converter.copied`, 'Base64 string copied to the clipboard') });

async function onUpload(file: File) {
  if (file) {
    fileInput.value = file;
  }
}
</script>

<template>
  <c-card :title="$t('tools.base64-file-converter.base642file')">
    <c-input-text
      v-model:value="base64Input"
      multiline
      :placeholder="$t('tools.base64-file-converter.base642fileplaceholder')"
      rows="5"
      :validation="base64InputValidation"
      mb-2
    />

    <div flex justify-center>
      <c-button :disabled="base64Input === '' || !base64InputValidation.isValid" @click="downloadFile()">
       {{ $t('tools.base64-file-converter.downloadfile') }}
      </c-button>
    </div>
  </c-card>

  <c-card :title="$t('tools.base64-file-converter.file2base64')">
    <c-file-upload :title="$t('tools.base64-file-converter.fileuploadtitle')" @file-upload="onUpload" />
    <c-input-text :value="fileBase64" multiline readonly :placeholder="$t('tools.base64-file-converter.file2base64output')" rows="5" my-2 />

    <div flex justify-center>
      <c-button @click="copyFileBase64()">
        {{ $t('global.copy') }}
      </c-button>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(.n-upload-trigger) {
  width: 100%;
}
</style>
