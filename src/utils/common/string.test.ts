import { camelToLowerWithSpaces } from '@/utils/common/string'

describe('camelToLowerWithSpaces', () => {
  test('Lower camel case', () => {
    let costOfGoodsSold = 'costOfGoodsSold'
    costOfGoodsSold = camelToLowerWithSpaces(costOfGoodsSold)
    expect(costOfGoodsSold).toEqual('cost of goods sold')
  })

  test('Upper camel case', () => {
    let CostOfGoodsSold = 'CostOfGoodsSold'
    CostOfGoodsSold = camelToLowerWithSpaces(CostOfGoodsSold)
    expect(CostOfGoodsSold).toEqual('cost of goods sold')
  })

  test('snake case', () => {
    let cost_of_goods_sold = 'cost_of_goods_sold'
    cost_of_goods_sold = camelToLowerWithSpaces(cost_of_goods_sold)
    expect(cost_of_goods_sold).toEqual('cost_of_goods_sold')
  })
})
