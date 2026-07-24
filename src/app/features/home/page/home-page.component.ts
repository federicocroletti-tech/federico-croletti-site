import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS } from '../../../core/constants/contact-links';
import { SeoService } from '../../../core/services/seo.service';
import { SERVICE_CATEGORIES } from '../../services/data/services.data';

interface TextCard {
  readonly titleKey: string;
  readonly bodyKey?: string;
}

interface LocalServiceSection {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly body: string;
  readonly areaText: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);

  readonly contacts = CONTACT_LINKS;
  readonly servicePreview = SERVICE_CATEGORIES;

  readonly localServiceSections: readonly LocalServiceSection[] = [
    {
      id: 'assistenza-pc-notebook',
      icon: 'computer',
      title: 'Assistenza PC e notebook',
      body: 'Diagnosi di PC lenti, notebook bloccati, problemi software, periferiche e configurazioni quotidiane. Supporto informatico a Milano con attenzione a interventi chiari, documentati e sostenibili.',
      areaText: 'Milano, Quarto Oggiaro, Certosa',
    },
    {
      id: 'configurazione-email-pec',
      icon: 'mark_email_read',
      title: 'Configurazione email e PEC',
      body: 'Configurazione di caselle email, PEC, client di posta, firme, calendari e account su PC e smartphone per professionisti, privati e piccole imprese.',
      areaText: 'Milano, Bovisa, Portello',
    },
    {
      id: 'spid-firma-digitale',
      icon: 'verified_user',
      title: 'SPID e firma digitale',
      body: 'Supporto pratico per accessi SPID, firma digitale, documenti online, portali pubblici e procedure digitali che richiedono ordine e attenzione.',
      areaText: 'Milano, Baranzate, Bollate',
    },
    {
      id: 'supporto-smartphone',
      icon: 'smartphone',
      title: 'Supporto smartphone',
      body: 'Aiuto su smartphone Android, account Google, posta, backup foto, sincronizzazione, app essenziali e passaggi tra dispositivi.',
      areaText: 'Milano, Quarto Oggiaro, Certosa, Bovisa',
    },
    {
      id: 'sicurezza-informatica',
      icon: 'security',
      title: 'Sicurezza informatica',
      body: 'Controllo di impostazioni base, password sicure, riconoscimento phishing, backup, protezione account e buone pratiche per ridurre rischi digitali.',
      areaText: 'Milano, Portello, Bovisa, Certosa',
    },
    {
      id: 'sviluppo-software-siti-web',
      icon: 'code',
      title: 'Sviluppo software e siti web',
      body: 'Sviluppo software front-end, siti web, landing page, WordPress, integrazioni contatto e soluzioni digitali su misura con approccio tecnico e concreto.',
      areaText: 'Milano, Portello, Navigli, Lambrate',
    },
    {
      id: 'consulenza-it-professionisti-imprese',
      icon: 'business_center',
      title: 'Consulenza IT per professionisti e piccole imprese',
      body: 'Consulenza IT per scegliere strumenti, organizzare account, migliorare processi digitali, impostare piccoli progetti web e rendere la tecnologia piu semplice da gestire.',
      areaText: 'Milano, Baranzate, Bollate e hinterland nord',
    },
  ];

  readonly entityKeywords = [
    'supporto informatico',
    'consulenza digitale',
    'assistenza PC',
    'consulenza IT',
    'tecnico informatico Milano',
    'sviluppo software',
  ] as const;

  readonly googleReviewSummary = {
    rating: '5,0',
    reviewCountLabel: 'Numero recensioni aggiornato sul profilo Google Business',
  } as const;

  readonly skillHighlights: readonly TextCard[] = [
    { titleKey: 'home.skills.webPractical.title', bodyKey: 'home.skills.webPractical.body' },
    { titleKey: 'home.skills.digitalSupport.title', bodyKey: 'home.skills.digitalSupport.body' },
    { titleKey: 'home.skills.aiCloud.title', bodyKey: 'home.skills.aiCloud.body' },
    { titleKey: 'home.skills.architecture.title', bodyKey: 'home.skills.architecture.body' },
  ];

  readonly experiencePoints = [
    'home.experience.points.angular',
    'home.experience.points.websitesWordpress',
    'home.experience.points.digitalServices',
    'home.experience.points.backupEmailFormatting',
    'home.experience.points.aiCertification',
    'home.experience.points.microFrontend',
    'home.experience.points.maps',
  ] as const;

  readonly values = [
    'home.values.clarity',
    'home.values.reliability',
    'home.values.experience',
    'home.values.concreteSupport',
    'home.values.simpleSolutions',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Federico Croletti - Supporto Informatico e Consulenza Digitale a Milano',
      description:
        'Tecnico informatico e consulente digitale a Milano. Assistenza PC, configurazione email, PEC, SPID, sicurezza informatica, consulenza IT e sviluppo software. Contatta Federico Croletti.',
      path: '/',
    });
  }
}
