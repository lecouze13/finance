import { indice } from "./indice.model";
import { livrets } from "./livrets.model";
import { immobilier } from "./immobilier.model";

export const pages: {
  [key: string]: { titre: string; contenu: string; description: string, categorie: string, keywords: string };
} = {
  ...livrets,
  ...indice,
  ...immobilier,

  'pea-vs-assurance-vie': {
    titre: 'PEA ou Assurance Vie : Que choisir en 2025 ?',
    description:
      "Découvrez les différences clés entre le PEA et l'assurance vie en 2025 : fiscalité, rendement, liquidité et objectifs d'investissement.",
    keywords: 'PEA ou assurance vie, comparaison PEA assurance vie, meilleur placement long terme, fiscalité assurance vie, fiscalité PEA, PEA vs assurance vie',

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
    categorie: 'investissement'

  },

  'pea': {
    titre: 'Plan d’Épargne en Actions (PEA)',
    keywords: 'PEA, plan épargne en actions, fiscalité PEA, investir en bourse, avantages PEA, plafond PEA, placement boursier',

    contenu:
      "<h2>Introduction</h2><p>Le <strong>Plan d'Épargne en Actions (PEA)</strong> est un dispositif d'épargne permettant d'investir en actions européennes tout en bénéficiant d'une fiscalité avantageuse. Il est destiné aux particuliers souhaitant dynamiser leur épargne sur le long terme.</p><h2>Fonctionnement</h2><p>Le PEA permet d'investir dans des actions et des fonds d'investissement européens. Les versements sont plafonnés à 150 000 € pour un PEA classique. Les gains réalisés sont exonérés d'impôt sur le revenu après 5 ans de détention, seuls les prélèvements sociaux de 17,2 % étant dus.</p><h2>Fiscalité</h2><ul><li><strong>Avant 5 ans :</strong> Les gains sont soumis à la flat tax de 30 % (prélèvements sociaux inclus).</li><li><strong>Après 5 ans :</strong> Exonération d'impôt sur le revenu, seuls les prélèvements sociaux sont appliqués.</li></ul><h2>Transmission</h2><p>En cas de décès, le PEA entre dans la succession et est soumis aux droits de succession selon les règles en vigueur.</p><h2>Conclusion</h2><p>Le PEA est un outil efficace pour les investisseurs souhaitant bénéficier d'une fiscalité avantageuse sur leurs investissements en actions européennes, à condition de respecter les conditions de durée de détention.</p>",
    description:
      'Le Plan d’Épargne en Actions (PEA) est un placement boursier avantageux sur le long terme.',
    categorie: 'investissement'

  },

  'assurance-vie': {
    titre: 'Assurance Vie',
    keywords: 'assurance vie, placement assurance vie, fiscalité assurance vie, rachat assurance vie, rendement assurance vie, épargne long terme',

    contenu: `<h2>Introduction</h2><p>L'<strong>assurance vie</strong> est un contrat d'épargne permettant de se constituer un capital ou une rente, avec des avantages fiscaux, notamment en matière de transmission de patrimoine.</p><h2>Fonctionnement</h2><p>Le contrat d'assurance vie peut être alimenté par des versements libres ou programmés. Les fonds peuvent être investis en fonds euros (sécurisés) ou en unités de compte (plus risquées mais potentiellement plus rentables).</p><h2>Fiscalité</h2><ul><li><strong>Avant 8 ans :</strong> Les gains sont soumis aux prélèvements sociaux de 17,2 % et à l'impôt sur le revenu ou à la flat tax de 30 %.</li><li><strong>Après 8 ans :</strong> Abattement annuel de 4 600 € (9 200 € pour un couple) sur les gains, puis imposition selon le barème progressif ou à la flat tax.</li></ul><h2>Transmission</h2><p>En cas de décès, les sommes transmises sont exonérées de droits de succession jusqu'à 152 500 € par bénéficiaire, sous certaines conditions.</p><h2>Conclusion</h2><p>L'assurance vie est un produit d'épargne flexible, offrant des avantages fiscaux intéressants, notamment pour la transmission de patrimoine.</p>
    `,
    categorie: 'investissement',

    description:
      'Découvrez les avantages fiscaux de l’assurance vie pour épargner et transmettre votre patrimoine.',
  },
  'perco': {
    titre: 'PERCO : Plan d’Épargne pour la Retraite Collectif',
    keywords: 'PERCO, plan épargne retraite collectif, épargne salariale, retraite entreprise, avantages PERCO, sortie en capital',


    description:
      "Le PERCO est un plan d’épargne salariale permettant de se constituer une retraite complémentaire dans un cadre fiscal avantageux.",

    categorie: 'investissement',
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
    categorie: 'investissement',
    keywords: 'PER, plan épargne retraite, retraite complémentaire, fiscalité PER, déduction impôts PER, sortie en rente, placement retraite',

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
    categorie: 'investissement',
    keywords: 'CTO, compte-titres ordinaire, investir en bourse, fiscalité CTO, dividendes CTO, titres étrangers, placement libre',

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
  'assurance-vie-luxembourgeoise': {
    titre: 'Assurance Vie Luxembourgeoise',
    categorie: 'investissement',
    keywords: 'assurance vie luxembourgeoise, contrat luxembourg, triangle de sécurité, fiscalité expatrié, sur-mesure luxembourg, haut de gamme assurance vie'
    ,
    description:
      "L’assurance vie luxembourgeoise est un contrat d’investissement offrant une grande sécurité juridique, une flexibilité fiscale et une large gamme de supports d’investissement.",
    contenu: `
  <h2>Introduction</h2>
  <p>L’<strong>assurance vie luxembourgeoise</strong> est un produit d’épargne et d’investissement haut de gamme, prisé pour sa protection juridique, sa neutralité fiscale et sa souplesse dans la gestion des actifs financiers.</p>

  <h2>Fonctionnement</h2>
  <p>Ce contrat est souscrit auprès d’une compagnie d’assurance basée au Luxembourg. Il permet d’investir dans des fonds euros, des unités de compte (UC), des fonds internes dédiés (FID) ou des fonds d’assurance spécialisés (FAS).</p>
  <p>Le contrat est multi-devises, multi-gestionnaires, et peut être géré en architecture ouverte, offrant ainsi une grande personnalisation.</p>

  <h2>Fiscalité</h2>
  <ul>
    <li>Pas d’imposition luxembourgeoise sur les gains : la fiscalité applicable est celle du pays de résidence du souscripteur.</li>
    <li>En France, fiscalité avantageuse en cas de retrait après 8 ans (abattement annuel sur les gains, puis flat tax de 7,5 % ou 12,8 % + 17,2 % de prélèvements sociaux).</li>
    <li>Transmission facilitée avec un cadre fiscal avantageux (article 990 I du CGI).</li>
  </ul>

  <h2>Avantages</h2>
  <ul>
    <li><strong>Triangle de sécurité luxembourgeois</strong> : séparation stricte entre les actifs de l’assureur et ceux des assurés, avec garantie par le Commissariat aux Assurances (CAA).</li>
    <li>Protection des avoirs jusqu’à 100 % des montants déposés, sans plafond.</li>
    <li>Souplesse de gestion et large choix de supports d’investissement internationaux.</li>
    <li>Optimisation patrimoniale, successorale et fiscale pour les investisseurs fortunés ou expatriés.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>L’assurance vie luxembourgeoise est un outil performant pour les investisseurs recherchant une combinaison de sécurité juridique, de flexibilité et de stratégie patrimoniale internationale. Elle s’adresse particulièrement aux profils fortunés ou internationaux.</p>
  `,
  },
  'credit-lombard': {
    titre: 'Crédit Lombard',
    categorie: 'investissement',
    keywords: 'crédit lombard, prêt adossé portefeuille, levier investissement, financement bourse, effet de levier, nantissement titres',

    description:
      "Le crédit lombard est un prêt garanti par un portefeuille de titres financiers, offrant une solution de financement flexible et rapide pour les investisseurs disposant d’actifs.",
    contenu: `
  <h2>Introduction</h2>
  <p>Le <strong>crédit lombard</strong> est un prêt à court ou moyen terme accordé par une banque ou un établissement financier, garanti par un portefeuille de valeurs mobilières (actions, obligations, OPCVM, contrats d’assurance vie, etc.). Il permet d’obtenir des liquidités sans avoir à vendre ses actifs.</p>

  <h2>Fonctionnement</h2>
  <p>Le montant du crédit dépend de la valeur des titres mis en garantie, appelée valeur de nantissement, et du niveau de risque de ces actifs. Le ratio de prêt varie généralement entre 50 % et 90 % selon la qualité du portefeuille.</p>
  <p>Le crédit peut être utilisé librement : financement personnel, investissement immobilier, réinvestissement en bourse, etc. Les intérêts sont dus uniquement sur les sommes utilisées.</p>

  <h2>Fiscalité</h2>
  <ul>
    <li>Pas de fiscalité spécifique liée à la mise en place du crédit lombard.</li>
    <li>Les intérêts d’emprunt peuvent, dans certains cas, être déductibles des revenus (notamment dans le cadre de l’ISF/IFI ou d’un montage patrimonial structuré).</li>
    <li>Les actifs nantissants ne sont pas vendus, ce qui évite la réalisation de plus-values et donc l’imposition immédiate.</li>
  </ul>

  <h2>Avantages</h2>
  <ul>
    <li><strong>Accès rapide à des liquidités</strong> sans avoir à désinvestir.</li>
    <li><strong>Optimisation fiscale</strong> : maintien des titres en portefeuille, report de l’imposition des plus-values.</li>
    <li><strong>Effet de levier</strong> : possibilité de réinvestir les fonds empruntés pour augmenter le rendement global du patrimoine.</li>
    <li><strong>Souplesse</strong> dans le remboursement : crédit in fine ou amortissable, taux fixe ou variable.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le crédit lombard est un outil de financement patrimonial puissant, permettant de mobiliser la valeur d’un portefeuille sans le vendre. Il s’adresse particulièrement aux investisseurs avertis ou fortunés souhaitant gérer leur trésorerie ou optimiser leur stratégie financière sans perturber leur allocation d’actifs.</p>
  <p>Pour estimer le montant que vous pouvez emprunter avec vos titres, essayez notre <a href="/simulateur-credit-lombard">simulateur de crédit lombard</a>.</p>
  `,
  },
  'etf': {
    titre: 'ETF (Exchange Traded Funds) ',
    categorie: 'investissement',
    keywords: 'ETF, fonds indiciels, investir ETF, bourse passive, ETF CAC 40, ETF S&P 500, diversification portefeuille',

    description:
      "Les ETF (Exchange Traded Funds) permettent d'investir facilement et à moindre coût sur les marchés financiers. Découvrez comment ils fonctionnent, leurs avantages et leurs usages pour les investisseurs particuliers.",
    contenu: `
  <h2>Qu’est-ce qu’un ETF&nbsp;?</h2>
  <p>Un <strong>ETF</strong> (Exchange Traded Fund), aussi appelé <strong>tracker</strong>, est un fonds d’investissement coté en bourse qui réplique la performance d’un indice (comme le CAC 40, le S&P 500, le MSCI World, etc.). Il permet d’investir facilement dans un panier d’actions ou d’obligations, tout en bénéficiant d’une grande liquidité.</p>

  <h2>Comment ça fonctionne&nbsp;?</h2>
  <p>Les ETF sont achetés et vendus en bourse comme des actions classiques. Leur prix évolue tout au long de la journée, en fonction de la valeur de l’indice qu’ils suivent. Ils peuvent être logés dans un <strong>PEA</strong>, une <strong>assurance vie</strong>, un <strong>compte-titres</strong> ou un <strong>PER</strong>.</p>
  <p>Ils peuvent être à réplication <strong>physique</strong> (achat réel des actifs) ou <strong>synthétique</strong> (via un contrat avec une banque).</p>

  <h2>Avantages des ETF</h2>
  <ul>
    <li><strong>Frais réduits</strong> : bien moins chers que les fonds traditionnels (souvent moins de 0,30&nbsp;% par an).</li>
    <li><strong>Diversification immédiate</strong> : avec un seul achat, vous accédez à des dizaines voire des centaines d’actifs.</li>
    <li><strong>Transparence</strong> : composition des ETF publique et mise à jour quotidienne.</li>
    <li><strong>Souplesse d’utilisation</strong> : achat et vente en temps réel, possibilité d’investissement programmé.</li>
  </ul>

  <h2>Risques à connaître</h2>
  <ul>
    <li><strong>Risque de marché</strong> : comme tout investissement en bourse, le capital n’est pas garanti.</li>
    <li><strong>Risque de tracking error</strong> : l’ETF peut s’écarter légèrement de l’indice qu’il réplique.</li>
    <li><strong>Risque de change</strong> : pour les ETF libellés en devises étrangères non couvertes.</li>
  </ul>

  <h2>Utilisation dans une stratégie long terme</h2>
  <p>Les ETF sont particulièrement adaptés à une <strong>stratégie passive</strong> d’investissement à long terme (approche “buy & hold”). Ils permettent de construire un portefeuille robuste, mondialement diversifié et très peu coûteux.</p>
  <p>Ils sont souvent utilisés dans les portefeuilles de type <em>lazy portfolios</em> ou dans une stratégie d’indépendance financière (FIRE).</p>

  <h2>Fiscalité</h2>
  <p>La fiscalité dépend du support utilisé&nbsp;:</p>
  <ul>
    <li>Dans un <strong>PEA</strong> : exonération d’impôt sur les plus-values après 5 ans, hors prélèvements sociaux.</li>
    <li>Dans une <strong>assurance vie</strong> : fiscalité avantageuse après 8 ans, selon les retraits effectués.</li>
    <li>Dans un <strong>compte-titres</strong> : imposition au PFU (30&nbsp;%), ou au barème progressif si option.</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Les ETF sont un outil moderne, simple et efficace pour investir en bourse. Ils s’adressent aussi bien aux débutants qu’aux investisseurs expérimentés souhaitant optimiser leur performance sur le long terme sans y consacrer trop de temps. Avant d’investir, il est essentiel de bien choisir ses indices et son enveloppe fiscale.</p>
  <p>Envie de construire un portefeuille ETF personnalisé&nbsp;? Découvrez nos outils pour comparer les supports d’investissement (PEA, PER, assurance vie, CTO) et simuler vos performances potentielles.</p>
  `
  },
  'obligations': {
    titre: 'Obligations : fonctionnement, avantages et risques',
    categorie: 'investissement',
    keywords: 'obligations, investissement obligataire, rendement fixe, obligations d’État, obligations entreprises, taux d’intérêt',
    description:
      "Les obligations sont des titres de créance permettant d'investir avec un rendement généralement fixe. Découvrez comment elles fonctionnent, les types d'obligations et leurs avantages pour les investisseurs.",
    contenu: `
  <h2>Qu’est-ce qu’une obligation&nbsp;?</h2>
  <p>Une <strong>obligation</strong> est un titre de créance émis par un État, une entreprise ou une collectivité, pour emprunter de l’argent sur les marchés financiers. En achetant une obligation, vous prêtez de l’argent à l’émetteur, qui vous verse des <strong>intérêts réguliers</strong> (le <em>coupon</em>) et vous rembourse le capital à l’échéance.</p>

  <h2>Fonctionnement des obligations</h2>
  <p>Chaque obligation a :</p>
  <ul>
    <li>Un <strong>montant nominal</strong> (ex. 1 000&nbsp;€),</li>
    <li>Un <strong>taux d’intérêt</strong> (fixe ou variable),</li>
    <li>Une <strong>échéance</strong> (ex. 5 ou 10 ans),</li>
    <li>Une <strong>notation</strong> qui évalue le risque de défaut.</li>
  </ul>
  <p>Les obligations peuvent être revendues sur les marchés avant leur échéance. Leur prix varie selon les taux d’intérêt et la solvabilité de l’émetteur.</p>

  <h2>Types d’obligations</h2>
  <ul>
    <li><strong>Obligations d’État</strong> : emprunts des pays (ex. OAT en France, Bund en Allemagne).</li>
    <li><strong>Obligations d’entreprises</strong> : souvent plus risquées mais plus rémunératrices.</li>
    <li><strong>Obligations indexées</strong> : le coupon évolue avec l’inflation.</li>
  </ul>

  <h2>Avantages des obligations</h2>
  <ul>
    <li><strong>Revenus réguliers</strong> grâce aux coupons.</li>
    <li><strong>Moins volatiles</strong> que les actions en général.</li>
    <li><strong>Bonne diversification</strong> dans un portefeuille mixte.</li>
  </ul>

  <h2>Risques à connaître</h2>
  <ul>
    <li><strong>Risque de taux</strong> : une hausse des taux fait baisser le prix des obligations existantes.</li>
    <li><strong>Risque de crédit</strong> : en cas de défaut de l’émetteur, vous pouvez perdre votre capital.</li>
    <li><strong>Risque de liquidité</strong> : certaines obligations se revendent difficilement.</li>
  </ul>

  <h2>Fiscalité</h2>
  <p>Les revenus obligataires sont généralement soumis au <strong>prélèvement forfaitaire unique (PFU) de 30&nbsp;%</strong>, sauf choix du barème de l’impôt sur le revenu.</p>

  <h2>Conclusion</h2>
  <p>Les obligations sont idéales pour les investisseurs recherchant <strong>stabilité et revenus fixes</strong>. Elles s’intègrent bien dans une stratégie de diversification ou de préparation à la retraite. Cependant, il est crucial d’évaluer la qualité de l’émetteur et les conditions de taux avant d’investir.</p>
  `
  },

}




