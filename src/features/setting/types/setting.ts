export type Menu = {
  name: string
  path: string
}

export type Company = {
  name: string
  industryClass: string | null
  numberOfEmployees: number | null
  foundedDate: Date
  accountingTerm: number
}
