<script setup lang="ts">
import { stringify as stringifyToml } from 'iarna-toml-esm';
import { parse as parseYaml } from 'yaml';
import { withDefaultOnError } from '../../utils/defaults';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();
const convertYamlToToml = (value: string) => [stringifyToml(parseYaml(value))].flat().join('\n').trim();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => convertYamlToToml(value), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || parseYaml(v),
    message: t('tools.yaml-to-toml.invalidmessage'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="$t('tools.yaml-to-toml.inputlabel')"
    :input-placeholder="$t('tools.yaml-to-toml.inputplaceholder')"
    :output-label="$t('tools.yaml-to-toml.outputlabel')"
    output-language="toml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
