import { ServiceCategory } from '../models/service-category.model';

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  {
    id: 'web-presence',
    titleKey: 'services.categories.webPresence.title',
    descriptionKey: 'services.categories.webPresence.description',
    icon: 'language',
    services: [
      {
        id: 'personal-sites',
        titleKey: 'services.items.personalSites.title',
        descriptionKey: 'services.items.personalSites.description',
        icon: 'account_circle',
      },
      {
        id: 'showcase-sites',
        titleKey: 'services.items.showcaseSites.title',
        descriptionKey: 'services.items.showcaseSites.description',
        icon: 'storefront',
      },
      {
        id: 'wordpress-sites',
        titleKey: 'services.items.wordpressSites.title',
        descriptionKey: 'services.items.wordpressSites.description',
        icon: 'dashboard_customize',
      },
      {
        id: 'landing-pages',
        titleKey: 'services.items.landingPages.title',
        descriptionKey: 'services.items.landingPages.description',
        icon: 'rocket_launch',
      },
      {
        id: 'site-maintenance',
        titleKey: 'services.items.siteMaintenance.title',
        descriptionKey: 'services.items.siteMaintenance.description',
        icon: 'construction',
      },
      {
        id: 'seo-basic',
        titleKey: 'services.items.seoBasic.title',
        descriptionKey: 'services.items.seoBasic.description',
        icon: 'travel_explore',
      },
      {
        id: 'site-restyling',
        titleKey: 'services.items.siteRestyling.title',
        descriptionKey: 'services.items.siteRestyling.description',
        icon: 'design_services',
      },
      {
        id: 'contact-integration',
        titleKey: 'services.items.contactIntegration.title',
        descriptionKey: 'services.items.contactIntegration.description',
        icon: 'contact_mail',
      },
    ],
  },
  {
    id: 'it-support',
    titleKey: 'services.categories.itSupport.title',
    descriptionKey: 'services.categories.itSupport.description',
    icon: 'support_agent',
    services: [
      {
        id: 'pc-support',
        titleKey: 'services.items.pcSupport.title',
        descriptionKey: 'services.items.pcSupport.description',
        icon: 'computer',
      },
      {
        id: 'formatting',
        titleKey: 'services.items.formatting.title',
        descriptionKey: 'services.items.formatting.description',
        icon: 'restart_alt',
      },
      {
        id: 'backup',
        titleKey: 'services.items.backup.title',
        descriptionKey: 'services.items.backup.description',
        icon: 'backup',
      },
      {
        id: 'data-migration',
        titleKey: 'services.items.dataMigration.title',
        descriptionKey: 'services.items.dataMigration.description',
        icon: 'drive_file_move',
      },
      {
        id: 'email-setup',
        titleKey: 'services.items.emailSetup.title',
        descriptionKey: 'services.items.emailSetup.description',
        icon: 'alternate_email',
      },
      {
        id: 'email-management',
        titleKey: 'services.items.emailManagement.title',
        descriptionKey: 'services.items.emailManagement.description',
        icon: 'mark_email_unread',
      },
      {
        id: 'common-issues',
        titleKey: 'services.items.commonIssues.title',
        descriptionKey: 'services.items.commonIssues.description',
        icon: 'build_circle',
      },
      {
        id: 'remote-support',
        titleKey: 'services.items.remoteSupport.title',
        descriptionKey: 'services.items.remoteSupport.description',
        icon: 'screen_share',
      },
    ],
  },
  {
    id: 'digital-identity',
    titleKey: 'services.categories.digitalIdentity.title',
    descriptionKey: 'services.categories.digitalIdentity.description',
    icon: 'verified_user',
    services: [
      {
        id: 'pec',
        titleKey: 'services.items.pec.title',
        descriptionKey: 'services.items.pec.description',
        icon: 'mark_email_read',
      },
      {
        id: 'spid',
        titleKey: 'services.items.spid.title',
        descriptionKey: 'services.items.spid.description',
        icon: 'badge',
      },
      {
        id: 'digital-signature',
        titleKey: 'services.items.digitalSignature.title',
        descriptionKey: 'services.items.digitalSignature.description',
        icon: 'draw',
      },
      {
        id: 'digital-documents',
        titleKey: 'services.items.digitalDocuments.title',
        descriptionKey: 'services.items.digitalDocuments.description',
        icon: 'description',
      },
    ],
  },
  {
    id: 'ai-automation',
    titleKey: 'services.categories.aiAutomation.title',
    descriptionKey: 'services.categories.aiAutomation.description',
    icon: 'auto_awesome',
    services: [
      {
        id: 'ai-tools',
        titleKey: 'services.items.aiTools.title',
        descriptionKey: 'services.items.aiTools.description',
        icon: 'smart_toy',
      },
      {
        id: 'ai-documents',
        titleKey: 'services.items.aiDocuments.title',
        descriptionKey: 'services.items.aiDocuments.description',
        icon: 'article',
      },
      {
        id: 'ai-content',
        titleKey: 'services.items.aiContent.title',
        descriptionKey: 'services.items.aiContent.description',
        icon: 'edit_note',
      },
      {
        id: 'simple-automation',
        titleKey: 'services.items.simpleAutomation.title',
        descriptionKey: 'services.items.simpleAutomation.description',
        icon: 'settings_suggest',
      },
      {
        id: 'ai-prototypes',
        titleKey: 'services.items.aiPrototypes.title',
        descriptionKey: 'services.items.aiPrototypes.description',
        icon: 'tips_and_updates',
      },
      {
        id: 'aws-ai-guidance',
        titleKey: 'services.items.awsAiGuidance.title',
        descriptionKey: 'services.items.awsAiGuidance.description',
        icon: 'workspace_premium',
      },
    ],
  },
  {
    id: 'technical-consulting',
    titleKey: 'services.categories.technicalConsulting.title',
    descriptionKey: 'services.categories.technicalConsulting.description',
    icon: 'architecture',
    services: [
      {
        id: 'problem-analysis',
        titleKey: 'services.items.problemAnalysis.title',
        descriptionKey: 'services.items.problemAnalysis.description',
        icon: 'manage_search',
      },
      {
        id: 'software-advice',
        titleKey: 'services.items.softwareAdvice.title',
        descriptionKey: 'services.items.softwareAdvice.description',
        icon: 'hub',
      },
      {
        id: 'small-web-projects',
        titleKey: 'services.items.smallWebProjects.title',
        descriptionKey: 'services.items.smallWebProjects.description',
        icon: 'web',
      },
      {
        id: 'frontend-mentoring',
        titleKey: 'services.items.frontendMentoring.title',
        descriptionKey: 'services.items.frontendMentoring.description',
        icon: 'school',
      },
    ],
  },
];
