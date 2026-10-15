export interface ArticleItem {
  readonly slug: string;
  readonly title: string;
  readonly category: 'Frontend' | 'Assistenza informatica';
  readonly description: string;
  readonly date: string;
  readonly readingTime: string;
  readonly paragraphs: readonly string[];
}

export const ARTICLES: readonly ArticleItem[] = [
  {
    slug: 'angular-signals-rxjs-responsabilita',
    title: 'Angular Signals e RxJS: separare stato locale e flussi asincroni',
    category: 'Frontend',
    description: 'Una guida pratica per usare Signals e RxJS senza mescolare responsabilita in componenti Angular complessi.',
    date: '2026-10-09',
    readingTime: '5 min',
    paragraphs: [
      'Signals e RxJS non risolvono lo stesso problema. I Signals sono molto efficaci per rappresentare stato locale, valori derivati e aggiornamenti sincroni leggibili nel template.',
      'RxJS resta invece adatto a flussi asincroni, stream di eventi, chiamate HTTP, cancellazioni e composizione di sorgenti nel tempo. La scelta migliore spesso e usarli insieme con un confine chiaro.',
      'In un progetto enterprise conviene mantenere i componenti sottili: servizi o facade orchestrano gli stream, mentre il componente espone al template un modello semplice e reattivo.',
    ],
  },
  {
    slug: 'micro-frontend-module-federation-checklist',
    title: 'Micro Frontend e Module Federation: checklist prima di introdurli',
    category: 'Frontend',
    description: 'Domande tecniche e organizzative da chiarire prima di adottare Micro Frontend in un progetto Angular.',
    date: '2026-10-09',
    readingTime: '6 min',
    paragraphs: [
      'I Micro Frontend aiutano quando esistono domini, team e cicli di rilascio realmente separabili. Se il problema e solo disordine interno, prima conviene sistemare architettura e confini del monolite frontend.',
      'Prima di introdurre Module Federation vanno chiariti ownership, versionamento, contratti tra shell e remote, gestione degli errori, autenticazione, design system e strategia di deploy.',
      'Una buona adozione parte da un caso pilota piccolo, osservabile e reversibile. Il valore non e nella tecnologia in se, ma nella capacita di ridurre dipendenze e coordinamento inutile.',
    ],
  },
  {
    slug: 'pc-lento-controlli-prima-assistenza',
    title: 'PC lento: controlli utili prima di chiedere assistenza',
    category: 'Assistenza informatica',
    description: 'Una lista prudente di verifiche non invasive da fare quando un computer diventa lento.',
    date: '2026-10-09',
    readingTime: '4 min',
    paragraphs: [
      'Quando un PC diventa lento, la prima cosa utile e descrivere bene il problema: quando succede, da quanto tempo, con quali programmi aperti e se sono comparsi messaggi di errore.',
      'Prima di interventi invasivi conviene verificare spazio libero, aggiornamenti, programmi in avvio automatico, stato del browser e presenza di backup recenti dei dati importanti.',
      'Evita strumenti casuali di pulizia o promesse di riparazione automatica. Se il computer contiene dati importanti, la priorita e preservarli prima di provare modifiche rischiose.',
    ],
  },
  {
    slug: 'backup-prima-di-un-intervento-informatico',
    title: 'Backup prima di un intervento informatico: cosa preparare',
    category: 'Assistenza informatica',
    description: 'Come preparare documenti, foto e account prima di un intervento su computer o smartphone.',
    date: '2026-10-09',
    readingTime: '4 min',
    paragraphs: [
      'Prima di lavorare su un dispositivo e importante sapere dove sono i dati essenziali: documenti, foto, archivi email, password manager, programmi usati per lavoro e cartelle sincronizzate.',
      'Un backup non dovrebbe stare solo sullo stesso computer. Meglio avere una copia esterna o cloud, verificando che i file principali siano davvero apribili.',
      'Durante la richiesta di assistenza non condividere password in chat o email. Le credenziali vanno gestite direttamente dal proprietario dell account, usando procedure sicure quando serve accedere.',
    ],
  },
];
