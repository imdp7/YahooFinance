import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { key, host } from '../../api';
import {
  SegmentedControl,
  SpaceBetween,
  Table,
  Box,
  Button,
  TextFilter,
  Header,
  Link,
  Pagination,
  CollectionPreferences,
} from '@cloudscape-design/components';
import {
  visibleIncomeColumns,
  visibleBalanceSheetColumns,
  columnDefinitionsBalanceSheet,
  columnDefinitionsIncome,
  visibleCashFlowColumns,
  columnDefinitionsCashFlow,
  incomePreferences,
  balanceSheetPreferences,
  cashFlowPreferences,
} from './common/Table';
import * as XLSX from 'xlsx';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';

const BASE_URL = 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials?';
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

function Financials({ symbol, loadHelpPanelContent }) {
  const [financials, setFinancials] = useState([]);
  const [statementId, setStatementId] = React.useState('seg-1');
  const [subStatementId, setSubStatementId] = React.useState('sub-1');
  const fetchFinancials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}symbol=${symbol}${KEY_URL}`);
      const fin = response?.data;
      setFinancials(fin);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchFinancials();
  }, []);
  const downloadExcel = (name, visibleColumns) => {
    const sheetName = name;
    const headers = visibleColumns;
    // const data =
    //   financials?.incomeStatementHistory?.incomeStatementHistory?.map(
    //     (item) => [convertUnixTimestamp(item.date), item.netIncome]
    //   );
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  };
  return (
    <SpaceBetween size="s">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SegmentedControl
          selectedId={statementId}
          onChange={({ detail }) => setStatementId(detail.selectedId)}
          label="Default segmented control"
          options={[
            { text: 'Income Statement', id: 'seg-1' },
            { text: 'Balance Sheet', id: 'seg-2' },
            { text: 'Cash flow', id: 'seg-3' },
          ]}
        />
        <div>
          <SegmentedControl
            selectedId={subStatementId}
            onChange={({ detail }) => setSubStatementId(detail.selectedId)}
            label="Default segmented control"
            options={[
              { text: 'Annual', id: 'sub-1' },
              { text: 'Quaterly', id: 'sub-2' },
            ]}
          />
          {/* <Button
            iconName="download"
            variant="primary"
            onClick={downloadExcel('Financials', visibleIncomeColumns)}
          >
            Download
          </Button> */}
        </div>
      </div>
      {statementId == 'seg-1' && subStatementId == 'sub-1' && (
        <TableIncome
          data={financials?.incomeStatementHistory?.incomeStatementHistory}
          title="Income Statement Annually"
          visibleColumns={visibleIncomeColumns}
          columnDefinitions={columnDefinitionsIncome}
          preference={incomePreferences}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      )}
      {statementId == 'seg-1' && subStatementId == 'sub-2' && (
        <TableIncome
          data={
            financials?.incomeStatementHistoryQuarterly?.incomeStatementHistory
          }
          title="Income Statement Quaterly"
          visibleColumns={visibleIncomeColumns}
          columnDefinitions={columnDefinitionsIncome}
          preference={incomePreferences}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      )}
      {statementId == 'seg-2' && subStatementId == 'sub-1' && (
        <TableIncome
          data={financials?.balanceSheetHistory?.balanceSheetStatements}
          title="Balance Sheet Annually"
          visibleColumns={visibleBalanceSheetColumns}
          columnDefinitions={columnDefinitionsBalanceSheet}
          preference={balanceSheetPreferences}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      )}
      {statementId == 'seg-2' && subStatementId == 'sub-2' && (
        <TableIncome
          data={
            financials?.balanceSheetHistoryQuarterly?.balanceSheetStatements
          }
          title="Balance Sheet Quaterly"
          visibleColumns={visibleBalanceSheetColumns}
          columnDefinitions={columnDefinitionsBalanceSheet}
          preference={balanceSheetPreferences}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      )}
      {statementId == 'seg-3' && subStatementId == 'sub-2' && (
        <TableIncome
          data={
            financials?.cashflowStatementHistoryQuarterly?.cashflowStatements
          }
          title="Cash Flow Quaterly"
          visibleColumns={visibleCashFlowColumns}
          columnDefinitions={columnDefinitionsCashFlow}
          preference={cashFlowPreferences}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      )}
      {statementId == 'seg-3' && subStatementId == 'sub-1' && (
        <TableIncome
          data={financials?.cashflowStatementHistory?.cashflowStatements}
          title="Cash Flow Annually"
          visibleColumns={visibleCashFlowColumns}
          columnDefinitions={columnDefinitionsCashFlow}
          preference={cashFlowPreferences}
          loadHelpPanelContent={loadHelpPanelContent}
        />
      )}
    </SpaceBetween>
  );
}
const TableIncome = ({
  data,
  title,
  visibleColumns,
  columnDefinitions,
  preference,
  loadHelpPanelContent,
}) => {
  const [loading, setLoading] = React.useState(false);

  const [preferences, setPreferences] = React.useState({
    wrapLines: true,
    contentDensity: false,
    stripedRows: true,
    visibleContent: visibleColumns,
  });

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      return () => clearTimeout(timer);
    }, 1500);
  }, []);
  return (
    <Table
      variant="embedded"
      stripedRows={preferences.stripedRows}
      wrapLines={preferences.wrapLines}
      visibleColumns={preferences.visibleContent}
      contentDensity={preferences.contentDensity}
      loading={loading}
      columnDefinitions={columnDefinitions}
      items={data}
      loadingText="Loading resources"
      trackBy="name"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No resources to display.
          </Box>
        </Box>
      }
      header={
        <Header
          variant="h2"
          description="All numbers in thousands"
          info={
            <InfoLink
              onFollow={() =>
                loadHelpPanelContent(
                  <HelpPanels
                    title={title}
                    des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                  />
                )
              }
            />
          }
        >
          {title}
        </Header>
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={({ detail }) => setPreferences(detail)}
          preferences={preferences}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Select to see all the text and wrap the lines',
          }}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Select to add alternating shaded rows',
          }}
          contentDensityPreference={{
            label: 'Compact mode',
            description:
              'Select to display content in a denser, more compact mode',
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main distribution properties',
                options: preference,
              },
            ],
          }}
        />
      }
    />
  );
};
export default Financials;
