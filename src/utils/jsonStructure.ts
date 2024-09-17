import yaml from "js-yaml";
import { isString, isObject, isArray } from "lodash-es";
export type JsonStructureSchema =
  | string
  | Array<string>
  | Array<[string, string[]]>;

type YamlStructureSchema = Array<string | Record<string, YamlStructureSchema>>;

export function parseJsonStructureSchema(structure: JsonStructureSchema) {
  const isYaml = isString(structure) && structure.trim().startsWith("-");

  if (isYaml) {
    const schema = yaml.load(structure, {
      schema: yaml.FAILSAFE_SCHEMA,
    }) as YamlStructureSchema;

    return schema.map((item) => {
      if (isObject(item)) {
        const [entries] = Object.entries(item);
        return entries;
      }

      return item;
    });
  }

  return structure;
}

export function getStructureSchema(
  obj: Record<string, unknown>
): Array<string | [string, string | string[]]> {
  const structure = [];

  for (let key in obj) {
    const value = obj[key];

    if (isArray(value)) {
      key += "*";
      const innerStructure = getStructureSchema(Object.assign({}, ...value));

      structure.push([key, innerStructure]);
      continue;
    }

    if (isObject(value)) {
      structure.push([
        key,
        getStructureSchema(value as Record<string, unknown>),
      ]);
      continue;
    }

    structure.push(key);
  }

  return structure as Array<string | [string, string | string[]]>;
}
