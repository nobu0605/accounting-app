export type Menu = {
  name: string
  path: string
}

export type Company = {
  id: number
  name: string
  industryClass: string | null
  numberOfEmployees: number | null
  foundedDate: Date
  accountingTerm: number
}
