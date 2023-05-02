import React from 'react';
import { mount } from '@cypress/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

it('renders App Header', () => {
  mount(
    <BrowserRouter>
      <App user={undefined} signOut={undefined} />
    </BrowserRouter>
  );
  cy.get('#h').contains('App Header');

  cy.get('#f').contains('App Footer');
});
