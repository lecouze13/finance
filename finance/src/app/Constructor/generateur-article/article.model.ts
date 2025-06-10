export const pages: { [key: string]: { titre: string; contenu: string; description: string } } = {
  'pea-vs-assurance-vie': {

  titre: "PEA ou Assurance Vie : Que choisir en 2025 ?",
  description: "Découvrez les différences clés entre le PEA et l'assurance vie en 2025 : fiscalité, rendement, liquidité et objectifs d'investissement.",
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
  `
  },
    'assurance-vie': {
    titre: 'Assurance Vie',
    contenu: `
      <p>L’<strong>assurance vie</strong> est un placement populaire en France.</p>
      <ul>
        <li>Fiscalité avantageuse</li>
        <li>Souplesse des versements</li>
        <li>Transmission du capital facilitée</li>
      </ul>
    `,
    description: 'Découvrez les avantages fiscaux de l’assurance vie pour épargner et transmettre votre patrimoine.'
  },
  'pea': {
    titre: 'Plan d’Épargne en Actions (PEA)',
    contenu: `
      <p>Le <strong>PEA</strong> permet d’investir en actions tout en bénéficiant d’une fiscalité réduite.</p>
      <p>Idéal pour les investisseurs à long terme.</p>
    `,
    description: 'Le Plan d’Épargne en Actions (PEA) est un placement boursier avantageux sur le long terme.'
  }


}
