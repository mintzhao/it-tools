<script setup lang="ts">
import { parse as parseToml } from 'iarna-toml-esm';
import { stringify as stringifyToYaml } from 'yaml';
import { withDefaultOnError } from '../../utils/defaults';
import { isValidToml } from '../toml-to-json/toml.services';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();
const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => stringifyToYaml(parseToml(value)), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: isValidToml,
    message: t('tools.toml-to-yaml.invalidmessage'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="$t('tools.toml-to-yaml.inputlabel')"
    :input-placeholder="$t('tools.toml-to-yaml.inputplaceholder')"
    :output-label="$t('tools.toml-to-yaml.outputlabel')"
    output-language="yaml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
