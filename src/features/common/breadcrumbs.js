// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export const resourcesBreadcrumbs = [
  {
    text: 'EC2',
    href: 'dashboard',
  },
  {
    text: 'Instances',
    href: 'instances',
  },
];

export const resourceDetailBreadcrumbs = [
  ...resourcesBreadcrumbs,
  {
    text: 'XLOWCQQFJJHM80',
    href: '#',
  },
];

export const resourceManageTagsBreadcrumbs = [
  ...resourceDetailBreadcrumbs,
  {
    text: 'Manage tags',
    href: '#',
  },
];

export const resourceEditBreadcrumbs = [
  ...resourceDetailBreadcrumbs,
  {
    text: 'Edit',
    href: '#',
  },
];

export const resourceCreateBreadcrumbs = [
  ...resourcesBreadcrumbs,
  {
    text: 'Create distribution',
    href: '#',
  },
];

export const readFromS3Breadcrumbs = [
  ...resourceDetailBreadcrumbs,
  {
    text: 'Run simulation',
    href: '#',
  },
];

export const writeToS3Breadcrumbs = [
  ...resourceDetailBreadcrumbs,
  {
    text: 'Create simulation',
    href: '#',
  },
];
