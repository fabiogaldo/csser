import { useMemo, useState } from 'react';
import type { Template, TemplateParam } from '../types/template';

type ParamValue = string | number | boolean;

interface UseTemplateParamsResult {
  paramValues: Record<string, ParamValue>;
  cssVars: Record<string, string>;
  handleChange: (param: TemplateParam, value: ParamValue) => void;
  resetToDefaults: () => void;
}

function buildInitialValues(template: Template): Record<string, ParamValue> {
  const initial: Record<string, ParamValue> = {};
  for (const param of template.params) {
    if (param.defaultValue !== undefined) {
      initial[param.id] = param.defaultValue;
    }
  }
  return initial;
}

export function useTemplateParams(template: Template): UseTemplateParamsResult {
  const [paramValues, setParamValues] = useState<Record<string, ParamValue>>(() =>
    buildInitialValues(template)
  );

  function handleChange(param: TemplateParam, value: ParamValue) {
    setParamValues((prev) => ({
      ...prev,
      [param.id]: value
    }));
  }

  function resetToDefaults() {
    setParamValues(buildInitialValues(template));
  }

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};

    for (const param of template.params) {
      if (!param.cssVar) continue;
      const raw = paramValues[param.id];
      if (raw === undefined) continue;

      let formatted: string;

      if (param.type === 'number') {
        const num = typeof raw === 'number' ? raw : Number(raw);
        if (Number.isNaN(num)) continue;
        formatted = param.unit ? `${num}${param.unit}` : String(num);
      } else if (param.type === 'boolean') {
        formatted = raw ? '1' : '0';
      } else {
        formatted = String(raw); // color, select etc.
      }

      vars[param.cssVar] = formatted;
    }

    return vars;
  }, [template, paramValues]);

  return {
    paramValues,
    cssVars,
    handleChange,
    resetToDefaults
  };
}
