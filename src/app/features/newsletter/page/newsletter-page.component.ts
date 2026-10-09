import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';

interface NewsletterSegment {
  readonly title: string;
  readonly audience: string;
  readonly promise: string;
  readonly examples: readonly string[];
  readonly cadence: string;
}

interface NewsletterRule {
  readonly title: string;
  readonly body: string;
}

@Component({
  selector: 'app-newsletter-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './newsletter-page.component.html',
  styleUrl: './newsletter-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterPageComponent {
  private readonly seo = inject(SeoService);

  readonly segments: readonly NewsletterSegment[] = [
    {
      title: 'Angular e frontend',
      audience: 'Sviluppatori, team lead e persone interessate a interfacce moderne.',
      promise: 'Appunti pratici su Angular, TypeScript, architetture frontend, accessibilità e manutenzione del codice.',
      examples: [
        'Pattern Angular realmente utili nei progetti enterprise.',
        'Checklist per componenti, routing, performance e i18n.',
        'Note su strumenti AI usati con criterio nello sviluppo frontend.',
      ],
      cadence: 'Massimo 1 email al mese per questo segmento.',
    },
    {
      title: 'Assistenza informatica',
      audience: 'Privati, professionisti e piccole attività che cercano supporto digitale chiaro.',
      promise: 'Guide brevi su PC, backup, email, PEC, SPID, sicurezza account e problemi quotidiani.',
      examples: [
        'Come prepararsi prima di formattare o sostituire un PC.',
        'Promemoria su backup, password, phishing e recupero accessi.',
        'Novita pratiche su servizi digitali e procedure online.',
      ],
      cadence: 'Massimo 1 email al mese per questo segmento.',
    },
    {
      title: 'Patrimonio storico e territorio',
      audience: 'Persone curiose di luoghi, memoria locale, cammini, borghi e racconti del territorio.',
      promise: 'Osservazioni, itinerari e micro-ricerche su storia locale, paesaggio, mappe e comunita.',
      examples: [
        'Percorsi e luoghi da leggere con uno sguardo storico.',
        'Note su archivi, mappe, toponimi e piccole eredità culturali.',
        'Collegamenti tra tecnologia, territorio e narrazione digitale.',
      ],
      cadence: 'Massimo 1 email al mese per questo segmento.',
    },
    {
      title: 'Moto e utilizzo quotidiano',
      audience: 'Motociclisti urbani e persone che usano la moto come mezzo reale, non solo nel weekend.',
      promise: 'Spunti su pianificazione, sicurezza, manutenzione leggera, abitudini e percorsi quotidiani.',
      examples: [
        'Checklist prima di usare la moto tutti i giorni.',
        'Organizzazione di tragitti, meteo, dotazioni e piccoli imprevisti.',
        'Esperienze e strumenti digitali utili per muoversi meglio.',
      ],
      cadence: 'Massimo 1 email al mese per questo segmento.',
    },
    {
      title: 'Osservazione e manutenzione domestica',
      audience: 'Chi vuole tenere casa, strumenti e piccoli impianti sotto controllo con metodo.',
      promise: 'Promemoria stagionali e osservazioni pratiche su prevenzione, ordine, controlli e manutenzione.',
      examples: [
        'Controlli ricorrenti per umidità, serramenti, elettrodomestici e consumi.',
        'Piccole routine di manutenzione per evitare problemi più grandi.',
        'Schede semplici per annotare interventi, scadenze e segnali da monitorare.',
      ],
      cadence: 'Massimo 1 email al mese per questo segmento.',
    },
  ];

  readonly consentRules: readonly NewsletterRule[] = [
    {
      title: 'Nessuna iscrizione automatica',
      body: 'La newsletter non viene attivata per chi compila un modulo contatto, richiede assistenza o visita il sito. L\'iscrizione deve essere una scelta esplicita.',
    },
    {
      title: 'Consenso separato e chiaro',
      body: 'Il consenso alla newsletter resta distinto da preventivi, richieste tecniche, cookie, privacy e comunicazioni operative gia necessarie al servizio.',
    },
    {
      title: 'Preferenze per segmento',
      body: 'Ogni persona sceglie uno o piu segmenti. I contenuti non vengono inviati indiscriminatamente a tutto il database.',
    },
    {
      title: 'Conferma, disiscrizione e modifica',
      body: 'L\'iscrizione prevede conferma via email, link di disiscrizione in ogni invio e pagina per aggiornare le preferenze.',
    },
  ];

  readonly operatingSteps: readonly string[] = [
    'Raccogliere solo email, lingua preferita e segmenti selezionati, evitando campi non necessari.',
    'Usare checkbox non preselezionate, una per segmento, con testo comprensibile vicino a ogni consenso.',
    'Inviare una email di conferma prima di attivare l\'iscrizione effettiva.',
    'Registrare data, fonte del consenso, segmenti scelti e versione del testo privacy mostrato.',
    'Inserire in ogni comunicazione link per disiscrizione immediata e gestione preferenze.',
  ];

  constructor() {
    this.seo.update({
      title: 'Newsletter segmentata - Federico Croletti',
      description:
        'Progetto newsletter di Federico Croletti con segmenti distinti, consenso separato, conferma iscrizione, disiscrizione, gestione preferenze e massimo una comunicazione mensile per segmento.',
      path: '/newsletter',
    });
  }
}