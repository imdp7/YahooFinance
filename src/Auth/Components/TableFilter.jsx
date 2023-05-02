// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { CollectionPreferences } from '@cloudscape-design/components';
import { addColumnSortLabels } from '../../features/common/labels';

export const COLUMN_DEFINITIONS_SERVICE = addColumnSortLabels([
  {
    id: 'description',
    sortingField: 'description',
    header: 'Description',
    cell: (item) => item.description,
    minWidth: 120,
  },
  {
    id: 'usageQty',
    sortingField: 'usageQty',
    cell: (item) => item.usageQty,
    header: 'Usage Quantity',
    minWidth: 160,
  },
  {
    id: 'amount',
    sortingField: 'amount',
    header: 'Amount',
    cell: (item) => item.amount,
    minWidth: 100,
  },
]);
export const COLUMN_DEFINITIONS_PAYMENT = addColumnSortLabels([
  {
    id: 'provider',
    sortingField: 'provider',
    header: 'Service provider',
    cell: (item) => item.provider,
    minWidth: 120,
  },
  {
    id: 'type',
    sortingField: 'type',
    cell: (item) => item.type,
    header: 'Charge type',
    minWidth: 160,
  },
  {
    id: 'documentType',
    sortingField: 'documentType',
    header: 'Document type',
    cell: (item) => item.documentType,
    minWidth: 100,
  },
  {
    id: 'invoiceID',
    sortingField: 'invoiceID',
    header: 'Invoice ID',
    cell: (item) => item.invoiceID,
    minWidth: 100,
  },
  {
    id: 'paymentStatus',
    sortingField: 'paymentStatus',
    header: 'Payment Status',
    cell: (item) => item.paymentStatus,
    minWidth: 100,
  },
  {
    id: 'PaymentReceivedDate',
    sortingField: 'PaymentReceivedDate',
    header: 'Payment received date',
    cell: (item) => item.PaymentReceivedDate,
    minWidth: 100,
  },
  {
    id: 'total',
    sortingField: 'total',
    header: 'Total',
    cell: (item) => item.total,
    minWidth: 100,
  },
]);
export const COLUMN_DEFINITIONS_SAVINGS = addColumnSortLabels([
  {
    id: 'type',
    sortingField: 'type',
    header: 'Savings type',
    cell: (item) => item.type,
    minWidth: 120,
  },
  {
    id: 'amount',
    sortingField: 'amount',
    header: 'Amount',
    cell: (item) => item.amount,
    minWidth: 100,
  },
]);

export const COLUMN_DEFINITIONS_INVOICES = addColumnSortLabels([
  {
    id: 'chargeType',
    sortingField: 'chargeType',
    header: 'Charge Type',
    cell: (item) => item.chargeType,
    minWidth: 120,
  },
  {
    id: 'documentType',
    sortingField: 'documentType',
    cell: (item) => item.documentType,
    header: 'Document Type',
    minWidth: 160,
  },
  {
    id: 'invoiceID',
    sortingField: 'invoiceID',
    header: 'Invoice ID',
    cell: (item) => item.invoiceID,
    minWidth: 100,
  },
  {
    id: 'invoiceDate',
    sortingField: 'invoiceDate',
    header: 'Invoice Date',
    cell: (item) => item.invoiceDate,
    minWidth: 100,
  },
  {
    id: 'total',
    sortingField: 'total',
    header: 'Total in USD',
    cell: (item) => item.total,
    minWidth: 100,
  },
]);
export const COLUMN_DEFINITIONS_TAX_INVOICES = addColumnSortLabels([
  {
    id: 'provider',
    sortingField: 'provider',
    header: 'Service provider',
    cell: (item) => item.provider,
    minWidth: 120,
  },
  {
    id: 'documentType',
    sortingField: 'documentType',
    cell: (item) => item.documentType,
    header: 'Document Type',
    minWidth: 160,
  },
  {
    id: 'documentID',
    sortingField: 'documentID',
    header: 'Document ID',
    cell: (item) => item.documentID,
    minWidth: 100,
  },
  {
    id: 'invoiceID',
    sortingField: 'invoiceID',
    header: 'Invoice ID',
    cell: (item) => item.invoiceID,
    minWidth: 100,
  },
]);
export const COLUMN_DEFINITIONS_TAXES = addColumnSortLabels([
  {
    id: 'name',
    sortingField: 'name',
    header: 'Service name',
    cell: (item) => item.name,
    minWidth: 120,
  },
  {
    id: 'postTax',
    sortingField: 'postTax',
    cell: (item) => item.postTax,
    header: 'Post-tax charges',
    minWidth: 160,
  },
  {
    id: 'preTax',
    sortingField: 'pretax',
    header: 'Pre-tax charges',
    cell: (item) => item.preTax,
    minWidth: 100,
  },
  {
    id: 'tax',
    sortingField: 'tax',
    header: 'Tax',
    cell: (item) => item.tax,
    minWidth: 100,
  },
]);

const VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main distribution properties',
    options: [
      { id: 'id', label: 'Distribution ID', editable: false },
      { id: 'domainName', label: 'Domain name' },
      { id: 'deliveryMethod', label: 'Delivery method' },
      { id: 'priceClass', label: 'Price class' },
      { id: 'sslCertificate', label: 'SSL certificate' },
      { id: 'origin', label: 'Origin' },
      { id: 'status', label: 'Status' },
      { id: 'state', label: 'State' },
      { id: 'logging', label: 'Logging' },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Distributions' },
  { value: 30, label: '30 Distributions' },
  { value: 50, label: '50 Distributions' },
];

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: [
    'id',
    'domainName',
    'deliveryMethod',
    'sslCertificate',
    'status',
    'state',
  ],
  wrapLines: false,
};

export const Preferences = ({
  preferences,
  setPreferences,
  disabled,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  visibleContentOptions = VISIBLE_CONTENT_OPTIONS,
}) => (
  <CollectionPreferences
    title="Preferences"
    confirmLabel="Confirm"
    cancelLabel="Cancel"
    disabled={disabled}
    preferences={preferences}
    onConfirm={({ detail }) => setPreferences(detail)}
    pageSizePreference={{
      title: 'Page size',
      options: pageSizeOptions,
    }}
    wrapLinesPreference={{
      label: 'Wrap lines',
      description: 'Check to see all the text and wrap the lines',
    }}
    visibleContentPreference={{
      title: 'Select visible columns',
      options: visibleContentOptions,
    }}
  />
);
