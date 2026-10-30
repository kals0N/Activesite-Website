// review: pending — French copy to be approved by a native speaker before launch.
import type { ServiceContent, ServiceKey } from '@/lib/services';

export const review = 'pending';

const PH_TIME = '[[PLACEHOLDER: délai de lancement habituel, ex. 3 à 6 semaines]]';
const PRICE =
  'Chaque projet est calibré selon vos objectifs. Obtenez un plan sur mesure lors d’un appel gratuit.';

export const servicesFr: Record<ServiceKey, ServiceContent> = {
  'brand-identity': {
    slug: 'identite-visuelle',
    name: 'Identité visuelle',
    outcome: 'Une marque que vos clients reconnaissent et adoptent au premier regard',
    promise: 'Logo, couleurs et charte graphique à la hauteur de la qualité de votre travail.',
    card: 'Logo et charte graphique qui inspirent confiance avant même de parler.',
    metaTitle: 'Création logo et identité visuelle à Douala | Activesite',
    metaDescription:
      'Création de logo, identité visuelle et charte graphique pour PME et fondateurs. Paraissez crédible, démarquez-vous et gagnez la confiance de vos clients.',
    keyword: 'création logo Douala',
    whoFor: [
      'Les nouvelles entreprises qui doivent paraître établies dès le premier jour.',
      'Les entreprises en croissance dont le logo ne reflète plus leur niveau.',
      'Les fondateurs et créateurs qui bâtissent une marque personnelle mémorable.',
    ],
    problems: [
      'Votre logo semble amateur, alors vos clients doutent de votre qualité.',
      'Chaque visuel est différent, donc personne ne se souvient de vous.',
      'Vous êtes jugé sur le prix, car rien ne signale votre valeur.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. +X % de demandes après le changement d’image]]',
        label: 'Plus de demandes grâce à une image professionnelle',
      },
      { metric: '[[PLACEHOLDER: ex. X semaines]]', label: 'Du brief à l’identité complète' },
      { metric: '1', label: 'Image cohérente sur le web, les réseaux et l’imprimé' },
    ],
    deliverables: [
      'Atelier stratégique : cible, positionnement et personnalité',
      'Logo principal, déclinaisons et favicon',
      'Palette de couleurs et typographies',
      'Charte graphique (PDF)',
      'Modèles pour réseaux sociaux et documents',
      'Tous les fichiers sources, qui vous appartiennent',
    ],
    processNote:
      'Nous définissons d’abord ce que vous représentez, puis l’identité qui l’exprime d’un coup d’œil.',
    faqs: [
      {
        q: 'Combien de propositions de logo verrai-je ?',
        a: 'Vous découvrez [[PLACEHOLDER: nombre de pistes créatives]] pistes distinctes. Nous affinons votre préférée dans les tours de révision convenus.',
      },
      {
        q: 'Serai-je propriétaire du logo ?',
        a: 'Oui. Une fois le projet réglé, vous détenez tous les droits et recevez tous les fichiers sources.',
      },
      {
        q: 'Pouvez-vous moderniser mon logo actuel ?',
        a: 'Oui. Si votre logo est déjà reconnu, nous le modernisons au lieu de repartir de zéro.',
      },
      {
        q: 'Combien de temps faut-il ?',
        a: `La plupart des identités prennent ${PH_TIME}. Nous fixons le calendrier lors de l’appel stratégique gratuit.`,
      },
    ],
  },
  'graphic-design': {
    slug: 'design-graphique',
    name: 'Design graphique',
    outcome: 'Des visuels qui arrêtent le défilement et vendent votre offre',
    promise: 'Illustrations, images et motion design conçus pour faire agir.',
    card: 'Illustrations, visuels et motion design qui captent et font agir.',
    metaTitle: 'Graphiste à Douala : visuels et motion design | Activesite',
    metaDescription:
      'Illustrations, visuels pour réseaux sociaux et motion design qui captent l’attention et vendent votre offre. Un design fidèle à votre marque.',
    keyword: 'graphiste Douala',
    whoFor: [
      'Les entreprises qui publient sur les réseaux sans générer de ventes.',
      'Les marques qui ont besoin de nouvelles créations publicitaires chaque mois.',
      'Les créateurs qui veulent un style visuel reconnaissable.',
    ],
    problems: [
      'Vos publications se fondent dans la masse, alors on les ignore.',
      'Les images de banque vous font ressembler à tout le monde.',
      'Des visuels incohérents affaiblissent la marque que vous avez construite.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. +X % d’engagement]]',
        label: 'Plus de personnes qui s’arrêtent sur vos contenus',
      },
      {
        metric: '[[PLACEHOLDER: ex. livraison en X jours]]',
        label: 'Des créations livrées rapidement',
      },
      { metric: '100 %', label: 'Fidèle à votre marque, à chaque fois' },
    ],
    deliverables: [
      'Illustrations et pictogrammes sur mesure',
      'Visuels de publications et de stories',
      'Créations publicitaires dans tous les formats',
      'Motion design et courtes animations',
      'Mise en page de présentations et documents',
      'Fichiers sources modifiables',
    ],
    processNote: 'Chaque visuel part de l’action attendue, puis le design la provoque.',
    faqs: [
      {
        q: 'Pouvez-vous suivre ma charte graphique existante ?',
        a: 'Oui. Nous la respectons à la lettre, ou proposons des améliorations si elle freine vos visuels.',
      },
      {
        q: 'Proposez-vous un accompagnement mensuel ?',
        a: 'Oui. Beaucoup de clients réservent un volume mensuel pour leurs réseaux et publicités. Nous l’ajustons lors d’un appel gratuit.',
      },
      {
        q: 'Quels formats livrez-vous ?',
        a: 'Web, réseaux sociaux, impression et animation, avec les fichiers sources modifiables.',
      },
      {
        q: 'Quels sont vos délais ?',
        a: 'Les petites demandes prennent généralement [[PLACEHOLDER: délai pour petites demandes]]. Les projets plus larges suivent un calendrier convenu.',
      },
    ],
  },
  'ui-ux-design': {
    slug: 'design-ui-ux',
    name: 'Design UI/UX',
    outcome: 'Des produits que vos utilisateurs comprennent et utilisent sans effort',
    promise:
      'Parcours, maquettes et prototypes qui lèvent les doutes avant la première ligne de code.',
    card: 'Parcours, maquettes et prototypes pour des produits simples à utiliser.',
    metaTitle: 'Agence UI UX : maquettes et prototypes | Activesite',
    metaDescription:
      'Parcours utilisateurs, arborescences, maquettes et prototypes cliquables. Concevez des produits compris dès la première utilisation, testés avant le développement.',
    keyword: 'agence UI UX',
    whoFor: [
      'Les fondateurs qui veulent valider une idée avant de payer le développement.',
      'Les équipes dont l’application perd des inscriptions.',
      'Les entreprises qui préparent un site aux nombreuses pages et objectifs.',
    ],
    problems: [
      'Vos utilisateurs se perdent et partent avant d’acheter ou de s’inscrire.',
      'Les développeurs devinent les fonctions, et chaque refonte coûte double.',
      'Vous ne pouvez pas montrer aux investisseurs comment le produit fonctionnera.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. +X % d’inscriptions finalisées]]',
        label: 'Plus d’utilisateurs qui terminent les actions clés',
      },
      {
        metric: '[[PLACEHOLDER: ex. X semaines]]',
        label: 'Jusqu’à un prototype cliquable et testable',
      },
      { metric: '0', label: 'Approximation laissée aux développeurs' },
    ],
    deliverables: [
      'Recherche utilisateur et cartographie des objectifs',
      'Arborescence et architecture de l’information',
      'Parcours utilisateurs pour chaque étape clé',
      'Maquettes fonctionnelles (wireframes) de chaque écran',
      'Interface haute fidélité et prototype interactif',
      'Fichiers et spécifications prêts pour le développement',
    ],
    processNote:
      'Nous relions le parcours à votre objectif, le testons en prototype, puis livrons un plan de développement clair.',
    faqs: [
      {
        q: 'Avec quels outils travaillez-vous ?',
        a: 'Nous travaillons sur Figma. Vous avez accès aux fichiers et au lien du prototype.',
      },
      {
        q: 'Pouvez-vous concevoir un produit développé par une autre équipe ?',
        a: 'Oui. Nous livrons des spécifications que tout développeur compétent peut suivre.',
      },
      {
        q: 'Testez-vous les maquettes avec de vrais utilisateurs ?',
        a: 'Oui. Nous menons des tests rapides sur le prototype et corrigeons avant le développement.',
      },
      {
        q: 'L’UX est-elle utile pour un petit site ?',
        a: 'Oui. Une structure claire transforme les visiteurs en demandes. Nous adaptons le travail à votre projet.',
      },
    ],
  },
  'website-development': {
    slug: 'creation-site-internet',
    name: 'Sites vitrines professionnels',
    outcome: 'Un site internet qui vous apporte des prospects qualifiés chaque semaine',
    promise:
      'Un site professionnel rapide, conçu pour une seule mission : transformer vos visiteurs en clients.',
    card: 'Des sites d’entreprise conçus pour générer des prospects qualifiés.',
    metaTitle: 'Création de site internet professionnel | Activesite',
    metaDescription:
      'Création de site internet professionnel pour PME et entreprises en croissance. Rapide, pensé mobile et conçu pour transformer vos visiteurs en clients.',
    keyword: 'création site internet professionnel',
    whoFor: [
      'Les entreprises sans site, qui perdent des clients au profit de concurrents visibles.',
      'Les entreprises dont le site est joli mais n’apporte aucune demande.',
      'Les sociétés de services qui veulent un flux régulier de rendez-vous.',
    ],
    problems: [
      'Sans site, vos clients choisissent le concurrent qu’ils trouvent en ligne.',
      'Votre site est lent sur mobile, et les visiteurs partent en quelques secondes.',
      'Les visiteurs ne savent pas quoi faire ensuite, alors ils ne vous contactent pas.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. +X % de prospects en Y jours]]',
        label: 'Plus de demandes qualifiées, à trafic égal',
      },
      { metric: '≤ 2,5 s', label: 'Temps de chargement mobile, notre standard' },
      { metric: PH_TIME, label: 'Du lancement du projet à la mise en ligne' },
    ],
    deliverables: [
      'Stratégie de conversion et arborescence liées à vos objectifs',
      'Design sur mesure, pensé d’abord pour le mobile',
      'Rédaction persuasive de chaque page',
      'Formulaires, WhatsApp et prise de rendez-vous intégrés',
      'SEO on-page, statistiques et suivi des conversions',
      'Formation pour modifier vos contenus',
    ],
    processNote:
      'Nous partons du nombre de prospects dont vous avez besoin chaque mois, puis concevons chaque page pour les obtenir.',
    faqs: [
      { q: 'Combien coûte un site internet professionnel ?', a: PRICE },
      {
        q: 'Pourrai-je modifier le site moi-même ?',
        a: 'Oui. Les contenus que vous changez souvent sont modifiables, et nous vous formons.',
      },
      {
        q: 'Mon site fonctionnera-t-il bien sur téléphone ?',
        a: 'Oui. Nous concevons d’abord pour le mobile, puis pour la tablette et l’ordinateur.',
      },
      {
        q: 'Rédigez-vous les textes du site ?',
        a: 'Oui. La rédaction est incluse. Nous vous interrogeons, puis écrivons pour vos clients.',
      },
    ],
  },
  'ecommerce-development': {
    slug: 'creation-site-ecommerce',
    name: 'E-commerce',
    outcome: 'Une boutique en ligne qui vend même pendant votre sommeil',
    promise:
      'Des boutiques Shopify et WooCommerce qui transforment les curieux en acheteurs fidèles.',
    card: 'Des boutiques Shopify et WooCommerce qui vendent jour et nuit.',
    metaTitle: 'Création site e-commerce au Cameroun | Activesite',
    metaDescription:
      'Création de boutique en ligne Shopify et WooCommerce. Fiches produits claires, paiement fluide et moyens de paiement locaux pour vendre plus.',
    keyword: 'création site e-commerce Cameroun',
    whoFor: [
      'Les boutiques qui vendent par WhatsApp et Instagram et veulent passer à l’échelle.',
      'Les marques qui quittent une marketplace pour leur propre boutique.',
      'Les commerçants dont le paiement fait fuir les acheteurs au dernier moment.',
    ],
    problems: [
      'Vendre par message limite vos ventes à vos heures de réponse.',
      'Un paiement compliqué fait abandonner des paniers pleins.',
      'Votre boutique est lente en données mobiles, et les clients abandonnent.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. X de ventes en Y semaines]]',
        label: 'Chiffre d’affaires généré par votre boutique',
      },
      {
        metric: '[[PLACEHOLDER: ex. +X % de taux de conversion]]',
        label: 'Plus de visiteurs qui finalisent leur achat',
      },
      {
        metric: '24 h/24',
        label: 'Votre boutique prend des commandes pendant que vous vous reposez',
      },
    ],
    deliverables: [
      'Stratégie, structure du catalogue et textes des fiches produits',
      'Thème Shopify ou WooCommerce sur mesure',
      'Paiements, y compris les solutions locales disponibles',
      'Livraison, taxes et notifications de commande',
      'Statistiques et pixels Meta et TikTok',
      'Formation à la gestion des produits et commandes',
    ],
    processNote:
      'Nous concevons d’abord le chemin de la fiche produit à la commande payée, puis construisons tout autour.',
    faqs: [
      {
        q: 'Shopify ou WooCommerce : que choisir ?',
        a: 'Shopify convient à ceux qui veulent une gestion simple. WooCommerce convient à ceux qui veulent un contrôle total. Nous vous conseillons lors de l’appel.',
      },
      {
        q: 'Mes clients pourront-ils payer par Mobile Money ?',
        a: 'Souvent, oui, via des prestataires compatibles. Nous confirmons la meilleure option pour votre marché.',
      },
      {
        q: 'Pouvez-vous transférer mes produits d’une autre plateforme ?',
        a: 'Oui. Nous migrons produits, clients et commandes lorsque les plateformes le permettent.',
      },
      { q: 'Combien coûte une boutique en ligne ?', a: PRICE },
    ],
  },
  'saas-development': {
    slug: 'developpement-saas',
    name: 'Développement SaaS',
    outcome: 'Transformez votre idée en produit pour lequel vos clients paient',
    promise: 'Du MVP à la croissance : des produits SaaS conçus, développés et lancés avec vous.',
    card: 'Produits SaaS et MVP, de l’idée aux premiers clients payants.',
    metaTitle: 'Développement SaaS et MVP pour fondateurs | Activesite',
    metaDescription:
      'Développement de MVP et de produits SaaS pour fondateurs et entreprises. Nous concevons, développons et lançons des logiciels rentables, rapidement.',
    keyword: 'développement SaaS',
    whoFor: [
      'Les fondateurs avec une idée validée qui cherchent un partenaire technique.',
      'Les créateurs qui transforment leur audience en produit logiciel.',
      'Les entreprises qui remplacent leurs tableurs par leur propre plateforme.',
    ],
    problems: [
      'Les freelances disparaissent en cours de projet et laissent un code inachevé.',
      'Tout développer d’un coup épuise votre budget avant le lancement.',
      'Vous ne pouvez pas juger les choix techniques et craignez les erreurs coûteuses.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. MVP en ligne en X semaines]]',
        label: 'De l’idée à un produit fonctionnel',
      },
      {
        metric: '[[PLACEHOLDER: ex. X utilisateurs payants au lancement]]',
        label: 'Premiers clients qui valident le produit',
      },
      { metric: '100 %', label: 'Code et propriété intellectuelle à vous' },
    ],
    deliverables: [
      'Stratégie produit et périmètre du MVP',
      'Parcours UX et design de l’interface',
      'Développement de l’application avec authentification sécurisée',
      'Paiements et abonnements',
      'Tableau de bord d’administration et statistiques',
      'Hébergement, supervision et accompagnement au lancement',
    ],
    processNote:
      'Nous réduisons l’idée au plus petit produit qu’un client paiera, le lançons, puis le faisons grandir.',
    faqs: [
      {
        q: 'Serai-je propriétaire du code ?',
        a: 'Oui. Le code, les designs et la propriété intellectuelle vous appartiennent une fois le projet réglé.',
      },
      {
        q: 'Pouvez-vous signer un accord de confidentialité ?',
        a: 'Oui. Nous signons un NDA avant que vous partagiez des informations sensibles.',
      },
      {
        q: 'Quelles technologies utilisez-vous ?',
        a: 'Des outils éprouvés comme Next.js, React et Node.js, choisis selon votre produit.',
      },
      {
        q: 'Assurez-vous le suivi après le lancement ?',
        a: 'Oui. Nous proposons développement continu, hébergement et maintenance.',
      },
    ],
  },
  'portfolio-websites': {
    slug: 'site-portfolio',
    name: 'Sites portfolio',
    outcome: 'Un portfolio qui vous fait gagner de meilleurs clients',
    promise:
      'Des sites portfolio pour créateurs et experts qui veulent des clients premium, pas seulement des likes.',
    card: 'Des portfolios pour créateurs et experts qui attirent des clients premium.',
    metaTitle: 'Création site portfolio pour créateurs | Activesite',
    metaDescription:
      'Sites portfolio et de marque personnelle pour créateurs de contenu, consultants et experts. Montrez votre travail et transformez votre audience en clients.',
    keyword: 'création site portfolio',
    whoFor: [
      'Les créateurs de contenu prêts à transformer leur audience en revenus.',
      'Les consultants, coachs et experts qui vendent leur savoir-faire.',
      'Les photographes, designers et artistes qui veulent se démarquer.',
    ],
    problems: [
      'Une page « lien en bio » ne montre pas la valeur de votre travail.',
      'Les marques ne voient pas vite pourquoi travailler avec vous.',
      'Vos réseaux peuvent disparaître ; votre propre site, non.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. +X demandes par mois]]',
        label: 'Demandes de collaboration et de clients',
      },
      { metric: PH_TIME, label: 'Jusqu’à la mise en ligne de votre site' },
      { metric: '1', label: 'Lieu unique pour vos projets, offres et audience' },
    ],
    deliverables: [
      'Positionnement et structure de vos offres',
      'Design de portfolio fidèle à votre style',
      'Modèles de pages projet et études de cas',
      'Prise de rendez-vous, demandes et inscription à la newsletter',
      'Kit média ou page de services',
      'Mise à jour simple des contenus',
    ],
    processNote:
      'Nous définissons les clients que vous visez, puis sélectionnons et présentons votre travail pour les attirer.',
    faqs: [
      {
        q: 'Puis-je vendre depuis mon portfolio ?',
        a: 'Oui. Nous pouvons ajouter des réservations, des produits numériques ou une petite boutique.',
      },
      {
        q: 'Sera-t-il relié à mes réseaux sociaux ?',
        a: 'Oui. Nous relions vos profils et pouvons afficher certaines publications sans ralentir le site.',
      },
      {
        q: 'Pourrai-je ajouter des projets moi-même ?',
        a: 'Oui. Ajouter un projet prend quelques minutes, et nous vous montrons comment faire.',
      },
      {
        q: 'Je débute. Un portfolio en vaut-il la peine ?',
        a: 'Oui. Un site professionnel rend crédible même un petit nombre de projets et vous aide à augmenter vos tarifs.',
      },
    ],
  },
  'sales-funnels': {
    slug: 'tunnels-de-vente',
    name: 'Tunnels de vente',
    outcome: 'Un tunnel de vente qui transforme votre trafic en clients payants',
    promise:
      'Des tunnels HighLevel et systeme.io qui captent, relancent et convertissent automatiquement.',
    card: 'Tunnels HighLevel et systeme.io qui transforment le trafic en ventes.',
    metaTitle: 'Création tunnel de vente HighLevel et systeme.io | Activesite',
    metaDescription:
      'Création de tunnels de vente sur GoHighLevel et systeme.io. Pages de capture, relances e-mail et automatisations qui transforment votre trafic en clients.',
    keyword: 'création tunnel de vente',
    whoFor: [
      'Les coachs et créateurs qui vendent formations, programmes ou événements.',
      'Les entreprises dont les publicités renvoient vers une simple page d’accueil.',
      'Les équipes qui perdent des prospects faute de relance.',
    ],
    problems: [
      'Vous payez des publicités, mais les visiteurs repartent sans laisser de trace.',
      'Vos prospects refroidissent, car personne ne les relance à temps.',
      'Vos outils ne communiquent pas, et des données se perdent.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. X % de taux d’inscription]]',
        label: 'Visiteurs devenus prospects',
      },
      {
        metric: '[[PLACEHOLDER: ex. X ventes pour Y prospects]]',
        label: 'Prospects devenus clients',
      },
      { metric: '24 h/24', label: 'Des relances automatiques qui n’oublient jamais' },
    ],
    deliverables: [
      'Stratégie du tunnel et cartographie de l’offre',
      'Pages de capture, de vente et de remerciement',
      'Séquences de relance par e-mail et WhatsApp',
      'Pipeline CRM et automatisations',
      'Intégration du paiement et de la prise de rendez-vous',
      'Suivi des conversions à chaque étape',
    ],
    processNote:
      'Nous traçons chaque étape du premier clic au paiement, puis automatisons les relances entre elles.',
    faqs: [
      {
        q: 'HighLevel ou systeme.io : lequel choisir ?',
        a: 'systeme.io convient aux créateurs qui démarrent. HighLevel convient aux entreprises qui ont besoin d’un CRM complet. Nous vous aidons à choisir.',
      },
      {
        q: 'Rédigez-vous les pages et les e-mails ?',
        a: 'Oui. Les textes des pages et des relances sont inclus.',
      },
      {
        q: 'Pouvez-vous améliorer un tunnel existant ?',
        a: 'Oui. Nous l’analysons, trouvons où les visiteurs abandonnent et corrigeons ces étapes en priorité.',
      },
      {
        q: 'Faut-il des publicités pour qu’un tunnel fonctionne ?',
        a: 'Non. Un tunnel fonctionne aussi avec les réseaux, l’e-mail et le bouche-à-oreille. La publicité l’accélère.',
      },
    ],
  },
  'seo-aeo-geo': {
    slug: 'referencement-seo-aeo-geo',
    name: 'SEO, AEO et GEO',
    outcome: 'Soyez trouvé quand vos clients cherchent sur Google et l’IA',
    promise:
      'Positionnez-vous sur Google, apparaissez dans les réponses de l’IA et soyez recommandé par les assistants.',
    card: 'Positionnez-vous sur Google et soyez recommandé par l’IA.',
    metaTitle: 'Agence SEO au Cameroun : Google et IA | Activesite',
    metaDescription:
      'Référencement naturel, AEO et GEO. Positionnez-vous sur Google, apparaissez dans les aperçus IA et soyez recommandé par ChatGPT et les autres assistants.',
    keyword: 'agence SEO Cameroun',
    whoFor: [
      'Les entreprises locales qui veulent être visibles dans leur ville.',
      'Les entreprises qui paient des publicités faute de trafic naturel.',
      'Les marques qui veulent être citées quand on demande conseil à l’IA.',
    ],
    problems: [
      'Vos clients cherchent ce que vous vendez et trouvent vos concurrents.',
      'Les assistants IA répondent sur votre secteur sans jamais vous citer.',
      'Vos coûts publicitaires augmentent faute de trafic naturel.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. +X % de trafic naturel en Y mois]]',
        label: 'Plus de visiteurs issus de la recherche',
      },
      {
        metric: '[[PLACEHOLDER: ex. X mots-clés en première page]]',
        label: 'Des positions sur les recherches qui rapportent',
      },
      { metric: '3', label: 'Canaux couverts : Google, réponses IA, assistants IA' },
    ],
    deliverables: [
      'Audit SEO technique et corrections',
      'Recherche de mots-clés et de questions',
      'Optimisation des pages et données structurées',
      'Plan éditorial et articles conçus pour être cités',
      'Fiche Google Business Profile et SEO local',
      'Rapport mensuel de positions et de trafic',
    ],
    processNote:
      'Nous identifions les recherches de vos clients, puis créons les pages qui y répondent mieux que quiconque.',
    faqs: [
      {
        q: 'Que signifient AEO et GEO ?',
        a: 'L’AEO (Answer Engine Optimization) vise les réponses directes, comme les aperçus IA de Google. Le GEO (Generative Engine Optimization) vise les citations par les assistants IA.',
      },
      {
        q: 'En combien de temps le SEO donne-t-il des résultats ?',
        a: 'Les premiers signes apparaissent souvent en [[PLACEHOLDER: délai habituel des premiers résultats]]. Les positions solides se construisent sur plusieurs mois.',
      },
      {
        q: 'Pouvez-vous garantir la première place sur Google ?',
        a: 'Aucune agence honnête ne le peut. Nous nous engageons sur un travail clair, des rapports mensuels et les objectifs convenus lors de votre appel.',
      },
      {
        q: 'Faites-vous du SEO local à Douala et au Cameroun ?',
        a: 'Oui. Nous optimisons votre fiche Google, vos pages locales et vos annuaires, en français et en anglais.',
      },
    ],
  },
  'digital-marketing': {
    slug: 'marketing-digital',
    name: 'Marketing digital',
    outcome: 'Des publicités qui apportent des clients, pas seulement des clics',
    promise:
      'Achat média Meta et TikTok axé sur les prospects et les ventes, avec des résultats clairs.',
    card: 'Publicités Meta et TikTok axées sur les clients, pas les clics.',
    metaTitle: 'Agence publicité Facebook au Cameroun | Activesite',
    metaDescription:
      'Publicité Facebook, Instagram et TikTok pour PME. Des campagnes conçues et optimisées pour les prospects et les ventes, avec un rapport mensuel clair.',
    keyword: 'agence publicité Facebook Cameroun',
    whoFor: [
      'Les entreprises qui boostent des publications sans savoir ce qu’elles rapportent.',
      'Les boutiques et services prêts à accélérer avec la publicité.',
      'Les marques qui veulent des clients sur TikTok, pas seulement des vues.',
    ],
    problems: [
      'Les publications boostées attirent des likes, mais le téléphone ne sonne pas.',
      'Vous ignorez quelles publicités rapportent et lesquelles gaspillent.',
      'Vos comptes publicitaires sont restreints pour des erreurs évitables.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. retour sur dépenses publicitaires de X]]',
        label: 'Le revenu généré par chaque franc investi',
      },
      {
        metric: '[[PLACEHOLDER: ex. −X % de coût par prospect]]',
        label: 'Un coût par prospect plus bas',
      },
      { metric: 'Mensuel', label: 'Rapport de résultats en langage simple' },
    ],
    deliverables: [
      'Audit du compte, pixel et suivi des conversions',
      'Stratégie d’audience et d’offre',
      'Créations et textes publicitaires testés en variantes',
      'Création des campagnes sur Meta et TikTok',
      'Optimisation hebdomadaire et gestion du budget',
      'Rapport mensuel et prochaines étapes',
    ],
    processNote:
      'Nous fixons d’abord le coût par client que vous pouvez vous permettre, puis optimisons les campagnes pour faire mieux.',
    faqs: [
      {
        q: 'Quel budget publicitaire faut-il ?',
        a: 'Cela dépend de vos objectifs et de votre marché. Nous recommandons un budget de départ lors de l’appel gratuit.',
      },
      {
        q: 'Le budget publicitaire est-il inclus dans vos honoraires ?',
        a: 'Non. Il est réglé directement à Meta ou TikTok, et vous gardez le contrôle du compte.',
      },
      {
        q: 'Créez-vous les visuels publicitaires ?',
        a: 'Oui. Notre équipe design produit et teste les créations de chaque campagne.',
      },
      {
        q: 'Quand verrai-je des résultats ?',
        a: 'Les campagnes ont généralement besoin de [[PLACEHOLDER: période d’apprentissage habituelle]] pour apprendre. Nous vous informons dès la première semaine.',
      },
    ],
  },
  'hosting-maintenance': {
    slug: 'hebergement-maintenance',
    name: 'Hébergement, migration et maintenance',
    outcome: 'Un site rapide et sécurisé dont vous n’avez plus à vous soucier',
    promise:
      'Hébergement sécurisé, migrations soignées et support continu, pris en charge pour vous.',
    card: 'Hébergement, migrations et support, gérés pour vous.',
    metaTitle: 'Maintenance site web et hébergement | Activesite',
    metaDescription:
      'Hébergement de site web sécurisé, migration et maintenance. Mises à jour, sauvegardes, surveillance et corrections pour un site rapide et en ligne.',
    keyword: 'maintenance site web',
    whoFor: [
      'Les entreprises dont le site a été livré puis abandonné.',
      'Les propriétaires qui veulent un hébergement plus rapide et fiable.',
      'Les équipes sans développeur à appeler en cas de panne.',
    ],
    problems: [
      'Un site non mis à jour se fait pirater ou tombe en panne sans prévenir.',
      'Un hébergement lent vous coûte des positions et des visiteurs.',
      'Vous ne savez pas qui appeler quand le site ne répond plus.',
    ],
    outcomes: [
      {
        metric: '[[PLACEHOLDER: ex. objectif de disponibilité de 99,9 %]]',
        label: 'Votre site reste en ligne',
      },
      {
        metric: '[[PLACEHOLDER: ex. réponse sous X heures]]',
        label: 'Un support quand vous en avez besoin',
      },
      { metric: 'Quotidiennes', label: 'Sauvegardes automatiques' },
    ],
    deliverables: [
      'Hébergement rapide et sécurisé avec SSL',
      'Migration sans perte de contenu ni de positions',
      'Mises à jour du logiciel, des extensions et de la sécurité',
      'Sauvegardes quotidiennes et surveillance de disponibilité',
      'Contrôles de vitesse et de sécurité',
      'Mises à jour de contenu et corrections sur demande',
    ],
    processNote:
      'Nous auditons l’existant, le migrons en toute sécurité, puis le gardons rapide et sûr chaque mois.',
    faqs: [
      {
        q: 'Mon site sera-t-il hors ligne pendant la migration ?',
        a: 'Nous planifions la migration pour éviter toute coupure et protégeons vos positions avec les bonnes redirections.',
      },
      {
        q: 'Pouvez-vous maintenir un site créé par quelqu’un d’autre ?',
        a: 'Oui. Nous l’auditons d’abord, puis prenons en charge les mises à jour et le support.',
      },
      {
        q: 'Où hébergez-vous les sites ?',
        a: 'Chez des prestataires fiables comme Hostinger, choisis pour leur rapidité et leur support.',
      },
      {
        q: 'Que se passe-t-il si mon site est piraté ?',
        a: 'Nous le restaurons depuis une sauvegarde saine, corrigeons la faille et renforçons la sécurité.',
      },
    ],
  },
};
