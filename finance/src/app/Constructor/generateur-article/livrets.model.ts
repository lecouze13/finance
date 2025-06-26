// livret.pages.ts
export const livrets: {
  [key: string]: { titre: string; contenu: string; description: string; categorie: string, keywords:string };
} = {
  'livret-a': {
    titre: 'Livret A',
    description: 'Tout savoir sur le Livret A : fonctionnement, taux, plafond, fiscalité, conditions d’ouverture.',
    categorie: 'epargne',
       keywords: 'livret A, épargne réglementée, taux livret A, placement sans risque, livret défiscalisé, plafond livret A',

    contenu: `
        <h2>Introduction</h2>

      <p>Le Livret A est un produit d’épargne réglementé, accessible à tous, sans frais d’ouverture ni de gestion. Il est géré par l’État français et distribué par la plupart des banques.</p>
      <h2>Fonctionnement</h2>
      <p>Les dépôts et retraits sont libres, à condition de respecter un solde minimum de 10 €.</p>
      <h2>Caractéristiques</h2>
      <ul>
        <li><strong>Taux :</strong> 2.4 % net (au 1er février 2025)</li>
        <li><strong>Plafond :</strong> 22 950 €</li>
        <li><strong>Fiscalité :</strong> Exonération totale d’impôt sur le revenu et de prélèvements sociaux</li>
        <li><strong>Liquidité :</strong> Disponible à tout moment</li>
      </ul>
      <h2>Avantages</h2>
      <ul>
        <li>Placement 100 % sécurisé</li>
        <li>Intérêts exonérés d’impôts</li>
        <li>Accessible dès la naissance</li>
      </ul>
      <h2>Inconvénients</h2>
      <ul>
        <li>Plafond relativement bas</li>
        <li>Taux fixe non indexé sur l’inflation</li>
      </ul>
    `
  },
  ldds: {
    titre: 'Livret de Développement Durable et Solidaire (LDDS)',
    description: 'Fonctionnement, conditions, taux et fiscalité du LDDS, un livret d’épargne responsable.',
    categorie: 'epargne',
        keywords: 'LDDS, livret développement durable, livret défiscalisé, taux LDDS, épargne solidaire, plafond LDDS, épargne sécurisée'
,
    contenu: `
    <h2>Introduction</h2>
      <p>Le Livret de Développement Durable et Solidaire (LDDS) est un produit d’épargne réglementé destiné à financer des projets écologiques et solidaires. Il est réservé aux résidents fiscaux français majeurs.</p>
      <h2>Caractéristiques</h2>
      <ul>
        <li><strong>Taux :</strong> 2.4 % (identique au Livret A)</li>
        <li><strong>Plafond :</strong> 12 000 €</li>
        <li><strong>Fiscalité :</strong> Exonération d’impôt sur le revenu et de prélèvements sociaux</li>
        <li><strong>Retraits :</strong> libres et sans frais</li>
      </ul>
      <h2>Conditions</h2>
      <ul>
        <li>Une seule détention par personne</li>
        <li>Réservé aux majeurs ayant un domicile fiscal en France</li>
      </ul>
      <h2>Solidarité</h2>
      <p>Les titulaires peuvent faire des dons depuis leur LDDS vers des associations d’utilité publique ou de l’économie sociale et solidaire.</p>
    `
  },
  pel: {
    titre: 'Plan Épargne Logement (PEL)',
    description: 'Découvrez le PEL, un produit d’épargne bloqué destiné à financer l’achat d’un bien immobilier.',
        keywords: 'PEL, plan épargne logement, prêt PEL, taux PEL, épargne logement, placement sécurisé, durée PEL',

    categorie: 'epargne',
    contenu: `
    <h2>Introduction</h2>
      <p>Le Plan Épargne Logement est un placement réglementé, conçu pour constituer une épargne en vue d’un projet immobilier. Il offre un taux garanti pendant toute la durée du plan.</p>
      <h2>Caractéristiques</h2>
      <ul>
        <li><strong>Durée minimale :</strong> 4 ans</li>
        <li><strong>Durée maximale :</strong> 10 ans</li>
        <li><strong>Taux :</strong> variable selon la date d’ouverture (1,75 % pour les plans ouverts après le 31 décembre 2024 et 2.25 % pour les plans ouverts avant le 31 décembre 2024)</li>
        <li><strong>Plafond :</strong> 61 200 €</li>
        <li><strong>Fiscalité :</strong> Intérêts soumis à l’impôt après 12 ans (PFU ou barème)</li>
      </ul>
      <h2>Avantages</h2>
      <ul>
        <li>Taux connu à l’avance</li>
        <li>Droit à un prêt immobilier à taux préférentiel</li>
        <li>Prime d’État possible (si prêt)</li>
      </ul>
      <h2>Inconvénients</h2>
      <ul>
        <li>Fonds bloqués pendant 4 ans</li>
        <li>Faible rendement comparé à d’autres placements</li>
      </ul>
    `
  },
  cel: {
    titre: 'Compte Épargne Logement (CEL)',
    description: 'Le CEL, un livret souple lié à un projet immobilier, avec accès à un prêt avantageux.',
        keywords: 'CEL, compte épargne logement, taux CEL, prêt immobilier CEL, épargne logement, fiscalité CEL, épargne projet immobilier',

    categorie: 'epargne',
    contenu: `
    <h2>Introduction</h2>
      <p>Le Compte Épargne Logement permet d’épargner en vue d’un projet immobilier tout en conservant une grande souplesse. Il est complémentaire au PEL.</p>
      <h2>Caractéristiques</h2>
      <ul>
        <li><strong>Taux :</strong> 1.5 % brut</li>
        <li><strong>Plafond :</strong> 15 300 €</li>
        <li><strong>Fiscalité :</strong> Intérêts exonérés d’impôt mais soumis aux prélèvements sociaux</li>
        <li><strong>Durée :</strong> illimitée</li>
      </ul>
      <h2>Avantages</h2>
      <ul>
        <li>Fonds disponibles à tout moment</li>
        <li>Ouvert aux mineurs</li>
        <li>Droit à un prêt immobilier bonifié</li>
      </ul>
      <h2>Inconvénients</h2>
      <ul>
        <li>Rendement faible</li>
        <li>Prime d’État limitée</li>
      </ul>
    `
  },
  lep: {
    titre: 'Livret d’Épargne Populaire (LEP)',
    description: 'Le LEP est un placement rémunérateur réservé aux foyers modestes, avec un taux très avantageux.',
    categorie: 'epargne',
        keywords: 'LEP, livret d’épargne populaire, livret défiscalisé, conditions LEP, taux LEP, épargne sécurisée',

    contenu: `
    <h2>Introduction</h2>
      <p>Le Livret d’Épargne Populaire est destiné aux contribuables modestes. Il offre un taux d’intérêt supérieur à celui du Livret A pour protéger l’épargne contre l’inflation.</p>
      <h2>Conditions d’éligibilité</h2>
      <p>Le revenu fiscal de référence ne doit pas dépasser un certain seuil, révisé chaque année. Pour 2025, ce seuil est de 22 419 € pour une personne seule.</p>
      <h2>Caractéristiques</h2>
      <ul>
        <li><strong>Taux :</strong> 3.5 % (en 2025)</li>
        <li><strong>Plafond :</strong> 10 000 €</li>
        <li><strong>Fiscalité :</strong> Intérêts exonérés d’impôt et de prélèvements sociaux</li>
        <li><strong>Ouverture :</strong> sur justificatif de revenu</li>
      </ul>
      <h2>Avantages</h2>
      <ul>
        <li>Taux élevé</li>
        <li>Sécurité du capital</li>
        <li>Fiscalité très avantageuse</li>
      </ul>
      <h2>Limites</h2>
      <ul>
        <li>Réservé aux foyers à revenus modestes</li>
        <li>Plafond de dépôt bas</li>
      </ul>
    `
  },'livret-bleu': {
  titre: 'Livret Bleu',
  description: 'Tout sur le Livret Bleu : fonctionnement, fiscalité, conditions et plafond. Équivalent du Livret A réservé aux clients du Crédit Mutuel.',
  categorie: 'epargne',
      keywords: 'livret bleu, crédit mutuel, équivalent livret A, taux livret bleu, épargne défiscalisée, placement sécurisé',

  contenu: `
    <h2>Introduction</h2>
    <p>Le Livret Bleu est un livret d’épargne réglementé proposé exclusivement par le Crédit Mutuel. Il fonctionne de manière identique au Livret A, avec les mêmes taux, plafonds et exonérations fiscales.</p>

    <h2>Caractéristiques</h2>
    <ul>
      <li><strong>Taux d’intérêt :</strong> 2.4 % (en 2025)</li>
      <li><strong>Plafond de versement :</strong> 22 950 € (hors intérêts capitalisés)</li>
      <li><strong>Fiscalité :</strong> Intérêts exonérés d'impôt sur le revenu et de prélèvements sociaux</li>
      <li><strong>Conditions :</strong> Réservé aux clients du Crédit Mutuel</li>
    </ul>

    <h2>Différences avec le Livret A</h2>
    <p>En pratique, il n’y a pas de différences entre le Livret Bleu et le Livret A, sauf qu’il est distribué uniquement par le Crédit Mutuel. Une personne ne peut pas posséder à la fois un Livret A et un Livret Bleu.</p>
  `
},
'livret-jeune': {
  titre: 'Livret Jeune',
  description: 'Le Livret Jeune est un produit d’épargne destiné aux 12-25 ans, avec un taux attractif et des intérêts exonérés d’impôts.',
  categorie: 'epargne',
      keywords: 'livret jeune, épargne 12-25 ans, livret défiscalisé jeune, taux livret jeune, plafond livret jeune, épargne bancaire',

  contenu: `
    <h2>Introduction</h2>
    <p>Le Livret Jeune est une épargne réglementée dédiée aux jeunes entre 12 et 25 ans résidant en France. Il permet d’épargner avec un taux généralement supérieur à celui du Livret A, tout en bénéficiant d'une exonération fiscale complète.</p>

    <h2>Caractéristiques</h2>
    <ul>
      <li><strong>Âge :</strong> de 12 à 25 ans</li>
      <li><strong>Plafond :</strong> 1 600 €</li>
      <li><strong>Taux :</strong> librement fixé par les banques mais supérieur ou égal à celui du Livret A (souvent entre 2.4 % et 4 % en 2025)</li>
      <li><strong>Fiscalité :</strong> intérêts exonérés d’impôt sur le revenu et de prélèvements sociaux</li>
      <li><strong>Disponibilité :</strong> retraits autorisés à partir de 16 ans (avec accord parental avant)</li>
    </ul>

    <h2>Avantages</h2>
    <p>Le Livret Jeune est idéal pour initier les jeunes à la gestion de leur épargne, grâce à sa fiscalité avantageuse et son rendement souvent supérieur.</p>
  `
}

};
