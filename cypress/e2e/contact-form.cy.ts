const emailJsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';
const consentStorageKey = 'federico-croletti-cookie-consent-v1';

describe('Contact form', () => {
  it('submits the contact form through EmailJS', () => {
    cy.intercept('POST', emailJsEndpoint, (request) => {
      expect(request.headers['content-type']).to.contain('application/json');
      const body = toEmailJsBody(request.body);
      expect(body.service_id).to.eq('service_u4z63bo');
      expect(body.template_id).to.eq('template_53z902r');
      expect(body.template_params.fullName).to.eq('Federico Croletti');
      expect(body.template_params.email).to.eq('federico.croletti@gmail.com');
      expect(body.template_params.requestType).to.eq('angular-architecture');
      expect(body.template_params.privacyAccepted).to.eq('yes');
      expect(body.template_params.honeypot).to.eq('');

      request.reply({
        statusCode: 200,
        body: 'OK',
      });
    }).as('contactSubmit');

    visitContactPageWithCookieDecision(
      '/contatti?service=angular-architecture&funnel=angular&source=angular_funnel',
    );

    cy.get('[data-cy="contact-full-name"]').type('Federico Croletti');
    cy.get('[data-cy="contact-email"]').type('federico.croletti@gmail.com');
    cy.get('[data-cy="contact-subject"]').type('Richiesta dal sito');
    cy.get('[data-cy="contact-request-type"]').contains('Architettura Angular / Micro Frontend');
    cy.get('[data-cy="contact-service-context"]').should('be.visible');
    cy.get('[data-cy="contact-message"]').type(
      'Vorrei parlare di una possibile collaborazione tecnica tramite il sito personale.',
    );
    cy.get('[data-cy="contact-privacy"] input[type="checkbox"]').check({ force: true });
    cy.get('[data-cy="contact-submit"]').click();

    cy.wait('@contactSubmit');
    cy.location('pathname').should('eq', '/grazie');
    cy.contains('Percorso selezionato: Consulenza Angular.').should('be.visible');
  });

  it('preselects the Milan IT support funnel from CTA query params', () => {
    visitContactPageWithCookieDecision(
      '/contatti?service=it-support&funnel=local-support&source=local_support_funnel',
    );

    cy.get('[data-cy="contact-request-type"]').contains('Assistenza informatica');
    cy.get('[data-cy="contact-service-context"]').should('be.visible');
  });

  it('shows a coherent error and email fallback when EmailJS fails', () => {
    cy.intercept('POST', emailJsEndpoint, {
      statusCode: 503,
      body: 'CONTACT_SEND_FAILED',
    }).as('contactSubmitFailure');

    visitContactPageWithCookieDecision();

    fillContactForm();
    cy.get('[data-cy="contact-submit"]').click();

    cy.wait('@contactSubmitFailure');
    cy.contains(
      'Non è stato possibile inviare il messaggio tramite il servizio esterno. Puoi riprovare più tardi oppure scrivermi direttamente via email.',
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

function visitContactPageWithCookieDecision(path = '/contatti') {
  cy.visit(path, {
    onBeforeLoad(window) {
      window.localStorage.setItem(
        consentStorageKey,
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          updatedAt: '2026-10-09T00:00:00.000Z',
          version: 1,
        }),
      );
    },
  });
}

function toEmailJsBody(body: unknown) {
  return typeof body === 'string' ? JSON.parse(body) : body;
}
