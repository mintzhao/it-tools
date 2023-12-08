<script setup lang="ts">
import { parse as parseToml } from 'iarna-toml-esm';
import { withDefaultOnError } from '../../utils/defaults';
import { isValidToml } from './toml.services';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();
const transformer = (value: string) => value === '' ? '' : withDefaultOnError(() => JSON.stringify(parseToml(value), null, 3), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: isValidToml,
    message: t('tools.toml-to-json.invalidmessage'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="$t('tools.toml-to-json.inputlabel')"
    :input-placeholder="$t('tools.toml-to-json.inputplaceholder')"
    :output-label="$t('tools.toml-to-json.outputlabel')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
