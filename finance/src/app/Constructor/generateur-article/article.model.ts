export const pages: {
  [key: string]: { titre: string; contenu: string; description: string };
} = {
  'pea-vs-assurance-vie': {
    titre: 'PEA ou Assurance Vie : Que choisir en 2025 ?',
    description:
      "Découvrez les différences clés entre le PEA et l'assurance vie en 2025 : fiscalité, rendement, liquidité et objectifs d'investissement.",
    contenu: `
    <h2>Introduction</h2>
    <p>Le <strong>PEA (Plan d'Épargne en Actions)</strong> et l'<strong>assurance vie</strong> sont deux piliers de l’épargne en France. En 2025, ces deux enveloppes fiscales conservent un attrait important, mais ne répondent pas aux mêmes objectifs. Comparons-les pour vous aider à faire le bon choix selon votre profil.</p>

    <h2>1. Objectifs et fonctionnement</h2>
    <h3>PEA : investir en actions européennes</h3>
    <p>Le PEA est destiné à l’investissement en <strong>actions et OPCVM européens</strong>. Il est adapté à ceux qui souhaitent dynamiser leur épargne sur le long terme tout en bénéficiant d’un cadre fiscal avantageux au bout de 5 ans.</p>

    <h3>Assurance vie : polyvalente et souple</h3>
    <p>L’assurance vie permet d’investir à la fois sur des fonds <em>euros</em> (sécurisés) et des <em>unités de compte</em> (plus risquées mais potentiellement plus rentables). Elle est aussi un outil de <strong>transmission patrimoniale</strong> et de gestion de l’épargne à moyen/long terme.</p>

    <h2>2. Fiscalité</h2>
    <h3>PEA</h3>
    <ul>
      <li><strong>0 % d’impôt</strong> sur les gains après 5 ans (hors prélèvements sociaux à 17,2 %).</li>
      <li>Avant 5 ans : flat tax à 30 % sur les gains en cas de retrait.</li>
    </ul>

    <h3>Assurance vie</h3>
    <ul>
      <li>Après 8 ans : abattement annuel de <strong>4 600 €</strong> (9 200 € pour un couple) sur les gains.</li>
      <li>Prélèvements sociaux de 17,2 % en permanence.</li>
      <li>Possibilité de choisir l’imposition au barème progressif ou à la flat tax.</li>
    </ul>

    <h2>3. Disponibilité de l’épargne</h2>
    <p>Les deux placements permettent des retraits à tout moment. Toutefois :</p>
    <ul>
      <li><strong>PEA :</strong> tout retrait avant 5 ans clôture le plan (sauf exceptions comme le départ à la retraite ou création d’entreprise).</li>
      <li><strong>Assurance vie :</strong> aucun impact fiscal majeur en cas de retrait avant 8 ans, mais fiscalité moins avantageuse.</li>
    </ul>

    <h2>4. Rendement potentiel</h2>
    <p>Le PEA, orienté actions, peut générer un rendement supérieur à long terme, mais avec plus de volatilité. L’assurance vie, en fonction de l’allocation (fonds euros vs unités de compte), peut être plus stable mais souvent moins performante sur le long terme.</p>

    <h2>5. Transmission et succession</h2>
    <ul>
      <li><strong>PEA :</strong> entre dans la succession. Pas de régime fiscal spécifique.</li>
      <li><strong>Assurance vie :</strong> exonérations importantes jusqu’à 152 500 € par bénéficiaire (si versements avant 70 ans).</li>
    </ul>

    <h2>Conclusion : PEA ou Assurance vie ?</h2>
    <p>Il ne s'agit pas de choisir l’un ou l’autre, mais souvent de les <strong>combiner intelligemment</strong>.</p>
    <ul>
      <li>Optez pour le <strong>PEA</strong> si vous cherchez à dynamiser votre épargne avec un horizon long terme et un profil dynamique.</li>
      <li>Choisissez l’<strong>assurance vie</strong> si vous voulez plus de souplesse, de diversification et préparer votre succession.</li>
    </ul>
    <p>💡 Conseil : Ouvrir les deux peut être une excellente stratégie patrimoniale !</p>
  `,
  },

  'pea': {
    titre: 'Plan d’Épargne en Actions (PEA)',
    contenu:
      "<h2>Introduction</h2><p>Le <strong>Plan d'Épargne en Actions (PEA)</strong> est un dispositif d'épargne permettant d'investir en actions européennes tout en bénéficiant d'une fiscalité avantageuse. Il est destiné aux particuliers souhaitant dynamiser leur épargne sur le long terme.</p><h2>Fonctionnement</h2><p>Le PEA permet d'investir dans des actions et des fonds d'investissement européens. Les versements sont plafonnés à 150 000 € pour un PEA classique. Les gains réalisés sont exonérés d'impôt sur le revenu après 5 ans de détention, seuls les prélèvements sociaux de 17,2 % étant dus.</p><h2>Fiscalité</h2><ul><li><strong>Avant 5 ans :</strong> Les gains sont soumis à la flat tax de 30 % (prélèvements sociaux inclus).</li><li><strong>Après 5 ans :</strong> Exonération d'impôt sur le revenu, seuls les prélèvements sociaux sont appliqués.</li></ul><h2>Transmission</h2><p>En cas de décès, le PEA entre dans la succession et est soumis aux droits de succession selon les règles en vigueur.</p><h2>Conclusion</h2><p>Le PEA est un outil efficace pour les investisseurs souhaitant bénéficier d'une fiscalité avantageuse sur leurs investissements en actions européennes, à condition de respecter les conditions de durée de détention.</p>",
    description:
      'Le Plan d’Épargne en Actions (PEA) est un placement boursier avantageux sur le long terme.',
  },

    'assurance-vie': {
    titre: 'Assurance Vie',
    contenu: `<h2>Introduction</h2><p>L'<strong>assurance vie</strong> est un contrat d'épargne permettant de se constituer un capital ou une rente, avec des avantages fiscaux, notamment en matière de transmission de patrimoine.</p><h2>Fonctionnement</h2><p>Le contrat d'assurance vie peut être alimenté par des versements libres ou programmés. Les fonds peuvent être investis en fonds euros (sécurisés) ou en unités de compte (plus risquées mais potentiellement plus rentables).</p><h2>Fiscalité</h2><ul><li><strong>Avant 8 ans :</strong> Les gains sont soumis aux prélèvements sociaux de 17,2 % et à l'impôt sur le revenu ou à la flat tax de 30 %.</li><li><strong>Après 8 ans :</strong> Abattement annuel de 4 600 € (9 200 € pour un couple) sur les gains, puis imposition selon le barème progressif ou à la flat tax.</li></ul><h2>Transmission</h2><p>En cas de décès, les sommes transmises sont exonérées de droits de succession jusqu'à 152 500 € par bénéficiaire, sous certaines conditions.</p><h2>Conclusion</h2><p>L'assurance vie est un produit d'épargne flexible, offrant des avantages fiscaux intéressants, notamment pour la transmission de patrimoine.</p>
    `,
    description:
      'Découvrez les avantages fiscaux de l’assurance vie pour épargner et transmettre votre patrimoine.',
  },
  'perco': {
    titre: 'PERCO : Plan d’Épargne pour la Retraite Collectif',
    description:
      "Le PERCO est un plan d’épargne salariale permettant de se constituer une retraite complémentaire dans un cadre fiscal avantageux.",
    contenu: `
    <h2>Introduction</h2>
    <p>Le <strong>PERCO</strong> (Plan d’Épargne pour la Retraite Collectif) est un dispositif d’épargne salariale permettant aux salariés d’épargner pour leur retraite, avec l’aide de leur entreprise.</p>

    <h2>Fonctionnement</h2>
    <p>Le PERCO est alimenté par des versements volontaires, des primes d'intéressement/participation, et des abondements de l'employeur. Les sommes sont bloquées jusqu’à la retraite (sauf cas de déblocage anticipé).</p>

    <h2>Fiscalité</h2>
    <ul>
      <li>Exonération d’impôt sur le revenu pour les sommes issues de l’épargne salariale (hors CSG/CRDS).</li>
      <li>Rente ou capital à la sortie selon le choix du salarié, avec fiscalité spécifique selon l’option.</li>
    </ul>

    <h2>Avantages</h2>
    <ul>
      <li>Abondement de l’employeur.</li>
      <li>Gestion pilotée à horizon.</li>
      <li>Fiscalité avantageuse à l’entrée et/ou à la sortie.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Le PERCO est un excellent complément de retraite pour les salariés, surtout en présence d’un abondement d’entreprise.</p>
    `,
  },

  'per': {
    titre: 'PER : Plan d’Épargne Retraite',
    description:
      "Le PER est un produit d’épargne retraite individuel ou collectif, offrant des avantages fiscaux à l’entrée ou à la sortie.",
    contenu: `
    <h2>Introduction</h2>
    <p>Le <strong>Plan d’Épargne Retraite (PER)</strong> est un dispositif d’épargne à long terme destiné à préparer sa retraite. Il remplace progressivement les anciens produits (PERP, Madelin, PERCO…).</p>

    <h2>Fonctionnement</h2>
    <p>Le PER peut être ouvert à titre individuel (PER individuel) ou via l’entreprise (PER collectif ou obligatoire). Les sommes sont investies en gestion pilotée ou libre, et sont bloquées jusqu’à la retraite (sauf cas de sortie anticipée).</p>

    <h2>Fiscalité</h2>
    <ul>
      <li><strong>À l’entrée :</strong> Les versements volontaires peuvent être déduits du revenu imposable (dans certaines limites).</li>
      <li><strong>À la sortie :</strong> Sortie possible en capital ou en rente, avec fiscalité différente selon le type de versement initial.</li>
    </ul>

    <h2>Avantages</h2>
    <ul>
      <li>Déduction fiscale à l’entrée.</li>
      <li>Flexibilité à la sortie (capital ou rente).</li>
      <li>Possibilité de transférer d’anciens contrats (PERP, Madelin, PERCO).</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Le PER est un outil puissant pour préparer sa retraite, tout en optimisant sa fiscalité pendant la phase d’épargne.</p>
    `,
  },

  'cto': {
    titre: 'Compte-Titres Ordinaire (CTO)',
    description:
      "Le CTO permet d’investir librement sur tous les marchés financiers, sans plafond mais avec une fiscalité classique.",
    contenu: `
    <h2>Introduction</h2>
    <p>Le <strong>Compte-Titres Ordinaire (CTO)</strong> est une enveloppe d’investissement permettant d’accéder à tous les marchés financiers, sans restrictions géographiques ni plafonds de versement.</p>

    <h2>Fonctionnement</h2>
    <p>Le CTO peut contenir des actions, obligations, ETF, fonds, produits dérivés, etc. Il est ouvert dans une banque ou chez un courtier, et offre une grande liberté d’investissement.</p>

    <h2>Fiscalité</h2>
    <ul>
      <li>Imposition des gains (dividendes, plus-values) à la <strong>flat tax de 30 %</strong> (12,8 % d’impôt + 17,2 % de prélèvements sociaux).</li>
      <li>Possibilité d’opter pour le barème progressif de l’impôt sur le revenu.</li>
    </ul>

    <h2>Avantages</h2>
    <ul>
      <li>Aucune limite de versement.</li>
      <li>Accès à tous les types de titres financiers.</li>
      <li>Grande flexibilité de gestion.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Le CTO est une solution idéale pour les investisseurs expérimentés qui souhaitent une liberté totale d’investissement, en contrepartie d’une fiscalité moins avantageuse que le PEA.</p>
    `,
  },

   
  
};
