export type GraphValue = {
  name: string
  y: number
}

export type Ratio = {
  name: string
  ratio: number
}

export type ReportType = {
  equityRatio: Ratio[]
  assets: Ratio[]
  operatingProfitMargin: Ratio[]
}
