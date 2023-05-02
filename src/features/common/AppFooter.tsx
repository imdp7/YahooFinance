import React from 'react';
import '../../App.css';
import { Link } from '@cloudscape-design/components';
export function AppFooter(): JSX.Element {
  return (
    <div
      id="f"
      style={{
        position: 'sticky',
        bottom: 0,
        display: 'flex',
        zIndex: 1003,
        backgroundColor: 'rgb(35,47,62)',
      }}
    >
      <div id="layout">
        <div>
          <span id="links">
            <Link href="#" id="link" fontSize="body-s">
              Feedback
            </Link>
          </span>
          <span id="links">
            <span>Looking for language selection? Find it in the new</span>
            <Link href="#" id="link" fontSize="body-s" external>
              Unified Settings
            </Link>
          </span>
        </div>
        <div id="right">
          <span id="text">
            © 2023, Amazon Web Services, Inc. or its affiliates.
          </span>
          <span id="links">
            <Link href="#" id="link" fontSize="body-s">
              Privacy
            </Link>
          </span>
          <span id="links">
            <Link href="#" id="link" fontSize="body-s">
              Terms
            </Link>
          </span>
          <span id="links">
            <Link href="#" id="link" fontSize="body-s">
              Cookie Preferences
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
