const emailJsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';
const fallbackEndpoint = 'https://formsubmit.co/ajax/federico.croletti@gmail.com';

describe('Contact form', () => {
  it('submits the contact form through the configured EmailJS endpoint', () => {
    cy.intercept('POST', emailJsEndpoint, (request) => {
      expect(request.headers['content-type']).to.contain('application/json');
      expect(request.body.template_params).to.include({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        requestType: 'website',
        privacyAccepted: 'yes',
        honeypot: '',
      });

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

  it('shows a coherent error and email fallback when the form service fails', () => {
    cy.intercept('POST', emailJsEndpoint, {
      statusCode: 500,
      body: { message: 'EmailJS unavailable' },
    }).as('emailJsFailure');
    cy.intercept('POST', fallbackEndpoint, {
      statusCode: 503,
      body: { success: false, message: 'CONTACT_EMAIL_NOT_CONFIGURED' },
    }).as('contactSubmitFailure');

    cy.visit('/contatti');
    cy.contains('button', 'Rifiuta non necessari').click();

    fillContactForm();
    cy.get('[data-cy="contact-submit"]').click();

    cy.wait('@emailJsFailure');
    cy.wait('@contactSubmitFailure');
    cy.contains(
      "Il backend è raggiungibile, ma l'invio email non è ancora configurato sul server.",
    ).should('be.visible');
    cy.get('[data-cy="contact-email-fallback"]')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('contain', 'mailto:federico.croletti@gmail.com');
  });
});

function fillContactForm() {
  cy.get('[data-cy="contact-full-name"]').type('Federico Croletti');
  cy.get('[data-cy="contact-email"]').type('federico.croletti@gmail.com');
  cy.get('[data-cy="contact-subject"]').type('Richiesta dal sito');
  cy.get('[data-cy="contact-request-type"]').click();
  cy.get('mat-option').contains('Sito web').click();
  cy.get('[data-cy="contact-message"]').type(
    'Vorrei parlare di una possibile collaborazione tecnica tramite il sito personale.',
  );
  cy.get('[data-cy="contact-privacy"] input[type="checkbox"]').check({ force: true });
}
