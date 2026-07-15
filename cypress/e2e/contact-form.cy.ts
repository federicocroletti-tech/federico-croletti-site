describe('Contact form', () => {
  it('submits the contact form through the configured HTTP endpoint', () => {
    cy.intercept('POST', 'https://formsubmit.co/ajax/federico.croletti@gmail.com', (request) => {
      expect(request.headers['content-type']).to.contain('application/x-www-form-urlencoded');
      const body = new URLSearchParams(request.body);
      expect(body.get('name')).to.eq('Federico Croletti');
      expect(body.get('email')).to.eq('federico.croletti@gmail.com');
      expect(body.get('requestType')).to.eq('website');
      expect(body.get('privacyAccepted')).to.eq('yes');

      request.reply({
        statusCode: 200,
        body: { success: 'true', message: 'OK' },
      });
    }).as('contactSubmit');

    cy.visit('/contatti');
    cy.contains('button', 'Rifiuta non necessari').click();

    cy.get('[data-cy="contact-full-name"]').type('Federico Croletti');
    cy.get('[data-cy="contact-email"]').type('federico.croletti@gmail.com');
    cy.get('[data-cy="contact-subject"]').type('Richiesta dal sito');
    cy.get('[data-cy="contact-request-type"]').click();
    cy.get('mat-option').contains('Sito web').click();
    cy.get('[data-cy="contact-message"]').type(
      'Vorrei parlare di una possibile collaborazione tecnica tramite il sito personale.',
    );
    cy.get('[data-cy="contact-privacy"] input[type="checkbox"]').check({ force: true });
    cy.get('[data-cy="contact-submit"]').click();

    cy.wait('@contactSubmit');
    cy.contains('Messaggio inviato correttamente. Ti risponderò appena possibile.').should(
      'be.visible',
    );
  });
});
