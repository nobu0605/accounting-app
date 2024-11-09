import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import styled from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { AccountTypeTableRows } from '@/features/report/financialReport/components/AccountTypeTableRows'
import {
  AccountTypeTotals,
  SectionTotals,
} from '@/features/report/financialReport/types/financialReports'

type Props = {
  accountTypeTotals: AccountTypeTotals
  sectionTotals: SectionTotals
}

export function FinancialReportTable({ accountTypeTotals, sectionTotals }: Props) {
  return (
    <Flex $direction='row' $gap={'30px'}>
      <StyledFinancialReportFlex $direction='column'>
        <h2>Balance Sheet</h2>
        {/* Assets */}
        <Flex $direction='row'>
          <Table>
            <TableBody>
              <AccountTypeTableRows
                accountTypeTitle={'Current Assets'}
                accountTotals={accountTypeTotals.currentAssets}
              />
              <AccountTypeTableRows
                accountTypeTitle={'Non Current Assets'}
                accountTotals={accountTypeTotals.nonCurrentAssets}
              />
              <StyledTableRow>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>{sectionTotals.assetTotal.toLocaleString()}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          {/* Liabilities and equity */}
          <Table>
            <TableBody>
              <AccountTypeTableRows
                accountTypeTitle={'Current Liabilities'}
                accountTotals={accountTypeTotals.currentLiabilities}
              />
              <AccountTypeTableRows
                accountTypeTitle={'Non Current Liabilities'}
                accountTotals={accountTypeTotals.nonCurrentLiabilities}
              />
              <AccountTypeTableRows
                accountTypeTitle={'Equity'}
                accountTotals={accountTypeTotals.equity}
              />
              <StyledTableRow>
                <StyledTableCell>Liabilities and Equity Total</StyledTableCell>
                <StyledTableCell>
                  {sectionTotals.liabilityEquityTotal.toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
              <TableRow>
                <StyledTableCell>Net Incom</StyledTableCell>
                <StyledTableCell>{sectionTotals.netIncome.toLocaleString()}</StyledTableCell>
              </TableRow>
              <StyledTableRow>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>
                  {(sectionTotals.liabilityEquityTotal + sectionTotals.netIncome).toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </Flex>
      </StyledFinancialReportFlex>
      <StyledFinancialReportFlex $direction='column'>
        <h2>Profit and Loss Statement</h2>
        <Table>
          <TableBody>
            <AccountTypeTableRows
              accountTypeTitle={'Sales'}
              accountTotals={accountTypeTotals.sales}
            />
            <AccountTypeTableRows
              accountTypeTitle={'Cost of Goods Sold'}
              accountTotals={accountTypeTotals.costOfGoodsSold}
            />
            <AccountTypeTableRows
              accountTypeTitle={'Selling General Admin Expenses'}
              accountTotals={accountTypeTotals.sellingGeneralAdminExpenses}
            />
            <AccountTypeTableRows
              accountTypeTitle={'Non Operating Income'}
              accountTotals={accountTypeTotals.nonOperatingIncome}
            />
            <AccountTypeTableRows
              accountTypeTitle={'Non Operating Expenses'}
              accountTotals={accountTypeTotals.nonOperatingExpenses}
            />
            <AccountTypeTableRows
              accountTypeTitle={'Special Income'}
              accountTotals={accountTypeTotals.specialIncome}
            />
            <AccountTypeTableRows
              accountTypeTitle={'Special Expenses'}
              accountTotals={accountTypeTotals.specialExpenses}
            />
            <StyledTableRow>
              <StyledTableCell>Net Incom</StyledTableCell>
              <StyledTableCell>{sectionTotals.netIncome.toLocaleString()}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </StyledFinancialReportFlex>
    </Flex>
  )
}

const StyledFinancialReportFlex = styled(Flex)`
  width: 50%;
`

const StyledTableCell = styled(TableCell)`
  border: 1px solid #dcdcdc;
`

const StyledTableRow = styled(TableRow)`
  background-color: #f5f5f5;
`
