describe('Project portfolio', () => {
  beforeEach(() => {
    cy.visit('/progetti');
    cy.contains('button', 'Rifiuta non necessari').click();
  });

  it('groups all projects and serves every original cover', () => {
    cy.viewport(1280, 900);
    cy.get('.project-collection').should('have.length', 6);
    cy.get('.project-entry').should('have.length', 31);
    cy.get('.project-results').should('contain.text', '31 progetti in 6 raccolte');
    cy.get('.project-cover img').each(($image) => {
      const source = $image.attr('src');
      expect(source).to.match(/^\/assets\/images\/projects\/[\w-]+\.svg$/);
      if (!source) {
        throw new Error('Project cover URL is missing');
      }
      cy.request(source).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.contain('image/svg+xml');
        expect(response.body).to.contain('viewBox="0 0 960 600"');
      });
    });
    cy.get('.project-cover img')
      .first()
      .should('be.visible')
      .and(($image) => {
        expect(($image[0] as HTMLImageElement).naturalWidth).to.equal(960);
      });
    cy.get('.collection-heading').first().scrollIntoView();
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(1280);
    });
    cy.screenshot('projects-desktop', { capture: 'viewport' });
  });

  it('filters the collections and restores the complete portfolio', () => {
    cy.contains('.project-filters button', 'Finanza').click();
    cy.get('.project-collection').should('have.length', 1);
    cy.get('.project-entry').should('have.length', 6);
    cy.contains('.project-filters button', 'Finanza').should('have.attr', 'aria-pressed', 'true');
    cy.contains('.project-filters button', 'Finanza').should('have.css', 'color', 'rgb(6, 17, 13)');
    cy.get('.collection-heading h2').should('have.text', 'Finanza e dati');
    cy.contains('.project-filters button', 'Tutti').click();
    cy.get('.project-entry').should('have.length', 31);
    cy.get('.project-collection').should('have.length', 6);
  });

  it('keeps project details keyboard-reachable and expandable', () => {
    cy.get('.project-details').first().should('not.have.attr', 'open');
    cy.get('.project-filters button').last().focus();
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should('have.prop', 'tagName', 'SUMMARY');
    cy.get('.project-details summary').first().click();
    cy.get('.project-details').first().should('have.attr', 'open');
    cy.get('.project-role').first().should('be.visible');
    cy.get('.project-details summary').first().click();
    cy.get('.project-details').first().should('not.have.attr', 'open');
  });

  it('fits mobile screens without horizontal overflow', () => {
    cy.viewport(390, 844);
    cy.get('.project-cover img').first().scrollIntoView().should('be.visible');
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(390);
    });
    cy.get('.projects-grid')
      .first()
      .children()
      .then(($cards) => {
        const first = $cards[0].getBoundingClientRect();
        const second = $cards[1].getBoundingClientRect();
        expect(second.top).to.be.greaterThan(first.bottom);
        expect(first.left).to.be.at.least(0);
        expect(first.right).to.be.at.most(390);
      });
    cy.screenshot('projects-mobile', { capture: 'viewport' });
  });

  it('uses two columns on tablet screens', () => {
    cy.viewport(820, 1000);
    cy.get('.projects-grid')
      .first()
      .children()
      .then(($cards) => {
        const first = $cards[0].getBoundingClientRect();
        const second = $cards[1].getBoundingClientRect();
        const third = $cards[2].getBoundingClientRect();
        expect(second.top).to.equal(first.top);
        expect(second.left).to.be.greaterThan(first.right);
        expect(third.top).to.be.greaterThan(first.bottom);
      });
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(820);
    });
  });

  it('translates collections, filters and details into English', () => {
    cy.viewport(1280, 900);
    cy.contains('.header-language button', 'EN').click();
    cy.get('.project-results').should('contain.text', '31 projects in 6 collections');
    cy.get('.collection-heading h2').first().should('have.text', 'Enterprise architectures');
    cy.get('.project-details summary').first().should('contain.text', 'Role and full tech stack');
    cy.contains('.project-filters button', 'Finance').click();
    cy.get('.project-entry').should('have.length', 6);
    cy.get('.collection-heading h2').should('have.text', 'Finance and data');
  });

  it('serves the independent study lab with its unverified-certification notice', () => {
    cy.visit('/ai-certification-study-lab/');
    cy.title().should('eq', 'AI Certification Study Lab');
    cy.contains('CCAO-F non sono stati verificati nelle fonti ufficiali consultate').should('be.visible');
    cy.contains('LEGAL_REVIEW_REQUIRED').should('be.visible');
    cy.get('button[data-view="simulator"]').first().click();
    cy.contains('La simulazione non è ancora attiva').should('be.visible');
    cy.get('.nav-item[data-view="evidence"]').click();
    cy.contains('10 APERTI · 2 RISOLTI').should('be.visible');
  });
});
