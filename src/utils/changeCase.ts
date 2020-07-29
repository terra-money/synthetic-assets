import { is } from "ramda"
import { snakeCase, camelCase } from "lodash"

export const toSnakeCase = <T>(obj: T): T =>
  is(Object, obj) && !Array.isArray(obj)
    ? (Object.entries(obj).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [snakeCase(key)]: toSnakeCase(value),
        }),
        {}
      ) as T)
    : obj

export const toCamelCase = <T>(obj: T): T =>
  is(Object, obj) && !Array.isArray(obj)
    ? (Object.entries(obj).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [camelCase(key)]: toCamelCase(value),
        }),
        {}
      ) as T)
    : obj
