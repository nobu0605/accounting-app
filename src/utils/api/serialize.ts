export const serializeBigInt = <T>(obj: T) => {
  return JSON.parse(
    JSON.stringify(obj, (_, value) => (typeof value === 'bigint' ? Number(value) : value)),
  )
}
