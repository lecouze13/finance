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
        <li><strong>Taux :</strong> 1.7 % net (au 1er aout 2025)</li>
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
        <li><strong>Taux :</strong> 1.7 % (identique au Livret A)</li>
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
        <li><strong>Taux :</strong> 2.7 % (en 2025)</li>
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
      <li><strong>Taux d’intérêt :</strong> 1.7 % (en 2025)</li>
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
      <li><strong>Taux :</strong> librement fixé par les banques mais supérieur ou égal à celui du Livret A (souvent entre 1.7 % et 2.4% en 2025)</li>
      <li><strong>Fiscalité :</strong> intérêts exonérés d’impôt sur le revenu et de prélèvements sociaux</li>
      <li><strong>Disponibilité :</strong> retraits autorisés à partir de 16 ans (avec accord parental avant)</li>
    </ul>

    <h2>Avantages</h2>
    <p>Le Livret Jeune est idéal pour initier les jeunes à la gestion de leur épargne, grâce à sa fiscalité avantageuse et son rendement souvent supérieur.</p>
  `
},
'lea': {
  titre: 'Livret d’Épargne pour les Autres (LEA)',
  description: 'Le Livret d’Épargne pour les Autres est un produit d’épargne destiné aux personnes ne pouvant pas ouvrir les livrets réglementés classiques, offrant un placement sécurisé et flexible.',
  categorie: 'epargne',
  keywords: 'livret épargne pour les autres, LEA, épargne accessible, taux livret, placement sécurisé',

  contenu: `
    <h2>Introduction</h2>
    <p>Le Livret d’Épargne pour les Autres (LEA) est un compte d’épargne conçu pour permettre à un public plus large d’épargner dans des conditions sécurisées. Ce livret s’adresse notamment aux personnes ne remplissant pas les critères d’éligibilité des livrets réglementés traditionnels.</p>

    <h2>Caractéristiques</h2>
    <ul>
      <li><strong>Ouverture :</strong> accessible à tous, sans conditions de revenus ou de situation</li>
      <li><strong>Plafond :</strong> variable selon les établissements, souvent plus élevé que les livrets réglementés</li>
      <li><strong>Taux d’intérêt :</strong> fixé librement par la banque, généralement compétitif mais non réglementé</li>
      <li><strong>Fiscalité :</strong> les intérêts sont soumis à l’impôt sur le revenu et aux prélèvements sociaux</li>
      <li><strong>Disponibilité :</strong> retraits possibles à tout moment sans frais</li>
      <li><strong>Frais :</strong> généralement aucun frais d’ouverture ni de gestion</li>
    </ul>

    <h2>Avantages</h2>
    <p>Le LEA offre une solution d’épargne accessible à tous, notamment aux personnes non éligibles aux livrets réglementés. Il combine flexibilité et sécurité, avec la possibilité de retirer les fonds à tout moment.</p>

    <h2>Inconvénients</h2>
    <p>Les intérêts du LEA ne bénéficient pas des avantages fiscaux des livrets réglementés, ce qui peut rendre ce produit moins attractif selon le taux proposé par la banque.</p>

    <h2>Comment ouvrir un LEA ?</h2>
    <p>Ce livret est proposé par certaines banques et établissements financiers. Pour l’ouvrir, il suffit de se rendre en agence ou sur le site de la banque et de fournir une pièce d’identité ainsi qu’un justificatif de domicile.</p>
  `
},
'reforme-taux-aout-2025': {
  titre: 'Réforme des taux des livrets d’épargne – 1ᵉʳ août 2025',
  description: 'Découvrez les nouveaux taux 2025 des livrets réglementés (Livret A, LDDS, LEP, PEL, CEL…) après la réforme du 1er août : baisses, formules de calcul, impacts pour les épargnants.',
  categorie: 'epargne',
  keywords: 'réforme taux livret 2025, livret A août 2025, nouveau taux LDDS, baisse taux LEP, taux PEL 2025, CEL, taux livret jeune, livret réglementé, placement sécurisé',

  contenu: `
  <p>À partir du <strong>1er août 2025</strong>, plusieurs livrets d’épargne réglementés voient leurs taux ajustés, conformément aux formules semestrielles fixées par la Banque de France et le ministère de l’Économie.</p>

  <h2>📉 Livret A & LDDS</h2>
  <p>
    <strong>Taux avant le 1er août 2025 :</strong> 2,40 %<br>
    <strong>Nouveau taux :</strong> 1,70 %<br>
    Le gouvernement applique strictement la formule liée à l’inflation (0,88 %) et au taux €STR.
  </p>

  <h2>📈 Livret d’Épargne Populaire (LEP)</h2>
  <p>
    <strong>Taux avant :</strong> 3,50 %<br>
    <strong>Nouveau taux :</strong> 2,70 %<br>
    La formule réglementaire aurait abaissé le LEP à ~2,20 %, mais le gouvernement a maintenu un coup de pouce pour protéger les ménages modestes.
  </p>

  <h2>🏦 Autres livrets réglementés</h2>
  <ul>
    <li><strong>LDDS</strong> : aligné sur le Livret A → <strong>1,70 %</strong>.</li>
    <li><strong>Livret Jeune</strong> : taux libre mais ≥ Livret A → ≥ <strong>1,70 %</strong>.</li>
    <li><strong>CEL (Compte Épargne Logement)</strong> : 2/3 du taux Livret A arrondi → environ <strong>1,13 %</strong>, mais souvent arrondi à <strong>1,50 %</strong>.</li>
    <li><strong>PEL (Plan Épargne Logement)</strong> :
      <ul>
        <li><strong>1,75 %</strong> pour les nouveaux PEL ouverts après le 31 décembre 2024</li>
        <li>Les anciens gardent leur taux (ex. 2,25 %).</li>
      </ul>
    </li>
  </ul>

  <h2>📋 Tableau synthèse</h2>
  <table border="1" cellpadding="4">
    <thead><tr><th>Livret</th><th>Avant 1ᵉʳ août</th><th>Après 1ᵉʳ août 2025</th></tr></thead>
    <tbody>
      <tr><td>Livret A</td><td>2,40 %</td><td>1,70 %</td></tr>
      <tr><td>LDDS</td><td>2,40 %</td><td>1,70 %</td></tr>
      <tr><td>LEP</td><td>3,50 %</td><td>2,70 %</td></tr>
      <tr><td>Livret Jeune</td><td>≥ 2,40 %</td><td>≥ 1,70 %</td></tr>
      <tr><td>CEL</td><td>≈ 1,60 %</td><td>≈ 1,13 % (ou 1,50 %)</td></tr>
      <tr><td>PEL (nouveau)</td><td>N/A</td><td>1,75 %</td></tr>
      <tr><td>PEL (ancien)</td><td>2,25 % ou +</td><td>inchangé</td></tr>
    </tbody>
  </table>

  <h2>🔮 Pourquoi ces ajustements ?</h2>
  <p>La formule de calcul prend en compte :</p>
  <ul>
    <li>L’inflation (0,88 % sur le dernier semestre)</li>
    <li>Le taux interbancaire européen (€STR)</li>
  </ul>
  <p>Le Livret A bénéficie directement de cette formule. Le LEP, lui, a été ajusté pour préserver le pouvoir d’achat des plus modestes.</p>

  <h2>🔍 Impacts pour les épargnants</h2>
  <p>Les livrets restent au‑dessus de l’inflation, assurant un rendement réel positif. Cependant, l’équivalent annuel à plein plafond baisse : ex. pour le Livret A, la différence sur 22 950 € est notable.</p>

  <h2>🎯 Conclusion</h2>
  <p>La réforme du 1ᵉʳ août 2025 adapte les taux des livrets réglementés à un contexte économique plus calme. Le Livret A et le LDDS passent à 1,70 %, le LEP reste avantageux à 2,70 %. Le CEL et le PEL évoluent selon leurs règles spécifiques. Ces produits conservent leur sécurité, leur liquidité et leur fiscalité favorable.</p>
  `
}

};
