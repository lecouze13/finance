export const immobilier: {
  [key: string]: { titre: string; contenu: string; description: string, categorie: string, keywords: string };
} = {
  'investissement-locatif': {
    titre: 'Guide complet de l\'investissement locatif en 2025',
    categorie: 'immobilier',
    keywords: 'investissement locatif, rendement locatif, acheter pour louer, rentabilité immobilière, investir dans l\'immobilier, revenus fonciers',
    description: `L'investissement locatif est une stratégie patrimoniale permettant de générer des revenus passifs tout en construisant un patrimoine. Découvrez comment réussir votre projet.`,
    contenu: `
  <h2>Qu'est-ce que l'investissement locatif ?</h2>
  <p>L'<strong>investissement locatif</strong> consiste à acheter un bien immobilier dans le but de le mettre en location. C'est l'une des stratégies les plus populaires pour construire un patrimoine et générer des revenus complémentaires.</p>

  <h2>Pourquoi investir dans l'immobilier locatif ?</h2>
  <ul>
    <li><strong>Revenus passifs</strong> : les loyers génèrent un cash-flow mensuel</li>
    <li><strong>Effet de levier</strong> : le crédit permet d'investir avec peu d'apport</li>
    <li><strong>Valorisation du patrimoine</strong> : plus-value potentielle à la revente</li>
    <li><strong>Protection contre l'inflation</strong> : les loyers suivent généralement l'inflation</li>
    <li><strong>Avantages fiscaux</strong> : nombreux dispositifs de défiscalisation</li>
  </ul>

  <h2>Les différents types d'investissement locatif</h2>
  <h3>Location nue</h3>
  <p>Le bien est loué vide. Bail de 3 ans minimum, loyers imposés comme revenus fonciers.</p>

  <h3>Location meublée (LMNP/LMP)</h3>
  <p>Le bien est loué équipé. Avantages fiscaux importants avec le régime BIC et l'amortissement.</p>

  <h3>Colocation</h3>
  <p>Location à plusieurs locataires. Rendement supérieur mais gestion plus complexe.</p>

  <h3>Location saisonnière</h3>
  <p>Location courte durée (Airbnb). Rendement potentiel élevé mais réglementation stricte.</p>

  <h2>Les critères d'un bon investissement</h2>
  <ul>
    <li><strong>Emplacement</strong> : proximité transports, commerces, écoles</li>
    <li><strong>Rendement brut</strong> : viser au minimum 5-7% en province, 3-4% à Paris</li>
    <li><strong>Tension locative</strong> : demande supérieure à l'offre</li>
    <li><strong>Prix au m²</strong> : en dessous du marché si possible</li>
    <li><strong>État du bien</strong> : travaux à prévoir = négociation possible</li>
  </ul>

  <h2>Financer son investissement</h2>
  <p>Le <strong>crédit immobilier</strong> est la clé de l'effet de levier. Points importants :</p>
  <ul>
    <li><strong>Taux d'endettement</strong> : maximum 35% des revenus</li>
    <li><strong>Apport</strong> : généralement 10-20% pour les frais de notaire</li>
    <li><strong>Durée</strong> : 20-25 ans pour optimiser le cash-flow</li>
    <li><strong>Différé</strong> : possible pour les travaux</li>
  </ul>

  <h2>Fiscalité de l'investissement locatif</h2>
  <ul>
    <li><strong>Revenus fonciers</strong> : imposition au barème + 17,2% PS (location nue)</li>
    <li><strong>BIC</strong> : régime micro ou réel pour le meublé</li>
    <li><strong>Déficit foncier</strong> : déductible jusqu'à 10 700€ par an</li>
    <li><strong>Dispositifs</strong> : Pinel, Denormandie, Loc'Avantages</li>
  </ul>

  <h2>Conclusion</h2>
  <p>L'investissement locatif reste l'un des meilleurs moyens de construire un patrimoine en France. Avec une bonne préparation, un emplacement stratégique et une fiscalité optimisée, il permet de générer des revenus passifs tout en se constituant un capital pour la retraite.</p>
  `
  },

  'lmnp-guide': {
    titre: 'LMNP : Le guide complet de la Location Meublée Non Professionnelle',
    categorie: 'immobilier',
    keywords: 'LMNP, location meublée non professionnelle, amortissement LMNP, régime réel LMNP, micro-BIC, investissement meublé',
    description: `Le statut LMNP (Location Meublée Non Professionnelle) offre des avantages fiscaux exceptionnels pour les investisseurs immobiliers. Découvrez comment en profiter.`,
    contenu: `
  <h2>Qu'est-ce que le LMNP ?</h2>
  <p>Le statut <strong>LMNP</strong> (Loueur en Meublé Non Professionnel) s'applique aux propriétaires qui louent un bien meublé et dont les revenus locatifs sont inférieurs à 23 000€ par an ou représentent moins de 50% de leurs revenus globaux.</p>

  <h2>Conditions pour être LMNP</h2>
  <ul>
    <li>Louer un logement meublé (liste de meubles obligatoires définie par décret)</li>
    <li>Recettes locatives < 23 000€/an OU < 50% des revenus du foyer</li>
    <li>S'immatriculer au greffe du tribunal de commerce (formulaire P0i)</li>
  </ul>

  <h2>Les 2 régimes fiscaux</h2>
  <h3>Régime Micro-BIC</h3>
  <ul>
    <li>Abattement forfaitaire de 50% (71% pour meublés de tourisme classés)</li>
    <li>Applicable si recettes < 77 700€/an</li>
    <li>Simplicité de déclaration</li>
  </ul>

  <h3>Régime Réel Simplifié</h3>
  <ul>
    <li>Déduction de toutes les charges réelles</li>
    <li><strong>Amortissement du bien et des meubles</strong> : avantage majeur</li>
    <li>Souvent plus avantageux dès que les charges sont importantes</li>
  </ul>

  <h2>L'amortissement : l'atout majeur du LMNP</h2>
  <p>En régime réel, vous pouvez <strong>amortir</strong> :</p>
  <ul>
    <li>La valeur du bien (hors terrain) sur 25-30 ans</li>
    <li>Les meubles sur 5-10 ans</li>
    <li>Les travaux sur leur durée d'usage</li>
  </ul>
  <p>Cet amortissement réduit le bénéfice imposable, parfois jusqu'à 0€ d'impôt pendant de nombreuses années !</p>

  <h2>Charges déductibles en régime réel</h2>
  <ul>
    <li>Intérêts d'emprunt</li>
    <li>Frais de gestion et comptabilité</li>
    <li>Taxe foncière</li>
    <li>Assurances</li>
    <li>Travaux d'entretien et réparation</li>
    <li>Charges de copropriété</li>
  </ul>

  <h2>LMNP vs Location nue</h2>
  <table>
    <tr><th>Critère</th><th>LMNP</th><th>Location nue</th></tr>
    <tr><td>Fiscalité</td><td>BIC (amortissement)</td><td>Revenus fonciers</td></tr>
    <tr><td>Loyer</td><td>+10 à 20% vs nu</td><td>Standard</td></tr>
    <tr><td>Durée bail</td><td>1 an (9 mois étudiant)</td><td>3 ans minimum</td></tr>
    <tr><td>Gestion</td><td>Plus lourde</td><td>Plus simple</td></tr>
  </table>

  <h2>Conclusion</h2>
  <p>Le LMNP est l'un des régimes les plus avantageux pour l'investisseur immobilier. Grâce à l'amortissement, il permet souvent de ne payer aucun impôt sur les loyers pendant de nombreuses années. À condition de bien gérer sa comptabilité et de respecter les obligations.</p>
  `
  },

  'sci-immobiliere': {
    titre: 'SCI : Société Civile Immobilière - Guide complet',
    categorie: 'immobilier',
    keywords: 'SCI, société civile immobilière, SCI familiale, IR ou IS, transmission patrimoine, gestion immobilière',
    description: `La SCI (Société Civile Immobilière) est un outil puissant pour gérer et transmettre un patrimoine immobilier. Découvrez ses avantages et son fonctionnement.`,
    contenu: `
  <h2>Qu'est-ce qu'une SCI ?</h2>
  <p>La <strong>SCI</strong> (Société Civile Immobilière) est une structure juridique permettant à plusieurs personnes de détenir et gérer ensemble un ou plusieurs biens immobiliers. Elle est particulièrement utilisée pour la gestion familiale du patrimoine.</p>

  <h2>Pourquoi créer une SCI ?</h2>
  <ul>
    <li><strong>Éviter l'indivision</strong> : facilite la gestion entre plusieurs propriétaires</li>
    <li><strong>Transmission du patrimoine</strong> : donation progressive des parts</li>
    <li><strong>Protection du conjoint</strong> : le démembrement protège le survivant</li>
    <li><strong>Optimisation fiscale</strong> : choix entre IR et IS</li>
    <li><strong>Séparation patrimoine pro/perso</strong> : pour les entrepreneurs</li>
  </ul>

  <h2>SCI à l'IR ou à l'IS ?</h2>
  <h3>SCI à l'IR (Impôt sur le Revenu)</h3>
  <ul>
    <li>Revenus imposés entre les mains des associés</li>
    <li>Régime des plus-values des particuliers (exonération après 22 ans)</li>
    <li>Pas d'amortissement possible</li>
  </ul>

  <h3>SCI à l'IS (Impôt sur les Sociétés)</h3>
  <ul>
    <li>Imposition au taux de l'IS (15% jusqu'à 42 500€, puis 25%)</li>
    <li>Amortissement du bien possible</li>
    <li>Plus-values professionnelles à la revente (moins avantageux)</li>
    <li>Dividendes imposés à la sortie</li>
  </ul>

  <h2>Créer une SCI : les étapes</h2>
  <ol>
    <li>Rédaction des statuts (notaire ou avocat recommandé)</li>
    <li>Constitution du capital social (minimum symbolique)</li>
    <li>Publication d'une annonce légale</li>
    <li>Immatriculation au RCS</li>
    <li>Ouverture d'un compte bancaire professionnel</li>
  </ol>

  <h2>Transmission via SCI</h2>
  <p>La SCI facilite la <strong>transmission progressive</strong> du patrimoine :</p>
  <ul>
    <li>Donation de parts sociales (abattement de 100 000€/enfant tous les 15 ans)</li>
    <li>Démembrement des parts (nue-propriété aux enfants, usufruit aux parents)</li>
    <li>Réduction de la valeur taxable grâce à la décote d'illiquidité (10-15%)</li>
  </ul>

  <h2>Inconvénients de la SCI</h2>
  <ul>
    <li>Formalisme de gestion (assemblées, comptabilité)</li>
    <li>Coûts de création et de fonctionnement</li>
    <li>Responsabilité illimitée des associés</li>
    <li>Pas adaptée à la location meublée (activité commerciale)</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La SCI est un outil puissant pour gérer et transmettre un patrimoine immobilier, notamment en famille. Le choix entre IR et IS dépend de votre stratégie : capitalisation vs revenus immédiats. Une réflexion approfondie et l'accompagnement d'un professionnel sont recommandés.</p>
  `
  },

  'frais-notaire': {
    titre: 'Frais de notaire : calcul et composition détaillée',
    categorie: 'immobilier',
    keywords: 'frais de notaire, droits de mutation, frais acquisition immobilier, calculer frais notaire, achat immobilier, émoluments notaire',
    description: `Les frais de notaire représentent 7-8% du prix dans l'ancien et 2-3% dans le neuf. Découvrez leur composition et comment les calculer.`,
    contenu: `
  <h2>Que sont les frais de notaire ?</h2>
  <p>Les <strong>frais de notaire</strong>, appelés aussi frais d'acquisition, regroupent l'ensemble des sommes versées au notaire lors de l'achat d'un bien immobilier. Contrairement aux idées reçues, l'essentiel ne revient pas au notaire mais à l'État.</p>

  <h2>Composition des frais de notaire</h2>
  <h3>1. Droits de mutation (environ 80%)</h3>
  <p>Taxes reversées à l'État et aux collectivités locales :</p>
  <ul>
    <li><strong>Taxe départementale</strong> : 4,50% (ou 3,80% selon département)</li>
    <li><strong>Taxe communale</strong> : 1,20% de la taxe départementale</li>
    <li><strong>Prélèvement de l'État</strong> : 2,37% de la taxe départementale</li>
  </ul>
  <p>Au total : environ <strong>5,80%</strong> du prix dans l'ancien.</p>

  <h3>2. Émoluments du notaire (environ 10%)</h3>
  <p>Rémunération réglementée du notaire, calculée par tranches dégressives :</p>
  <ul>
    <li>De 0 à 6 500€ : 3,870%</li>
    <li>De 6 500 à 17 000€ : 1,596%</li>
    <li>De 17 000 à 60 000€ : 1,064%</li>
    <li>Au-delà de 60 000€ : 0,799%</li>
  </ul>

  <h3>3. Débours et frais divers (environ 10%)</h3>
  <p>Frais avancés par le notaire pour les documents et formalités :</p>
  <ul>
    <li>Extrait cadastral</li>
    <li>État hypothécaire</li>
    <li>Frais de publication</li>
    <li>Contribution de sécurité immobilière</li>
  </ul>

  <h2>Frais dans le neuf vs l'ancien</h2>
  <table>
    <tr><th>Type de bien</th><th>Frais de notaire</th></tr>
    <tr><td>Ancien (plus de 5 ans)</td><td>7% à 8%</td></tr>
    <tr><td>Neuf (VEFA, moins de 5 ans)</td><td>2% à 3%</td></tr>
  </table>
  <p>Dans le neuf, les droits de mutation sont réduits car la TVA a déjà été payée.</p>

  <h2>Comment réduire les frais de notaire ?</h2>
  <ul>
    <li><strong>Séparer mobilier et immobilier</strong> : les meubles ne sont pas soumis aux droits de mutation</li>
    <li><strong>Négocier les émoluments</strong> : possible jusqu'à 20% pour les biens > 100 000€</li>
    <li><strong>Acheter dans le neuf</strong> : frais réduits à 2-3%</li>
    <li><strong>Certains départements</strong> : taux réduit de 3,80%</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Les frais de notaire sont un coût incontournable de l'achat immobilier. Comprendre leur composition permet de mieux les anticiper et parfois de les optimiser. Utilisez notre <a href="/calcul-frais-de-notaire">simulateur de frais de notaire</a> pour estimer précisément votre acquisition.</p>
  `
  },

  'plus-value-immobiliere': {
    titre: 'Plus-value immobilière : calcul et exonérations',
    categorie: 'immobilier',
    keywords: 'plus-value immobilière, impôt plus-value, exonération plus-value, abattement durée détention, vente immobilier, fiscalité revente',
    description: `La plus-value immobilière est taxée lors de la revente d'un bien. Découvrez comment elle se calcule et les exonérations possibles.`,
    contenu: `
  <h2>Qu'est-ce que la plus-value immobilière ?</h2>
  <p>La <strong>plus-value immobilière</strong> correspond à la différence entre le prix de vente et le prix d'achat d'un bien. Elle est imposée lors de la cession de biens immobiliers autres que la résidence principale.</p>

  <h2>Calcul de la plus-value brute</h2>
  <p><strong>Plus-value brute = Prix de vente - Prix d'acquisition</strong></p>

  <h3>Prix de vente corrigé</h3>
  <ul>
    <li>Prix réel de la transaction</li>
    <li>- Frais de vente (diagnostics, commission agence si à charge du vendeur)</li>
  </ul>

  <h3>Prix d'acquisition majoré</h3>
  <ul>
    <li>Prix d'achat initial</li>
    <li>+ Frais d'acquisition (frais de notaire réels ou forfait de 7,5%)</li>
    <li>+ Travaux (réels avec factures ou forfait de 15% après 5 ans)</li>
  </ul>

  <h2>Abattements pour durée de détention</h2>
  <h3>Impôt sur le revenu (19%)</h3>
  <ul>
    <li>6% par an de la 6ème à la 21ème année</li>
    <li>4% la 22ème année</li>
    <li><strong>Exonération totale après 22 ans</strong></li>
  </ul>

  <h3>Prélèvements sociaux (17,2%)</h3>
  <ul>
    <li>1,65% par an de la 6ème à la 21ème année</li>
    <li>1,60% la 22ème année</li>
    <li>9% par an de la 23ème à la 30ème année</li>
    <li><strong>Exonération totale après 30 ans</strong></li>
  </ul>

  <h2>Cas d'exonération totale</h2>
  <ul>
    <li><strong>Résidence principale</strong> : exonération totale</li>
    <li><strong>Première vente d'un logement autre que RP</strong> : sous conditions (remploi pour achat RP)</li>
    <li><strong>Prix de vente < 15 000€</strong></li>
    <li><strong>Détention > 30 ans</strong></li>
    <li><strong>Vente à un organisme HLM</strong></li>
    <li><strong>Titulaires de pension de retraite ou d'invalidité</strong> (sous conditions de revenus)</li>
  </ul>

  <h2>Surtaxe sur les plus-values élevées</h2>
  <p>Une surtaxe s'applique si la plus-value imposable dépasse 50 000€ :</p>
  <ul>
    <li>De 50 001 à 60 000€ : 2%</li>
    <li>De 60 001 à 100 000€ : 3%</li>
    <li>Au-delà de 250 000€ : 6%</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La fiscalité des plus-values immobilières peut représenter un coût significatif. Les abattements pour durée de détention encouragent la conservation des biens sur le long terme. Utilisez notre <a href="/simulateur-plus-value-immobiliere">simulateur de plus-value</a> pour estimer votre imposition.</p>
  `
  },

  'pret-immobilier': {
    titre: 'Prêt immobilier : guide complet pour bien emprunter',
    categorie: 'immobilier',
    keywords: 'prêt immobilier, crédit immobilier, taux emprunt, capacité emprunt, assurance emprunteur, négocier crédit',
    description: `Le prêt immobilier est le levier essentiel de l'investissement. Découvrez comment optimiser votre crédit : taux, durée, assurance et négociation.`,
    contenu: `
  <h2>Les fondamentaux du prêt immobilier</h2>
  <p>Le <strong>prêt immobilier</strong> permet de financer l'achat d'un bien en empruntant auprès d'une banque. Vous remboursez le capital plus les intérêts sur une durée de 15 à 25 ans généralement.</p>

  <h2>Critères d'octroi du crédit</h2>
  <ul>
    <li><strong>Taux d'endettement</strong> : maximum 35% des revenus nets (assurance incluse)</li>
    <li><strong>Reste à vivre</strong> : montant disponible après charges</li>
    <li><strong>Stabilité professionnelle</strong> : CDI privilégié, mais pas obligatoire</li>
    <li><strong>Apport personnel</strong> : généralement 10-20% du projet</li>
    <li><strong>Comportement bancaire</strong> : pas de découverts, bonne gestion</li>
  </ul>

  <h2>Types de prêts immobiliers</h2>
  <h3>Prêt amortissable classique</h3>
  <p>Mensualités constantes comprenant capital + intérêts. Les intérêts diminuent au fil du temps.</p>

  <h3>Prêt in fine</h3>
  <p>Seuls les intérêts sont payés pendant la durée du prêt. Le capital est remboursé à l'échéance. Intéressant pour l'investissement locatif (intérêts déductibles).</p>

  <h3>Prêt à paliers</h3>
  <p>Mensualités évolutives (croissantes ou décroissantes). Adapté aux situations professionnelles évolutives.</p>

  <h3>Prêt relais</h3>
  <p>Financement temporaire en attendant la vente d'un bien. Durée de 12 à 24 mois.</p>

  <h2>Les aides à l'achat</h2>
  <ul>
    <li><strong>PTZ (Prêt à Taux Zéro)</strong> : pour les primo-accédants sous conditions de revenus</li>
    <li><strong>Prêt Action Logement</strong> : pour les salariés du privé</li>
    <li><strong>Prêt PAS</strong> : Prêt d'Accession Sociale, sous conditions de ressources</li>
    <li><strong>Éco-PTZ</strong> : pour financer des travaux de rénovation énergétique</li>
  </ul>

  <h2>L'assurance emprunteur</h2>
  <p>Obligatoire pour obtenir un prêt, elle couvre le décès, l'invalidité, et parfois la perte d'emploi.</p>
  <ul>
    <li><strong>Délégation d'assurance</strong> : possibilité de choisir une assurance externe</li>
    <li><strong>Économies potentielles</strong> : jusqu'à 50% vs assurance groupe</li>
    <li><strong>Loi Lemoine</strong> : résiliation à tout moment sans frais</li>
  </ul>

  <h2>Négocier son prêt</h2>
  <ul>
    <li>Faire jouer la concurrence (courtier, plusieurs banques)</li>
    <li>Négocier les frais de dossier</li>
    <li>Obtenir la suppression des IRA (Indemnités de Remboursement Anticipé)</li>
    <li>Négocier l'assurance emprunteur</li>
    <li>Demander la transférabilité du prêt</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le prêt immobilier est un engagement long terme qui mérite d'être optimisé. Une bonne préparation et une négociation efficace peuvent vous faire économiser des dizaines de milliers d'euros. Utilisez notre <a href="/simulateur-credit-immobilier">simulateur de crédit</a> pour estimer vos mensualités.</p>
  `
  },

  'fiscalite-immobiliere': {
    titre: 'Fiscalité immobilière : guide complet des impôts',
    categorie: 'immobilier',
    keywords: 'fiscalité immobilière, impôts fonciers, revenus locatifs, taxe foncière, IFI, défiscalisation immobilier',
    description: `La fiscalité immobilière comprend de nombreux impôts et taxes. Découvrez comment optimiser la fiscalité de vos biens immobiliers.`,
    contenu: `
  <h2>Les impôts sur la détention</h2>
  <h3>Taxe foncière</h3>
  <p>Payée par le propriétaire, calculée sur la valeur locative cadastrale. Elle augmente régulièrement et varie selon les communes.</p>

  <h3>Taxe d'habitation</h3>
  <p>Supprimée pour les résidences principales. Reste due pour les résidences secondaires et peut être majorée dans les zones tendues.</p>

  <h3>IFI (Impôt sur la Fortune Immobilière)</h3>
  <p>Applicable si patrimoine immobilier net > 1,3 million €. Taux de 0,5% à 1,5% selon les tranches.</p>

  <h2>Les impôts sur les revenus locatifs</h2>
  <h3>Location nue - Revenus fonciers</h3>
  <ul>
    <li><strong>Micro-foncier</strong> : abattement de 30%, si revenus < 15 000€/an</li>
    <li><strong>Régime réel</strong> : déduction des charges réelles (intérêts, travaux, charges)</li>
    <li><strong>Déficit foncier</strong> : imputable sur le revenu global jusqu'à 10 700€/an</li>
  </ul>

  <h3>Location meublée - BIC</h3>
  <ul>
    <li><strong>Micro-BIC</strong> : abattement de 50%, si revenus < 77 700€/an</li>
    <li><strong>Régime réel</strong> : déduction des charges + amortissement du bien</li>
  </ul>

  <h2>Les impôts à la cession</h2>
  <h3>Plus-value immobilière</h3>
  <ul>
    <li>19% d'impôt + 17,2% de prélèvements sociaux</li>
    <li>Abattements progressifs selon la durée de détention</li>
    <li>Exonération totale après 22 ans (IR) et 30 ans (PS)</li>
  </ul>

  <h2>Les dispositifs de défiscalisation</h2>
  <h3>Pinel</h3>
  <p>Réduction d'impôt de 9% à 14% selon la durée de location (6, 9 ou 12 ans). En voie d'extinction.</p>

  <h3>Denormandie</h3>
  <p>Équivalent du Pinel dans l'ancien avec travaux. Zones éligibles spécifiques.</p>

  <h3>Malraux</h3>
  <p>Réduction d'impôt de 22% à 30% des travaux pour la rénovation en secteur sauvegardé.</p>

  <h3>Monuments Historiques</h3>
  <p>Déduction totale des travaux du revenu global. Pour les biens classés.</p>

  <h2>Optimisation fiscale</h2>
  <ul>
    <li>Choisir le bon régime fiscal (réel vs micro)</li>
    <li>Profiter du déficit foncier</li>
    <li>Opter pour le LMNP avec amortissement</li>
    <li>Créer une SCI à l'IS pour capitaliser</li>
    <li>Transmettre progressivement via donation</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La fiscalité immobilière est complexe mais offre de nombreuses opportunités d'optimisation. Une bonne stratégie fiscale peut significativement améliorer la rentabilité de vos investissements.</p>
  `
  },

  'rendement-locatif-guide': {
    titre: 'Rendement locatif : comment le calculer et l\'optimiser',
    categorie: 'immobilier',
    keywords: 'rendement locatif, rentabilité immobilier, calcul rendement, rendement brut net, cashflow immobilier, investissement rentable',
    description: `Le rendement locatif est l'indicateur clé de tout investissement immobilier. Découvrez comment le calculer et l'optimiser.`,
    contenu: `
  <h2>Qu'est-ce que le rendement locatif ?</h2>
  <p>Le <strong>rendement locatif</strong> mesure la performance d'un investissement immobilier en comparant les revenus générés au capital investi. C'est l'indicateur principal pour évaluer la rentabilité d'un bien.</p>

  <h2>Les différents types de rendement</h2>
  <h3>Rendement brut</h3>
  <p><strong>Formule : (Loyer annuel / Prix d'achat) × 100</strong></p>
  <p>Exemple : loyer de 800€/mois, bien acheté 150 000€</p>
  <p>Rendement brut = (9 600 / 150 000) × 100 = <strong>6,4%</strong></p>

  <h3>Rendement net de charges</h3>
  <p><strong>Formule : [(Loyer annuel - Charges) / Prix d'achat total] × 100</strong></p>
  <p>Charges à déduire : taxe foncière, assurance PNO, charges copropriété, gestion, vacance locative...</p>

  <h3>Rendement net-net (après impôts)</h3>
  <p>Prend en compte la fiscalité : impôt sur le revenu et prélèvements sociaux sur les loyers.</p>

  <h2>Qu'est-ce qu'un bon rendement ?</h2>
  <table>
    <tr><th>Zone</th><th>Rendement brut visé</th></tr>
    <tr><td>Paris intra-muros</td><td>2-4%</td></tr>
    <tr><td>Grande couronne IDF</td><td>4-6%</td></tr>
    <tr><td>Grandes métropoles</td><td>4-6%</td></tr>
    <tr><td>Villes moyennes</td><td>6-10%</td></tr>
    <tr><td>Petites villes</td><td>8-12%+</td></tr>
  </table>
  <p>Un rendement élevé peut cacher des risques : vacance locative, dégradation, moins-value...</p>

  <h2>Le cashflow : l'indicateur complémentaire</h2>
  <p>Le <strong>cashflow</strong> = Loyer - (Mensualité crédit + Charges)</p>
  <ul>
    <li><strong>Cashflow positif</strong> : le bien s'autofinance et génère un excédent</li>
    <li><strong>Cashflow négatif</strong> : effort d'épargne mensuel nécessaire</li>
  </ul>

  <h2>Optimiser son rendement</h2>
  <h3>À l'achat</h3>
  <ul>
    <li>Négocier le prix en dessous du marché</li>
    <li>Acheter avec travaux (décote + valorisation)</li>
    <li>Choisir un bien sous-loué avec potentiel d'augmentation</li>
  </ul>

  <h3>En exploitation</h3>
  <ul>
    <li>Passer en meublé (loyers 10-20% supérieurs)</li>
    <li>Optimiser la fiscalité (LMNP, déficit foncier)</li>
    <li>Réduire les charges (renégocier assurances, syndic)</li>
    <li>Colocation (rendement supérieur de 20-30%)</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le rendement locatif est essentiel mais ne doit pas être le seul critère. Un équilibre entre rendement, valorisation potentielle et sécurité locative est la clé d'un bon investissement. Utilisez notre <a href="/rendement-locatif">simulateur de rendement</a> pour analyser vos projets.</p>
  `
  },

  'defiscalisation-immobiliere': {
    titre: 'Défiscalisation immobilière : tous les dispositifs en 2025',
    categorie: 'immobilier',
    keywords: 'défiscalisation immobilière, réduction impôts, Pinel, Denormandie, Malraux, investir défiscalisant, avantage fiscal',
    description: `La défiscalisation immobilière permet de réduire ses impôts en investissant. Découvrez tous les dispositifs disponibles et leurs conditions.`,
    contenu: `
  <h2>Principe de la défiscalisation</h2>
  <p>La <strong>défiscalisation immobilière</strong> consiste à bénéficier de réductions d'impôts en contrepartie d'un investissement immobilier répondant à certaines conditions (location, durée, plafonds...).</p>

  <h2>Dispositif Pinel (en extinction)</h2>
  <h3>Principe</h3>
  <p>Réduction d'impôt pour l'achat d'un logement neuf loué nu pendant 6, 9 ou 12 ans.</p>
  <h3>Taux 2024 (dernière année)</h3>
  <ul>
    <li>6 ans : 9%</li>
    <li>9 ans : 12%</li>
    <li>12 ans : 14%</li>
  </ul>
  <h3>Conditions</h3>
  <ul>
    <li>Zones A, A bis, B1 uniquement</li>
    <li>Plafonds de loyers et de ressources des locataires</li>
    <li>Plafond d'investissement : 300 000€ et 5 500€/m²</li>
  </ul>

  <h2>Dispositif Denormandie</h2>
  <h3>Principe</h3>
  <p>Équivalent du Pinel dans l'ancien avec travaux représentant au moins 25% du coût total.</p>
  <h3>Zones éligibles</h3>
  <p>Communes du programme "Action Cœur de Ville" et ORT (Opérations de Revitalisation du Territoire).</p>

  <h2>Dispositif Malraux</h2>
  <h3>Principe</h3>
  <p>Réduction d'impôt pour la rénovation d'immeubles en secteur sauvegardé ou ZPPAUP.</p>
  <h3>Taux</h3>
  <ul>
    <li>30% des travaux en secteur sauvegardé</li>
    <li>22% en ZPPAUP</li>
  </ul>
  <h3>Conditions</h3>
  <p>Travaux suivis par un Architecte des Bâtiments de France, location nue pendant 9 ans minimum.</p>

  <h2>Monuments Historiques</h2>
  <h3>Principe</h3>
  <p>Déduction des travaux de restauration du revenu global, sans plafonnement des niches fiscales.</p>
  <h3>Conditions</h3>
  <p>Bien classé ou inscrit aux Monuments Historiques. Ouverture au public parfois requise.</p>

  <h2>Déficit foncier</h2>
  <h3>Principe</h3>
  <p>Les travaux d'entretien et de réparation créent un déficit imputable sur les revenus fonciers, puis sur le revenu global jusqu'à 10 700€/an.</p>
  <h3>Conditions</h3>
  <p>Location nue pendant 3 ans après imputation du déficit sur le revenu global.</p>

  <h2>Loc'Avantages</h2>
  <h3>Principe</h3>
  <p>Réduction d'impôt en échange de loyers plafonnés, inférieurs au marché.</p>
  <h3>Taux</h3>
  <ul>
    <li>Loc1 : loyer -15%, réduction 15%</li>
    <li>Loc2 : loyer -30%, réduction 35%</li>
    <li>Loc3 (intermédiation) : loyer -45%, réduction 65%</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La défiscalisation ne doit jamais être le seul motif d'un investissement. Un bien doit être rentable AVANT l'avantage fiscal. Attention aux montages vendus uniquement pour leur effet fiscal, souvent surévalués.</p>
  `
  },

  'renovation-appartement': {
    titre: 'Rénovation d\'appartement : guide complet des travaux et budget',
    categorie: 'immobilier',
    keywords: 'rénovation appartement, travaux appartement, budget rénovation, rénovation complète, devis travaux, copropriété travaux, autorisation travaux appartement',
    description: `La rénovation d'un appartement nécessite une bonne planification : budget, autorisations, copropriété, artisans. Guide complet pour réussir vos travaux.`,
    contenu: `
  <h2>Pourquoi rénover un appartement ?</h2>
  <p>La <strong>rénovation d'appartement</strong> peut répondre à plusieurs objectifs : améliorer le confort de vie, valoriser un bien avant revente, optimiser le rendement locatif ou mettre aux normes un logement ancien. C'est aussi une opportunité d'acheter moins cher et de créer de la valeur.</p>

  <h2>Les différents types de rénovation</h2>
  <h3>Rafraîchissement (50-200 €/m²)</h3>
  <p>Travaux légers sans modification de structure :</p>
  <ul>
    <li>Peinture des murs et plafonds</li>
    <li>Remplacement des revêtements de sol</li>
    <li>Changement des luminaires et interrupteurs</li>
    <li>Rénovation des placards</li>
  </ul>

  <h3>Rénovation partielle (200-500 €/m²)</h3>
  <p>Travaux ciblés sur certaines pièces :</p>
  <ul>
    <li>Rénovation de la cuisine (5 000 à 20 000 €)</li>
    <li>Rénovation de la salle de bain (4 000 à 15 000 €)</li>
    <li>Mise aux normes électriques</li>
    <li>Remplacement des fenêtres</li>
    <li>Installation d'un nouveau chauffage</li>
  </ul>

  <h3>Rénovation complète (500-1 200 €/m²)</h3>
  <p>Remise à neuf intégrale :</p>
  <ul>
    <li>Électricité et plomberie refaites entièrement</li>
    <li>Isolation thermique et phonique</li>
    <li>Nouvelle cuisine et salle de bain</li>
    <li>Tous les revêtements (sols, murs, plafonds)</li>
    <li>Menuiseries intérieures et extérieures</li>
  </ul>

  <h3>Rénovation lourde (1 200-2 000+ €/m²)</h3>
  <p>Travaux avec modification de structure :</p>
  <ul>
    <li>Abattement de murs porteurs (avec renfort IPN)</li>
    <li>Création ou suppression de pièces</li>
    <li>Modification des réseaux collectifs</li>
    <li>Surélévation ou extension</li>
  </ul>

  <h2>Budget détaillé par poste</h2>
  <h3>Gros œuvre et structure</h3>
  <ul>
    <li><strong>Ouverture mur porteur</strong> : 2 500 à 6 000 € (étude structure incluse)</li>
    <li><strong>Création cloison</strong> : 40 à 80 €/m²</li>
    <li><strong>Démolition cloison</strong> : 20 à 40 €/m²</li>
    <li><strong>Ragréage sol</strong> : 15 à 35 €/m²</li>
  </ul>

  <h3>Électricité</h3>
  <ul>
    <li><strong>Mise en conformité</strong> : 80 à 120 €/m²</li>
    <li><strong>Rénovation complète</strong> : 120 à 200 €/m²</li>
    <li><strong>Tableau électrique</strong> : 800 à 2 000 €</li>
  </ul>

  <h3>Plomberie</h3>
  <ul>
    <li><strong>Rénovation complète</strong> : 100 à 150 €/m²</li>
    <li><strong>Déplacement point d'eau</strong> : 500 à 1 500 €</li>
    <li><strong>Chauffe-eau</strong> : 500 à 2 500 € (pose incluse)</li>
  </ul>

  <h3>Revêtements</h3>
  <ul>
    <li><strong>Peinture</strong> : 20 à 40 €/m² (murs et plafonds)</li>
    <li><strong>Parquet</strong> : 40 à 150 €/m² posé</li>
    <li><strong>Carrelage</strong> : 50 à 120 €/m² posé</li>
    <li><strong>Faïence salle de bain</strong> : 60 à 150 €/m²</li>
  </ul>

  <h3>Cuisine et salle de bain</h3>
  <ul>
    <li><strong>Cuisine équipée entrée de gamme</strong> : 3 000 à 6 000 €</li>
    <li><strong>Cuisine moyenne gamme</strong> : 8 000 à 15 000 €</li>
    <li><strong>Cuisine haut de gamme</strong> : 15 000 à 30 000+ €</li>
    <li><strong>Salle de bain complète</strong> : 5 000 à 15 000 €</li>
  </ul>

  <h2>Spécificités en copropriété</h2>
  <h3>Travaux sans autorisation</h3>
  <p>Vous pouvez réaliser librement :</p>
  <ul>
    <li>Peinture, papier peint, revêtements intérieurs</li>
    <li>Changement de sanitaires (sans déplacement)</li>
    <li>Remplacement de cuisine</li>
    <li>Travaux d'électricité dans votre lot</li>
  </ul>

  <h3>Travaux nécessitant accord du syndic</h3>
  <p>Information préalable requise :</p>
  <ul>
    <li>Modification des cloisons intérieures</li>
    <li>Changement du revêtement de sol (isolation phonique)</li>
    <li>Travaux affectant les parties communes (colonne)</li>
  </ul>

  <h3>Travaux nécessitant vote en AG</h3>
  <p>Autorisation de l'assemblée générale obligatoire :</p>
  <ul>
    <li>Modification de façade (fenêtres, volets, climatisation)</li>
    <li>Création d'ouverture sur parties communes</li>
    <li>Changement de destination du lot</li>
    <li>Installation sur parties communes (antenne, VMC)</li>
  </ul>

  <h2>Règles d'isolation phonique</h2>
  <p>Le règlement de copropriété impose souvent des normes acoustiques :</p>
  <ul>
    <li><strong>Sous-couche obligatoire</strong> sous parquet ou carrelage</li>
    <li><strong>Attestation acoustique</strong> parfois demandée</li>
    <li><strong>Horaires de travaux</strong> : généralement 8h-20h en semaine</li>
    <li><strong>Déclaration préalable</strong> au syndic recommandée</li>
  </ul>

  <h2>Planification des travaux</h2>
  <h3>Ordre logique d'intervention</h3>
  <ol>
    <li><strong>Démolition</strong> : cloisons, revêtements à supprimer</li>
    <li><strong>Gros œuvre</strong> : ouvertures, structure, maçonnerie</li>
    <li><strong>Plomberie</strong> : réseaux d'eau et évacuations</li>
    <li><strong>Électricité</strong> : passage des gaines et câbles</li>
    <li><strong>Isolation</strong> : murs, plafonds, sols</li>
    <li><strong>Plâtrerie</strong> : cloisons, faux plafonds, enduits</li>
    <li><strong>Menuiseries</strong> : portes, fenêtres, placards</li>
    <li><strong>Carrelage</strong> : sols et murs des pièces d'eau</li>
    <li><strong>Peinture</strong> : sous-couche et finitions</li>
    <li><strong>Parquet</strong> : pose du revêtement de sol</li>
    <li><strong>Second œuvre</strong> : sanitaires, cuisine, finitions</li>
  </ol>

  <h3>Durée moyenne des travaux</h3>
  <ul>
    <li><strong>Studio/T1</strong> : 4 à 8 semaines</li>
    <li><strong>T2/T3</strong> : 8 à 12 semaines</li>
    <li><strong>T4 et plus</strong> : 12 à 16 semaines</li>
    <li><strong>Rénovation lourde</strong> : ajouter 4 à 8 semaines</li>
  </ul>

  <h2>Choisir ses artisans</h2>
  <h3>Solutions possibles</h3>
  <ul>
    <li><strong>Entreprise générale</strong> : un seul interlocuteur, mais plus cher (15-25% de marge)</li>
    <li><strong>Architecte d'intérieur</strong> : coordination + design, honoraires 8-15% du budget</li>
    <li><strong>Corps de métier séparés</strong> : économies mais coordination à gérer</li>
    <li><strong>Courtier en travaux</strong> : mise en relation et suivi, gratuit ou commission</li>
  </ul>

  <h3>Vérifications essentielles</h3>
  <ul>
    <li><strong>Assurance décennale</strong> valide (attestation à demander)</li>
    <li><strong>Immatriculation</strong> au registre du commerce ou des métiers</li>
    <li><strong>Références</strong> et photos de chantiers similaires</li>
    <li><strong>Devis détaillé</strong> avec fournitures et main d'œuvre séparées</li>
    <li><strong>Avis clients</strong> sur Google, réseaux ou bouche à oreille</li>
  </ul>

  <h2>Aides et financements</h2>
  <h3>Aides pour la rénovation énergétique</h3>
  <ul>
    <li><strong>MaPrimeRénov'</strong> : jusqu'à 20 000 € selon revenus et travaux</li>
    <li><strong>CEE (Certificats d'Économie d'Énergie)</strong> : primes des fournisseurs</li>
    <li><strong>Éco-PTZ</strong> : prêt sans intérêts jusqu'à 50 000 €</li>
    <li><strong>TVA réduite 5,5%</strong> : sur travaux d'amélioration énergétique</li>
  </ul>

  <h3>TVA applicable</h3>
  <ul>
    <li><strong>5,5%</strong> : travaux d'amélioration énergétique (isolation, chauffage)</li>
    <li><strong>10%</strong> : travaux d'amélioration, transformation, aménagement (logement > 2 ans)</li>
    <li><strong>20%</strong> : travaux neufs ou logement de moins de 2 ans</li>
  </ul>

  <h2>Valorisation après rénovation</h2>
  <p>Une rénovation bien menée peut significativement augmenter la valeur du bien :</p>
  <ul>
    <li><strong>Rafraîchissement</strong> : +5 à 10% de valeur</li>
    <li><strong>Rénovation complète</strong> : +15 à 25% de valeur</li>
    <li><strong>Optimisation de surface</strong> : jusqu'à +30% si gain de pièce</li>
    <li><strong>Amélioration DPE</strong> : +5 à 15% selon le gain de classe</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La rénovation d'appartement est un projet qui demande une préparation minutieuse. Établissez un budget réaliste avec 10-15% de marge pour imprévus, choisissez des artisans qualifiés et respectez les règles de copropriété. Un projet bien mené peut créer une forte plus-value, que ce soit pour y vivre ou pour un investissement locatif.</p>
  <p>Utilisez notre <a href="/simulateur-renovation-energetique">simulateur de rénovation énergétique</a> pour estimer les aides auxquelles vous avez droit.</p>
  `
  },

  'droits-travaux': {
    titre: 'Droits de travaux : permis de construire, déclaration préalable et autorisations',
    categorie: 'immobilier',
    keywords: 'permis de construire, déclaration préalable de travaux, autorisation urbanisme, travaux maison, PLU, extension maison, rénovation autorisation',
    description: `Avant de réaliser des travaux, il est essentiel de connaître les autorisations nécessaires : permis de construire, déclaration préalable ou simple déclaration. Guide complet des démarches.`,
    contenu: `
  <h2>Pourquoi des autorisations de travaux ?</h2>
  <p>Les <strong>autorisations d'urbanisme</strong> permettent à la commune de vérifier que votre projet respecte les règles d'urbanisme locales (PLU, PLUi) et nationales. Selon l'ampleur des travaux, différentes procédures s'appliquent.</p>

  <h2>Les 3 niveaux d'autorisation</h2>
  <h3>1. Travaux sans autorisation</h3>
  <p>Certains travaux de faible importance ne nécessitent aucune formalité :</p>
  <ul>
    <li>Construction de moins de 5 m² de surface de plancher</li>
    <li>Mur de clôture de moins de 2 mètres de haut (hors secteur protégé)</li>
    <li>Terrasse de plain-pied</li>
    <li>Travaux d'entretien ou de réparation ordinaire</li>
    <li>Piscine de moins de 10 m² non couverte</li>
  </ul>

  <h3>2. Déclaration préalable de travaux (DP)</h3>
  <p>Procédure simplifiée pour les travaux de faible envergure :</p>
  <ul>
    <li>Construction créant entre 5 et 20 m² de surface de plancher (40 m² en zone urbaine avec PLU)</li>
    <li>Modification de l'aspect extérieur (façade, toiture, fenêtres, volets)</li>
    <li>Changement de destination sans modification de structure</li>
    <li>Piscine de 10 à 100 m² non couverte ou couverte de moins de 1,80 m</li>
    <li>Clôture dans certains secteurs protégés</li>
    <li>Division de terrain (lotissement)</li>
  </ul>
  <p><strong>Délai d'instruction</strong> : 1 mois (2 mois en secteur protégé)</p>

  <h3>3. Permis de construire (PC)</h3>
  <p>Obligatoire pour les projets importants :</p>
  <ul>
    <li>Construction nouvelle de plus de 20 m² (ou 40 m² en zone urbaine)</li>
    <li>Extension portant la surface totale au-delà de 150 m² (recours architecte obligatoire)</li>
    <li>Changement de destination avec modification de structure ou façade</li>
    <li>Travaux sur un immeuble inscrit aux monuments historiques</li>
  </ul>
  <p><strong>Délai d'instruction</strong> : 2 mois pour une maison individuelle, 3 mois pour les autres constructions</p>

  <h2>Cas particuliers</h2>
  <h3>Le recours à un architecte</h3>
  <p>Obligatoire si :</p>
  <ul>
    <li>Surface de plancher totale après travaux > 150 m² pour les particuliers</li>
    <li>Toujours obligatoire pour les personnes morales (SCI, sociétés)</li>
  </ul>

  <h3>Zones protégées</h3>
  <p>Dans certains secteurs, les règles sont renforcées :</p>
  <ul>
    <li><strong>Abords de monuments historiques</strong> (périmètre de 500 m)</li>
    <li><strong>Sites patrimoniaux remarquables</strong></li>
    <li><strong>Sites classés ou inscrits</strong></li>
    <li><strong>Réserves naturelles</strong></li>
  </ul>
  <p>Dans ces zones, l'avis de l'Architecte des Bâtiments de France (ABF) est requis.</p>

  <h2>Comment déposer une demande ?</h2>
  <h3>Constitution du dossier</h3>
  <ul>
    <li><strong>Formulaire CERFA</strong> : 13703 (DP) ou 13406 (PC maison)</li>
    <li><strong>Plan de situation</strong> du terrain</li>
    <li><strong>Plan de masse</strong> des constructions</li>
    <li><strong>Plan de coupe</strong> du terrain et de la construction</li>
    <li><strong>Notice descriptive</strong> du projet</li>
    <li><strong>Plan des façades et toitures</strong></li>
    <li><strong>Document graphique</strong> d'insertion dans l'environnement</li>
    <li><strong>Photographies</strong> du terrain et de ses abords</li>
  </ul>

  <h3>Dépôt et instruction</h3>
  <ol>
    <li>Déposer le dossier en mairie (ou en ligne via le portail démarches-simplifiées)</li>
    <li>Recevoir le récépissé avec numéro d'enregistrement</li>
    <li>Attendre l'instruction (possibilité de demande de pièces complémentaires)</li>
    <li>Recevoir l'arrêté d'autorisation ou de refus</li>
  </ol>

  <h2>Affichage et recours des tiers</h2>
  <p>Après obtention de l'autorisation :</p>
  <ul>
    <li><strong>Affichage obligatoire</strong> sur le terrain pendant toute la durée des travaux</li>
    <li><strong>Délai de recours des tiers</strong> : 2 mois à compter de l'affichage</li>
    <li><strong>Délai de retrait administratif</strong> : 3 mois</li>
  </ul>
  <p>Il est conseillé d'attendre la fin du délai de recours avant de commencer les travaux.</p>

  <h2>Validité et péremption</h2>
  <ul>
    <li><strong>Durée de validité</strong> : 3 ans à compter de la délivrance</li>
    <li><strong>Prorogation possible</strong> : 2 fois 1 an sur demande</li>
    <li><strong>Péremption</strong> : si les travaux ne commencent pas dans les 3 ans ou sont interrompus plus d'1 an</li>
  </ul>

  <h2>Sanctions en cas d'infraction</h2>
  <p>Réaliser des travaux sans autorisation constitue une infraction :</p>
  <ul>
    <li><strong>Amende</strong> : de 1 200 € à 6 000 € par m² de surface construite illégalement</li>
    <li><strong>Démolition</strong> : le tribunal peut ordonner la mise en conformité ou la démolition</li>
    <li><strong>Prescription</strong> : 6 ans pour l'action pénale, mais pas de prescription pour la mise en conformité civile</li>
  </ul>

  <h2>Déclaration d'achèvement des travaux (DAACT)</h2>
  <p>À la fin des travaux, vous devez déposer en mairie une <strong>Déclaration Attestant l'Achèvement et la Conformité des Travaux</strong> (formulaire CERFA 13408). La mairie dispose de 3 mois pour contester la conformité.</p>

  <h2>Conclusion</h2>
  <p>Avant tout projet de construction ou de rénovation, renseignez-vous auprès de votre mairie pour connaître les règles applicables à votre terrain (PLU, servitudes, secteur protégé). Le respect des autorisations d'urbanisme est essentiel pour sécuriser votre projet et éviter des sanctions coûteuses.</p>
  `
  },

  'viager-immobilier': {
    titre: 'Le viager immobilier : guide complet acheteur et vendeur',
    categorie: 'immobilier',
    keywords: 'viager immobilier, viager occupé, viager libre, bouquet viager, rente viagère, investissement viager',
    description: `Le viager est une forme d'acquisition immobilière particulière. Découvrez son fonctionnement, ses avantages et ses risques pour l'acheteur et le vendeur.`,
    contenu: `
  <h2>Qu'est-ce que le viager ?</h2>
  <p>Le <strong>viager</strong> est une vente immobilière où l'acheteur (débirentier) verse un capital initial (bouquet) puis une rente mensuelle au vendeur (crédirentier) jusqu'à son décès.</p>

  <h2>Les types de viager</h2>
  <h3>Viager occupé</h3>
  <p>Le vendeur conserve le droit d'usage et d'habitation (DUH) ou l'usufruit jusqu'à son décès. C'est la forme la plus courante (95% des transactions).</p>

  <h3>Viager libre</h3>
  <p>L'acheteur peut occuper ou louer le bien immédiatement. Prix plus élevé car pas de décote d'occupation.</p>

  <h3>Viager sans rente (vente à terme)</h3>
  <p>Paiement échelonné sur une durée fixe, indépendant de la durée de vie du vendeur.</p>

  <h2>Calcul du prix en viager</h2>
  <h3>Valeur vénale</h3>
  <p>Prix du bien en vente classique.</p>

  <h3>Décote d'occupation (viager occupé)</h3>
  <p>Calculée selon l'espérance de vie du vendeur et la valeur locative du bien (tables de mortalité INSEE).</p>

  <h3>Répartition bouquet / rente</h3>
  <ul>
    <li><strong>Bouquet</strong> : généralement 20-30% de la valeur occupée, versé à la signature</li>
    <li><strong>Rente</strong> : versée mensuellement jusqu'au décès</li>
  </ul>

  <h2>Avantages pour le vendeur</h2>
  <ul>
    <li>Complément de revenus garanti à vie</li>
    <li>Reste chez soi (viager occupé)</li>
    <li>Fiscalité avantageuse sur la rente (abattement selon l'âge)</li>
    <li>Pas de souci de gestion locative</li>
  </ul>

  <h2>Avantages pour l'acheteur</h2>
  <ul>
    <li>Prix d'acquisition réduit (décote d'occupation)</li>
    <li>Pas besoin de crédit bancaire</li>
    <li>Paiement échelonné dans le temps</li>
    <li>Investissement patrimonial à long terme</li>
  </ul>

  <h2>Risques et inconvénients</h2>
  <h3>Pour l'acheteur</h3>
  <ul>
    <li>Aléa sur la durée de versement de la rente</li>
    <li>Obligation de payer même si difficultés financières</li>
    <li>Entretien du bien à charge (gros travaux)</li>
  </ul>

  <h3>Pour le vendeur</h3>
  <ul>
    <li>Risque d'insolvabilité de l'acheteur</li>
    <li>Rente fixée au départ (érosion par l'inflation)</li>
    <li>Impossibilité de revenir en arrière</li>
  </ul>

  <h2>Fiscalité du viager</h2>
  <h3>Rente viagère (vendeur)</h3>
  <p>Imposée partiellement selon l'âge au premier versement :</p>
  <ul>
    <li>Moins de 50 ans : 70% imposable</li>
    <li>50-59 ans : 50% imposable</li>
    <li>60-69 ans : 40% imposable</li>
    <li>70 ans et plus : 30% imposable</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le viager est une solution gagnant-gagnant quand les conditions sont réunies. Il demande une analyse approfondie et un accompagnement par des professionnels spécialisés. Utilisez notre <a href="/simulateur-viager">simulateur de viager</a> pour estimer un projet.</p>
  `
  }
};
