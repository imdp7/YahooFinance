import * as React from 'react';
import { Link } from '@cloudscape-design/components';
import { convertUnixTimestamp } from "../components/common/Table";
export function getMatchesCountText(count) {
  return count === 1 ? `1 match` : `${count} matches`;
}

function formatDate(date) {
  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
  const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: false });
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}

function createLabelFunction(columnName) {
  return ({ sorted, descending }) => {
    const sortState = sorted ? `sorted ${descending ? 'descending' : 'ascending'}` : 'not sorted';
    return `${columnName}, ${sortState}.`;
  };
}

export const paginationLabels = {
  nextPageLabel: 'Next page',
  pageLabel: pageNumber => `Go to page ${pageNumber}`,
  previousPageLabel: 'Previous page',
};

const pageSizePreference = {
  title: 'Select page size',
  options: [
    { value: 20, label: '20 resources' },
    { value: 40, label: '40 resources' },
  ],
};


export const collectionPreferencesProps = {
  pageSizePreference,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  title: 'Preferences',
};