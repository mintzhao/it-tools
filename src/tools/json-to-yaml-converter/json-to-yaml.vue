<script setup lang="ts">
import { stringify } from 'yaml';
import JSON5 from 'json5';
import type { UseValidationRule } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const transformer = (value: string) => withDefaultOnError(() => stringify(JSON5.parse(value)), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => value === '' || isNotThrowing(() => stringify(JSON5.parse(value))),
    message: t('tools.json-to-yaml-converter.invalidmessage'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="$t('tools.json-to-yaml-converter.inputlabel')"
    :input-placeholder="$t('tools.json-to-yaml-converter.inputplaceholder')"
    :output-label="$t('tools.json-to-yaml-converter.outputlabel')"
    output-language="yaml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
