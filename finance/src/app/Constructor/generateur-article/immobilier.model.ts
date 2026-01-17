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
  },

  'passoire-thermique-guide': {
    titre: 'Passoires thermiques : impact du DPE sur l\'investissement immobilier',
    categorie: 'immobilier',
    keywords: 'passoire thermique, DPE, diagnostic de performance énergétique, interdiction location, rénovation énergétique, investissement immobilier DPE',
    description: `Les passoires thermiques (DPE F et G) sont soumises à des restrictions croissantes. Découvrez le calendrier d'interdiction, l'impact sur les prix et les stratégies d'investissement.`,
    contenu: `
  <h2>Qu'est-ce qu'une passoire thermique ?</h2>
  <p>Une <strong>passoire thermique</strong> est un logement dont le Diagnostic de Performance Énergétique (DPE) est classé F ou G. Ces logements consomment plus de 330 kWh/m²/an d'énergie primaire et/ou émettent plus de 70 kg CO2/m²/an.</p>

  <h2>Calendrier d'interdiction à la location</h2>
  <p>La loi Climat et Résilience impose un calendrier progressif d'interdiction de mise en location :</p>
  <ul>
    <li><strong>1er janvier 2023</strong> : interdiction des logements > 450 kWh/m²/an (G+)</li>
    <li><strong>1er janvier 2025</strong> : interdiction des logements classés G</li>
    <li><strong>1er janvier 2028</strong> : interdiction des logements classés F</li>
    <li><strong>1er janvier 2034</strong> : interdiction des logements classés E</li>
  </ul>
  <p>Attention : ces dates concernent les nouveaux baux ET les renouvellements.</p>

  <h2>Impact sur les prix de l'immobilier</h2>
  <h3>Décote constatée</h3>
  <ul>
    <li><strong>DPE G</strong> : décote de 10 à 20% par rapport à un bien équivalent en C ou D</li>
    <li><strong>DPE F</strong> : décote de 5 à 15%</li>
    <li><strong>DPE E</strong> : décote naissante de 3 à 8%</li>
  </ul>

  <h3>Facteurs aggravants</h3>
  <ul>
    <li>Copropriété avec travaux votés mais non réalisés</li>
    <li>Impossibilité technique d'isolation (monument historique, façade classée)</li>
    <li>Coût de rénovation disproportionné par rapport à la valeur du bien</li>
  </ul>

  <h2>Stratégies d'investissement</h2>
  <h3>Acheter une passoire pour rénover</h3>
  <p>Stratégie potentiellement rentable si :</p>
  <ul>
    <li>Décote à l'achat supérieure au coût des travaux</li>
    <li>Gain de classe énergétique significatif (G vers D minimum)</li>
    <li>Éligibilité aux aides (MaPrimeRénov', CEE, Éco-PTZ)</li>
    <li>Travaux techniquement réalisables</li>
  </ul>

  <h3>Travaux prioritaires</h3>
  <ol>
    <li><strong>Isolation des combles</strong> : meilleur rapport coût/efficacité</li>
    <li><strong>Remplacement des fenêtres</strong> : gain thermique + phonique</li>
    <li><strong>Isolation des murs</strong> : par l'intérieur ou l'extérieur</li>
    <li><strong>Changement de chauffage</strong> : pompe à chaleur, chaudière récente</li>
    <li><strong>Ventilation</strong> : VMC pour éviter les problèmes d'humidité</li>
  </ol>

  <h2>Coût moyen de rénovation par classe</h2>
  <ul>
    <li><strong>G vers E</strong> : 15 000 à 30 000 € pour un appartement</li>
    <li><strong>G vers D</strong> : 25 000 à 50 000 €</li>
    <li><strong>G vers C</strong> : 40 000 à 80 000 €</li>
    <li><strong>Maison individuelle</strong> : budget 1,5 à 2 fois plus élevé</li>
  </ul>

  <h2>Aides financières disponibles</h2>
  <ul>
    <li><strong>MaPrimeRénov'</strong> : jusqu'à 20 000 € selon revenus</li>
    <li><strong>MaPrimeRénov' Sérénité</strong> : jusqu'à 35 000 € pour rénovation globale</li>
    <li><strong>CEE (Certificats d'Économie d'Énergie)</strong> : primes des énergéticiens</li>
    <li><strong>Éco-PTZ</strong> : jusqu'à 50 000 € sans intérêts</li>
    <li><strong>TVA à 5,5%</strong> : sur travaux d'amélioration énergétique</li>
    <li><strong>Déficit foncier</strong> : déduction des travaux des revenus fonciers</li>
  </ul>

  <h2>Risques à évaluer</h2>
  <ul>
    <li><strong>Audit énergétique obligatoire</strong> : à partir du 1er avril 2023 pour les ventes de F et G</li>
    <li><strong>Gel des loyers</strong> : impossible d'augmenter le loyer d'un F ou G depuis août 2022</li>
    <li><strong>Copropriété bloquante</strong> : si l'AG refuse les travaux collectifs</li>
    <li><strong>Coût réel vs estimations</strong> : prévoir 20% de marge</li>
  </ul>

  <h2>Cas particuliers</h2>
  <h3>Logements en copropriété</h3>
  <p>Si l'amélioration du DPE nécessite des travaux sur parties communes (façade, toiture), vous dépendez du vote en AG. Certaines copropriétés sont bloquées depuis des années.</p>

  <h3>Dérogations possibles</h3>
  <ul>
    <li>Contraintes architecturales (monuments historiques)</li>
    <li>Coût disproportionné par rapport à la valeur du bien</li>
    <li>Impossibilité technique avérée</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Investir dans une passoire thermique peut être une opportunité si le prix intègre la décote et que les travaux sont réalisables. Faites réaliser un audit énergétique et des devis AVANT l'achat. Utilisez notre <a href="/simulateur-passoire-thermique">simulateur passoire thermique</a> pour évaluer la rentabilité.</p>
  `
  },

  'sci-vs-nom-propre': {
    titre: 'SCI ou nom propre : comment choisir pour investir en immobilier',
    categorie: 'immobilier',
    keywords: 'SCI, nom propre, investissement immobilier, fiscalité SCI, création SCI, avantages SCI',
    description: `SCI ou achat en nom propre ? Comparez les avantages, inconvénients, fiscalité et coûts de chaque option pour votre investissement immobilier.`,
    contenu: `
  <h2>Introduction</h2>
  <p>Lors d'un investissement immobilier, la question du <strong>véhicule juridique</strong> se pose : acheter en nom propre ou créer une SCI (Société Civile Immobilière) ? Le choix a des implications importantes en termes de fiscalité, transmission et gestion.</p>

  <h2>L'achat en nom propre</h2>
  <h3>Avantages</h3>
  <ul>
    <li><strong>Simplicité</strong> : pas de formalités de création</li>
    <li><strong>Coût réduit</strong> : pas de frais de structure</li>
    <li><strong>Régime micro-foncier</strong> : abattement 30% si revenus < 15 000€/an</li>
    <li><strong>Exonération plus-value</strong> : totale après 22 ans (IR) et 30 ans (PS)</li>
    <li><strong>Résidence principale</strong> : exonération totale de plus-value</li>
    <li><strong>Crédit plus facile</strong> : les banques préfèrent les particuliers</li>
  </ul>

  <h3>Inconvénients</h3>
  <ul>
    <li><strong>Transmission coûteuse</strong> : droits de succession élevés</li>
    <li><strong>Indivision</strong> : blocages possibles entre héritiers</li>
    <li><strong>Pas d'amortissement</strong> : sauf en LMNP</li>
    <li><strong>Revenus fonciers</strong> : imposés à la TMI + 17,2% PS</li>
  </ul>

  <h2>La SCI (Société Civile Immobilière)</h2>
  <h3>Avantages</h3>
  <ul>
    <li><strong>Transmission facilitée</strong> : donation de parts avec décote</li>
    <li><strong>Gestion simplifiée</strong> : pas d'indivision, un gérant décide</li>
    <li><strong>Option IS possible</strong> : amortissement et taux réduit 15%</li>
    <li><strong>Protection du patrimoine</strong> : séparation des actifs</li>
    <li><strong>Démembrement</strong> : stratégies patrimoniales avancées</li>
    <li><strong>Investissement à plusieurs</strong> : répartition claire des parts</li>
  </ul>

  <h3>Inconvénients</h3>
  <ul>
    <li><strong>Coût de création</strong> : 500 à 2000€</li>
    <li><strong>Comptabilité obligatoire</strong> : si IS, ~1500€/an</li>
    <li><strong>Plus-value IS</strong> : calculée sur valeur nette comptable</li>
    <li><strong>Crédit plus difficile</strong> : garanties personnelles demandées</li>
    <li><strong>Pas de micro-foncier</strong> : régime réel obligatoire</li>
  </ul>

  <h2>Comparaison fiscale</h2>
  <h3>SCI à l'IR (transparence fiscale)</h3>
  <ul>
    <li>Revenus imposés comme en nom propre (revenus fonciers)</li>
    <li>Plus-value des particuliers (exonération progressive)</li>
    <li>Intérêt : transmission, gestion, pas d'indivision</li>
  </ul>

  <h3>SCI à l'IS (opaque fiscalement)</h3>
  <ul>
    <li><strong>IS 15%</strong> jusqu'à 42 500€, puis 25%</li>
    <li><strong>Amortissement déductible</strong> : 2-3%/an sur le bâti</li>
    <li><strong>Plus-value professionnelle</strong> : sur valeur nette (pas d'exonération)</li>
    <li><strong>Dividendes</strong> : imposés au PFU 30%</li>
    <li>Intérêt : cash-flow élevé, capitalisation long terme</li>
  </ul>

  <h2>Tableau comparatif</h2>
  <table>
    <thead>
      <tr>
        <th>Critère</th>
        <th>Nom propre</th>
        <th>SCI IR</th>
        <th>SCI IS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Simplicité</td>
        <td>+++</td>
        <td>++</td>
        <td>+</td>
      </tr>
      <tr>
        <td>Coût annuel</td>
        <td>0€</td>
        <td>200-500€</td>
        <td>1500-2500€</td>
      </tr>
      <tr>
        <td>Transmission</td>
        <td>+</td>
        <td>+++</td>
        <td>+++</td>
      </tr>
      <tr>
        <td>Fiscalité courante</td>
        <td>++</td>
        <td>++</td>
        <td>+++</td>
      </tr>
      <tr>
        <td>Plus-value revente</td>
        <td>+++</td>
        <td>+++</td>
        <td>+</td>
      </tr>
    </tbody>
  </table>

  <h2>Quand choisir le nom propre ?</h2>
  <ul>
    <li>Premier investissement simple</li>
    <li>Résidence principale ou secondaire</li>
    <li>Revenus fonciers < 15 000€ (micro-foncier)</li>
    <li>Projet de revente à moyen terme</li>
    <li>TMI faible (11% ou 30%)</li>
  </ul>

  <h2>Quand choisir la SCI ?</h2>
  <ul>
    <li>Investissement à plusieurs (couple, famille)</li>
    <li>Projet de transmission anticipée</li>
    <li>Patrimoine immobilier multiple</li>
    <li>TMI élevée (41-45%) avec option IS</li>
    <li>Stratégie long terme de capitalisation</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Il n'y a pas de solution universelle. Le choix dépend de votre situation familiale, fiscale et patrimoniale. Pour un premier investissement simple, le nom propre suffit. Pour une stratégie patrimoniale à long terme avec transmission, la SCI devient pertinente. Consultez un notaire ou un expert-comptable pour une analyse personnalisée.</p>
  `
  },

  'demembrement-propriete': {
    titre: 'Le démembrement de propriété : nue-propriété et usufruit',
    categorie: 'immobilier',
    keywords: 'démembrement propriété, nue-propriété, usufruit, transmission patrimoine, optimisation fiscale démembrement',
    description: `Le démembrement de propriété permet de séparer nue-propriété et usufruit. Découvrez ses applications pour la transmission, l'investissement et l'optimisation fiscale.`,
    contenu: `
  <h2>Qu'est-ce que le démembrement ?</h2>
  <p>Le <strong>démembrement de propriété</strong> consiste à diviser le droit de propriété en deux parties :</p>
  <ul>
    <li><strong>La nue-propriété</strong> : droit de disposer du bien (vendre, donner)</li>
    <li><strong>L'usufruit</strong> : droit d'utiliser le bien et d'en percevoir les revenus</li>
  </ul>
  <p>Le démembrement peut être viager (jusqu'au décès de l'usufruitier) ou temporaire (durée fixe).</p>

  <h2>Valeur de l'usufruit et de la nue-propriété</h2>
  <h3>Barème fiscal (usufruit viager)</h3>
  <table>
    <thead>
      <tr>
        <th>Âge de l'usufruitier</th>
        <th>Valeur usufruit</th>
        <th>Valeur nue-propriété</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Moins de 21 ans</td><td>90%</td><td>10%</td></tr>
      <tr><td>21-30 ans</td><td>80%</td><td>20%</td></tr>
      <tr><td>31-40 ans</td><td>70%</td><td>30%</td></tr>
      <tr><td>41-50 ans</td><td>60%</td><td>40%</td></tr>
      <tr><td>51-60 ans</td><td>50%</td><td>50%</td></tr>
      <tr><td>61-70 ans</td><td>40%</td><td>60%</td></tr>
      <tr><td>71-80 ans</td><td>30%</td><td>70%</td></tr>
      <tr><td>81-90 ans</td><td>20%</td><td>80%</td></tr>
      <tr><td>Plus de 90 ans</td><td>10%</td><td>90%</td></tr>
    </tbody>
  </table>

  <h3>Usufruit temporaire</h3>
  <p>Valorisé à 23% de la valeur en pleine propriété par période de 10 ans, plafonné à la valeur de l'usufruit viager.</p>

  <h2>Applications du démembrement</h2>
  <h3>1. Donation avec réserve d'usufruit</h3>
  <p>Les parents donnent la nue-propriété à leurs enfants tout en conservant l'usufruit :</p>
  <ul>
    <li>Droits de donation calculés sur la nue-propriété seulement</li>
    <li>Au décès, les enfants deviennent pleins propriétaires sans droits supplémentaires</li>
    <li>Les parents continuent à percevoir les loyers ou habiter le bien</li>
  </ul>

  <h3>2. Achat en nue-propriété</h3>
  <p>Acheter uniquement la nue-propriété avec un usufruit temporaire (souvent 15-20 ans) :</p>
  <ul>
    <li><strong>Prix d'achat</strong> : 60-70% de la valeur en pleine propriété</li>
    <li><strong>Pas de revenus</strong> pendant la période d'usufruit</li>
    <li><strong>Pas de charges locatives</strong> : supportées par l'usufruitier</li>
    <li><strong>Récupération automatique</strong> de la pleine propriété à l'extinction</li>
  </ul>

  <h3>3. Cession d'usufruit temporaire</h3>
  <p>Un propriétaire cède temporairement l'usufruit à une société ou un bailleur social :</p>
  <ul>
    <li>Encaissement immédiat d'un capital</li>
    <li>Sortie des revenus fonciers de l'IR</li>
    <li>Récupération du bien libre à terme</li>
  </ul>

  <h2>Avantages fiscaux</h2>
  <h3>Transmission</h3>
  <ul>
    <li>Réduction de l'assiette des droits de donation</li>
    <li>Extinction de l'usufruit au décès sans droits de succession</li>
    <li>Utilisation optimale des abattements (100 000€/enfant tous les 15 ans)</li>
  </ul>

  <h3>IFI (Impôt sur la Fortune Immobilière)</h3>
  <ul>
    <li>Le nu-propriétaire n'est pas redevable de l'IFI</li>
    <li>Seul l'usufruitier déclare le bien pour sa valeur en pleine propriété</li>
  </ul>

  <h3>Revenus fonciers</h3>
  <ul>
    <li>Le nu-propriétaire ne perçoit pas de revenus, donc pas d'imposition</li>
    <li>Intéressant pour les contribuables à TMI élevée</li>
  </ul>

  <h2>Charges et travaux</h2>
  <ul>
    <li><strong>Usufruitier</strong> : entretien courant, charges locatives, taxe foncière (en principe)</li>
    <li><strong>Nu-propriétaire</strong> : grosses réparations (article 606 Code Civil) : murs, voûtes, toiture, etc.</li>
  </ul>

  <h2>Risques et limites</h2>
  <ul>
    <li><strong>Illiquidité</strong> : difficile de revendre une nue-propriété</li>
    <li><strong>Usufruit viager</strong> : durée incertaine</li>
    <li><strong>Qualité de l'usufruitier</strong> : risque de mauvais entretien</li>
    <li><strong>Valeur à terme</strong> : incertitude sur le marché immobilier</li>
  </ul>

  <h2>Exemples chiffrés</h2>
  <h3>Donation à 65 ans</h3>
  <p>Bien de 400 000€, parent de 65 ans :</p>
  <ul>
    <li>Valeur usufruit : 40% = 160 000€</li>
    <li>Valeur nue-propriété : 60% = 240 000€</li>
    <li>Droits de donation sur 240 000€ - 100 000€ (abattement) = 140 000€</li>
    <li>Au décès, l'enfant récupère la pleine propriété sans frais</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le démembrement est un outil puissant de stratégie patrimoniale, particulièrement efficace pour la transmission et l'optimisation fiscale. Il nécessite une analyse approfondie avec un notaire ou un conseiller en gestion de patrimoine.</p>
  `
  },

  'location-meublee-vs-nue': {
    titre: 'Location meublée vs location nue : comparatif complet',
    categorie: 'immobilier',
    keywords: 'location meublée, location nue, LMNP, revenus fonciers, BIC, fiscalité location, bail meublé',
    description: `Location meublée ou nue ? Comparez fiscalité, rendement, contraintes et avantages de chaque régime pour optimiser votre investissement locatif.`,
    contenu: `
  <h2>Introduction</h2>
  <p>Le choix entre <strong>location meublée</strong> et <strong>location nue</strong> impacte significativement la rentabilité de votre investissement. Les différences portent sur la fiscalité, le bail, la gestion et le rendement.</p>

  <h2>Différences juridiques</h2>
  <h3>Location nue</h3>
  <ul>
    <li><strong>Bail</strong> : 3 ans minimum (6 ans si bailleur personne morale)</li>
    <li><strong>Préavis locataire</strong> : 3 mois (1 mois en zone tendue)</li>
    <li><strong>Préavis bailleur</strong> : 6 mois pour motifs légitimes</li>
    <li><strong>Dépôt de garantie</strong> : 1 mois maximum</li>
    <li><strong>Révision loyer</strong> : indexée sur l'IRL</li>
  </ul>

  <h3>Location meublée</h3>
  <ul>
    <li><strong>Bail</strong> : 1 an minimum (9 mois pour étudiants)</li>
    <li><strong>Préavis locataire</strong> : 1 mois</li>
    <li><strong>Préavis bailleur</strong> : 3 mois pour motifs légitimes</li>
    <li><strong>Dépôt de garantie</strong> : 2 mois maximum</li>
    <li><strong>Liste d'équipements</strong> : obligatoire (décret 2015)</li>
  </ul>

  <h2>Équipements obligatoires en meublé</h2>
  <ul>
    <li>Literie avec couette ou couverture</li>
    <li>Volets ou rideaux dans les chambres</li>
    <li>Plaques de cuisson</li>
    <li>Four ou micro-ondes</li>
    <li>Réfrigérateur avec compartiment congélation</li>
    <li>Vaisselle et ustensiles de cuisine</li>
    <li>Table et chaises</li>
    <li>Rangements</li>
    <li>Luminaires</li>
    <li>Matériel d'entretien ménager</li>
  </ul>

  <h2>Comparaison fiscale</h2>
  <h3>Location nue - Revenus fonciers</h3>
  <ul>
    <li><strong>Micro-foncier</strong> : si revenus < 15 000€/an, abattement 30%</li>
    <li><strong>Régime réel</strong> : déduction des charges réelles (intérêts, travaux, charges)</li>
    <li><strong>Imposition</strong> : TMI + 17,2% prélèvements sociaux</li>
    <li><strong>Déficit foncier</strong> : imputable sur revenu global jusqu'à 10 700€/an</li>
  </ul>

  <h3>Location meublée - BIC (LMNP/LMP)</h3>
  <ul>
    <li><strong>Micro-BIC</strong> : si recettes < 77 700€/an, abattement 50%</li>
    <li><strong>Régime réel</strong> : déduction charges + amortissement du bien et des meubles</li>
    <li><strong>Amortissement</strong> : ~2-3% du bâti/an + meubles sur 5-10 ans</li>
    <li><strong>Déficit</strong> : reportable sur BIC meublés futurs (pas sur revenu global)</li>
  </ul>

  <h2>Exemple comparatif chiffré</h2>
  <p>Appartement de 200 000€, loyer 800€/mois, TMI 30% :</p>

  <h3>Location nue (régime réel)</h3>
  <ul>
    <li>Revenus : 9 600€</li>
    <li>Charges déductibles : -4 000€ (intérêts, charges, travaux)</li>
    <li>Revenu imposable : 5 600€</li>
    <li>Impôt : 5 600€ × (30% + 17,2%) = 2 643€</li>
    <li><strong>Net après impôt : 6 957€</strong></li>
  </ul>

  <h3>Location meublée (réel LMNP)</h3>
  <ul>
    <li>Revenus : 10 400€ (loyer +10% car meublé)</li>
    <li>Charges : -4 000€</li>
    <li>Amortissement : -5 000€</li>
    <li>Revenu imposable : 1 400€</li>
    <li>Impôt : 1 400€ × (30% + 17,2%) = 661€</li>
    <li><strong>Net après impôt : 9 739€</strong></li>
  </ul>

  <h2>Avantages de la location nue</h2>
  <ul>
    <li>Gestion simplifiée (pas de meubles à entretenir)</li>
    <li>Locataires généralement plus stables</li>
    <li>Déficit foncier imputable sur revenu global</li>
    <li>Micro-foncier simple si faibles revenus</li>
  </ul>

  <h2>Avantages de la location meublée</h2>
  <ul>
    <li>Loyers 10-30% plus élevés</li>
    <li>Fiscalité très avantageuse (amortissement)</li>
    <li>Flexibilité du bail (1 an)</li>
    <li>Abattement micro-BIC de 50%</li>
    <li>Souvent meilleur rendement net</li>
  </ul>

  <h2>Quand choisir la location nue ?</h2>
  <ul>
    <li>Bien familial loué à long terme</li>
    <li>Travaux importants à déduire (déficit foncier)</li>
    <li>Faibles revenus fonciers (micro-foncier)</li>
    <li>Locataires recherchant la stabilité</li>
  </ul>

  <h2>Quand choisir la location meublée ?</h2>
  <ul>
    <li>Studios, T1, T2 en zone urbaine</li>
    <li>Cible étudiants ou jeunes actifs</li>
    <li>Objectif d'optimisation fiscale</li>
    <li>TMI élevée (30% et plus)</li>
    <li>Souhait de flexibilité</li>
  </ul>

  <h2>Passage de nue à meublée</h2>
  <p>Attention : le passage en meublé pendant un bail en cours n'est pas possible. Il faut attendre la fin du bail et ne pas renouveler, puis signer un nouveau bail meublé avec équipements.</p>

  <h2>Conclusion</h2>
  <p>La location meublée offre généralement une meilleure rentabilité nette grâce à l'amortissement et aux loyers plus élevés. Cependant, elle demande plus de gestion et convient mieux aux petites surfaces en zone urbaine. Utilisez notre <a href="/lmnp-lmp-regime-fiscal">simulateur LMNP/LMP</a> pour comparer les deux options.</p>
  `
  },

  'neuf-vs-ancien': {
    titre: 'Investir dans le neuf ou l\'ancien : comparatif détaillé',
    categorie: 'immobilier',
    keywords: 'immobilier neuf, immobilier ancien, investissement neuf ancien, avantages neuf, rénovation ancien, Pinel',
    description: `Neuf ou ancien pour votre investissement immobilier ? Comparez prix, rendement, fiscalité, travaux et rentabilité de chaque option.`,
    contenu: `
  <h2>Introduction</h2>
  <p>Le choix entre <strong>immobilier neuf</strong> et <strong>ancien</strong> est crucial pour tout investisseur. Chaque option a ses avantages et inconvénients en termes de prix, rendement, fiscalité et gestion.</p>

  <h2>Prix d'achat</h2>
  <h3>Immobilier neuf</h3>
  <ul>
    <li>Prix au m² : 20-40% plus cher que l'ancien</li>
    <li>Frais de notaire : ~2-3% (vs 7-8% dans l'ancien)</li>
    <li>TVA incluse : 20% (5,5% en zone ANRU)</li>
    <li>Pas de travaux à prévoir</li>
  </ul>

  <h3>Immobilier ancien</h3>
  <ul>
    <li>Prix au m² : généralement plus bas</li>
    <li>Frais de notaire : ~7-8%</li>
    <li>Négociation possible : 5-15% selon le marché</li>
    <li>Travaux potentiels à budgéter</li>
  </ul>

  <h2>Rendement locatif</h2>
  <h3>Dans le neuf</h3>
  <ul>
    <li><strong>Rendement brut</strong> : 2-4% en général</li>
    <li>Prix d'achat élevé = rendement plus faible</li>
    <li>Loyers plafonnés si dispositif fiscal (Pinel)</li>
    <li>Peu de vacance locative (bien attractif)</li>
  </ul>

  <h3>Dans l'ancien</h3>
  <ul>
    <li><strong>Rendement brut</strong> : 5-10% possible</li>
    <li>Prix d'achat plus bas = meilleur rendement</li>
    <li>Possibilité de créer de la valeur (travaux)</li>
    <li>Emplacement souvent meilleur (centre-ville)</li>
  </ul>

  <h2>Fiscalité</h2>
  <h3>Avantages fiscaux du neuf</h3>
  <ul>
    <li><strong>Pinel</strong> : réduction d'impôt 10,5% à 17,5% (jusqu'à fin 2024)</li>
    <li><strong>Pinel+</strong> : jusqu'à 21% dans certaines zones</li>
    <li><strong>LMNP neuf</strong> : amortissement sur valeur totale</li>
    <li><strong>TVA réduite 5,5%</strong> en zone ANRU</li>
  </ul>

  <h3>Avantages fiscaux de l'ancien</h3>
  <ul>
    <li><strong>Déficit foncier</strong> : travaux déductibles (jusqu'à 10 700€/an sur revenu global)</li>
    <li><strong>LMNP ancien</strong> : amortissement + déduction travaux</li>
    <li><strong>Denormandie</strong> : équivalent Pinel dans l'ancien rénové</li>
    <li><strong>Malraux</strong> : réduction jusqu'à 30% des travaux (secteurs sauvegardés)</li>
  </ul>

  <h2>Qualité et normes</h2>
  <h3>Immobilier neuf</h3>
  <ul>
    <li>Normes RT 2020 / RE 2020 : très bonne isolation</li>
    <li>DPE A ou B garanti</li>
    <li>Garanties constructeur : parfait achèvement, biennale, décennale</li>
    <li>Charges de copropriété faibles</li>
    <li>Équipements modernes (ascenseur, parking, etc.)</li>
  </ul>

  <h3>Immobilier ancien</h3>
  <ul>
    <li>Qualité variable selon l'époque de construction</li>
    <li>DPE souvent D à G (travaux possibles)</li>
    <li>Pas de garantie (sauf vices cachés)</li>
    <li>Charges potentiellement élevées</li>
    <li>Cachet et caractère (parquet, moulures, hauteur sous plafond)</li>
  </ul>

  <h2>Localisation</h2>
  <h3>Neuf</h3>
  <ul>
    <li>Souvent en périphérie ou quartiers en développement</li>
    <li>Projets urbains, transports en commun à venir</li>
    <li>Risque de sur-offre locative (programmes identiques)</li>
  </ul>

  <h3>Ancien</h3>
  <ul>
    <li>Centre-ville, quartiers établis</li>
    <li>Commerces et services existants</li>
    <li>Demande locative éprouvée</li>
  </ul>

  <h2>Gestion et entretien</h2>
  <h3>Neuf</h3>
  <ul>
    <li>Aucuns travaux pendant 10-15 ans minimum</li>
    <li>Faible rotation des locataires (bien attractif)</li>
    <li>Garanties en cas de malfaçons</li>
  </ul>

  <h3>Ancien</h3>
  <ul>
    <li>Travaux d'entretien réguliers</li>
    <li>Ravalement, toiture, parties communes</li>
    <li>Mise aux normes possible (électricité, plomberie)</li>
  </ul>

  <h2>Tableau comparatif</h2>
  <table>
    <thead>
      <tr>
        <th>Critère</th>
        <th>Neuf</th>
        <th>Ancien</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Prix d'achat</td><td>Élevé</td><td>Modéré à élevé</td></tr>
      <tr><td>Frais de notaire</td><td>2-3%</td><td>7-8%</td></tr>
      <tr><td>Rendement brut</td><td>2-4%</td><td>5-10%</td></tr>
      <tr><td>Travaux</td><td>Aucun</td><td>Variables</td></tr>
      <tr><td>Défiscalisation</td><td>Pinel</td><td>Déficit foncier, Denormandie</td></tr>
      <tr><td>Localisation</td><td>Périphérie</td><td>Centre-ville</td></tr>
      <tr><td>Performance énergétique</td><td>Excellente</td><td>Variable</td></tr>
    </tbody>
  </table>

  <h2>Quand choisir le neuf ?</h2>
  <ul>
    <li>Objectif de défiscalisation (Pinel)</li>
    <li>Pas de temps pour gérer des travaux</li>
    <li>Investissement patrimonial long terme</li>
    <li>Clientèle locative exigeante</li>
  </ul>

  <h2>Quand choisir l'ancien ?</h2>
  <ul>
    <li>Recherche de rendement</li>
    <li>Capacité à réaliser ou superviser des travaux</li>
    <li>Emplacement premium souhaité</li>
    <li>Opportunités de décote (succession, passoire thermique)</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le neuf convient aux investisseurs recherchant la tranquillité et la défiscalisation, tandis que l'ancien offre de meilleurs rendements et opportunités de création de valeur. L'idéal est souvent de combiner les deux selon vos objectifs patrimoniaux.</p>
  `
  },

  'guide-scpi': {
    titre: 'Guide complet des SCPI : investir dans la pierre-papier',
    categorie: 'finance',
    keywords: 'SCPI, pierre papier, investissement SCPI, rendement SCPI, fiscalité SCPI, SCPI de rendement',
    description: `Les SCPI permettent d'investir dans l'immobilier sans gestion. Découvrez leur fonctionnement, rendement, fiscalité et comment bien choisir.`,
    contenu: `
  <h2>Qu'est-ce qu'une SCPI ?</h2>
  <p>Une <strong>SCPI (Société Civile de Placement Immobilier)</strong> est un véhicule d'investissement collectif qui permet d'investir dans l'immobilier professionnel ou résidentiel sans avoir à gérer directement les biens.</p>

  <h2>Fonctionnement</h2>
  <ul>
    <li>Vous achetez des <strong>parts</strong> de la SCPI</li>
    <li>La société de gestion achète et gère les immeubles</li>
    <li>Vous percevez des <strong>revenus trimestriels</strong> proportionnels à vos parts</li>
    <li>La gestion est totalement déléguée</li>
  </ul>

  <h2>Types de SCPI</h2>
  <h3>SCPI de rendement</h3>
  <ul>
    <li>Objectif : générer des revenus réguliers</li>
    <li>Immobilier tertiaire : bureaux, commerces, entrepôts</li>
    <li>Rendement moyen : 4-6% par an</li>
  </ul>

  <h3>SCPI fiscales</h3>
  <ul>
    <li>Objectif : bénéficier d'avantages fiscaux</li>
    <li>SCPI Pinel, Malraux, déficit foncier</li>
    <li>Rendement plus faible mais réduction d'impôt</li>
  </ul>

  <h3>SCPI de plus-value</h3>
  <ul>
    <li>Objectif : valorisation du capital</li>
    <li>Immobilier à rénover ou à fort potentiel</li>
    <li>Peu de revenus, gain à la revente</li>
  </ul>

  <h2>Avantages des SCPI</h2>
  <ul>
    <li><strong>Accessibilité</strong> : investir dès quelques centaines d'euros</li>
    <li><strong>Diversification</strong> : patrimoine réparti sur de nombreux biens</li>
    <li><strong>Gestion déléguée</strong> : aucune contrainte de gestion</li>
    <li><strong>Mutualisation des risques</strong> : vacance locative diluée</li>
    <li><strong>Revenus réguliers</strong> : distribution trimestrielle</li>
    <li><strong>Liquidité</strong> : revente possible (marché secondaire)</li>
  </ul>

  <h2>Inconvénients</h2>
  <ul>
    <li><strong>Frais élevés</strong> : 8-12% de frais de souscription</li>
    <li><strong>Fiscalité lourde</strong> : revenus fonciers (TMI + 17,2% PS)</li>
    <li><strong>Illiquidité relative</strong> : délai de revente variable</li>
    <li><strong>Pas de garantie</strong> : capital non garanti</li>
    <li><strong>Rendement non garanti</strong> : peut baisser</li>
  </ul>

  <h2>Rendement des SCPI</h2>
  <h3>Taux de distribution 2023-2024</h3>
  <ul>
    <li>Moyenne du marché : 4,5%</li>
    <li>Meilleures SCPI : 6-7%</li>
    <li>SCPI européennes : souvent meilleures (fiscalité)</li>
  </ul>

  <h3>Performance globale</h3>
  <p>Rendement + valorisation des parts. Sur 10 ans, performance annualisée de 5-7% en moyenne.</p>

  <h2>Fiscalité des SCPI</h2>
  <h3>Revenus</h3>
  <ul>
    <li>Imposés comme <strong>revenus fonciers</strong></li>
    <li>TMI (0% à 45%) + 17,2% prélèvements sociaux</li>
    <li>Possibilité de déficit foncier si travaux</li>
  </ul>

  <h3>Plus-values</h3>
  <ul>
    <li>Régime des plus-values immobilières</li>
    <li>Exonération progressive sur 22 ans (IR) et 30 ans (PS)</li>
  </ul>

  <h3>Optimisation fiscale</h3>
  <ul>
    <li><strong>Assurance-vie</strong> : SCPI en UC, fiscalité AV</li>
    <li><strong>SCPI européennes</strong> : revenus moins taxés (conventions fiscales)</li>
    <li><strong>Démembrement</strong> : achat en nue-propriété, pas d'IR pendant la période</li>
    <li><strong>Société IS</strong> : intégration dans une holding</li>
  </ul>

  <h2>Comment investir en SCPI ?</h2>
  <h3>Au comptant</h3>
  <p>Achat direct de parts. Frais de souscription déduits du prix.</p>

  <h3>À crédit</h3>
  <p>Effet de levier possible. Les intérêts sont déductibles des revenus fonciers. Attention aux taux actuels.</p>

  <h3>Via assurance-vie</h3>
  <p>Fiscalité avantageuse de l'AV. Frais supplémentaires du contrat. Rendement légèrement réduit.</p>

  <h3>En démembrement</h3>
  <p>Achat de la nue-propriété à prix réduit. Pas de revenus pendant la période. Récupération de la pleine propriété à terme.</p>

  <h2>Critères de choix d'une SCPI</h2>
  <ul>
    <li><strong>Taux d'occupation financier (TOF)</strong> : > 90% recommandé</li>
    <li><strong>Capitalisation</strong> : préférer les grosses SCPI (> 500M€)</li>
    <li><strong>Diversification</strong> : géographique et sectorielle</li>
    <li><strong>Historique de rendement</strong> : régularité sur 5-10 ans</li>
    <li><strong>Report à nouveau</strong> : réserve de distribution</li>
    <li><strong>Frais</strong> : comparer souscription et gestion</li>
  </ul>

  <h2>Top SCPI par catégorie</h2>
  <h3>Bureaux</h3>
  <p>Primopierre, Épargne Foncière, Rivoli Avenir Patrimoine</p>

  <h3>Diversifiées</h3>
  <p>Corum Origin, Immorente, Pierval Santé</p>

  <h3>Européennes</h3>
  <p>Corum XL, Novapierre Allemagne, Eurion</p>

  <h2>Conclusion</h2>
  <p>Les SCPI offrent une solution simple pour investir dans l'immobilier avec des rendements attractifs. Attention à la fiscalité qui peut peser lourdement. L'achat à crédit ou en assurance-vie permet d'optimiser. Utilisez notre <a href="/simulateur-scpi">simulateur SCPI</a> pour évaluer votre investissement.</p>
  `
  },

  'private-equity': {
    titre: 'Private Equity : investir dans les entreprises non cotées',
    categorie: 'finance',
    keywords: 'private equity, capital investissement, FCPR, FCPI, FIP, investissement PME',
    description: `Le Private Equity permet d'investir dans des entreprises non cotées. Découvrez son fonctionnement, les véhicules d'investissement et les risques.`,
    contenu: `
  <h2>Qu'est-ce que le Private Equity ?</h2>
  <p>Le <strong>Private Equity</strong> (capital-investissement) consiste à investir dans des entreprises non cotées en bourse. C'est une classe d'actifs alternative qui vise des rendements élevés en contrepartie d'une prise de risque importante et d'un horizon long terme.</p>

  <h2>Les différentes stratégies</h2>
  <h3>Capital-risque (Venture Capital)</h3>
  <ul>
    <li>Investissement dans des startups en phase de démarrage</li>
    <li>Risque très élevé, potentiel de gain important</li>
    <li>Horizon : 7-10 ans</li>
  </ul>

  <h3>Capital-développement (Growth)</h3>
  <ul>
    <li>Entreprises en forte croissance mais déjà rentables</li>
    <li>Financement de l'expansion</li>
    <li>Risque modéré à élevé</li>
  </ul>

  <h3>Capital-transmission (LBO)</h3>
  <ul>
    <li>Rachat d'entreprises matures avec effet de levier</li>
    <li>Restructuration et optimisation</li>
    <li>Rendement cible : 15-25% par an</li>
  </ul>

  <h3>Capital-retournement</h3>
  <ul>
    <li>Entreprises en difficulté</li>
    <li>Redressement et revente</li>
    <li>Risque très élevé</li>
  </ul>

  <h2>Comment investir en Private Equity ?</h2>
  <h3>Investissement direct</h3>
  <ul>
    <li>Réservé aux investisseurs qualifiés</li>
    <li>Ticket minimum : souvent 100 000€+</li>
    <li>Accès via business angels ou clubs d'investisseurs</li>
  </ul>

  <h3>Fonds de Private Equity</h3>
  <ul>
    <li><strong>FCPR</strong> (Fonds Commun de Placement à Risques) : minimum 70% en non coté</li>
    <li><strong>FCPI</strong> (Fonds Commun de Placement dans l'Innovation) : minimum 70% en PME innovantes</li>
    <li><strong>FIP</strong> (Fonds d'Investissement de Proximité) : PME régionales</li>
  </ul>

  <h3>Plateformes de crowdequity</h3>
  <ul>
    <li>Investissement dès 100€</li>
    <li>Startups et PME en croissance</li>
    <li>Exemples : Anaxago, Wiseed, Tudigo</li>
  </ul>

  <h2>Avantages fiscaux</h2>
  <h3>Réduction d'impôt IR (FCPI/FIP)</h3>
  <ul>
    <li>Réduction de 25% des sommes investies</li>
    <li>Plafond : 12 000€ (célibataire) ou 24 000€ (couple)</li>
    <li>Soit jusqu'à 3 000€ ou 6 000€ de réduction</li>
    <li>Conservation obligatoire : 5 ans minimum</li>
  </ul>

  <h3>Exonération des plus-values</h3>
  <p>Si conservation > 5 ans, exonération d'IR sur les plus-values (prélèvements sociaux restent dus).</p>

  <h3>PEA-PME</h3>
  <ul>
    <li>Plafond : 225 000€</li>
    <li>Exonération d'IR après 5 ans</li>
    <li>Éligible aux actions de PME européennes</li>
  </ul>

  <h2>Performance du Private Equity</h2>
  <h3>Rendements historiques</h3>
  <ul>
    <li>Capital-risque : très variable (-100% à +1000%)</li>
    <li>LBO : 10-20% annualisé sur 20 ans</li>
    <li>Moyenne du marché : 10-15% brut annuel</li>
  </ul>

  <h3>Dispersion des performances</h3>
  <p>Attention : les rendements moyens masquent une forte dispersion. Les meilleurs fonds surperforment largement, mais de nombreux investissements échouent.</p>

  <h2>Risques</h2>
  <ul>
    <li><strong>Perte en capital</strong> : possible et fréquente pour les startups</li>
    <li><strong>Illiquidité</strong> : capital bloqué 5-10 ans</li>
    <li><strong>Valorisation incertaine</strong> : pas de prix de marché</li>
    <li><strong>Dépendance aux gestionnaires</strong> : qualité variable</li>
    <li><strong>Frais élevés</strong> : gestion + performance (2% + 20%)</li>
  </ul>

  <h2>Critères de sélection</h2>
  <ul>
    <li><strong>Track record du gérant</strong> : performance des fonds précédents</li>
    <li><strong>Stratégie claire</strong> : secteur, stade, géographie</li>
    <li><strong>Alignement d'intérêts</strong> : co-investissement du gérant</li>
    <li><strong>Diversification</strong> : nombre d'entreprises en portefeuille</li>
    <li><strong>Frais raisonnables</strong> : comparaison avec le marché</li>
  </ul>

  <h2>Private Equity vs Bourse</h2>
  <table>
    <thead>
      <tr>
        <th>Critère</th>
        <th>Private Equity</th>
        <th>Actions cotées</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Liquidité</td><td>Très faible</td><td>Élevée</td></tr>
      <tr><td>Horizon</td><td>7-10 ans</td><td>Variable</td></tr>
      <tr><td>Rendement cible</td><td>10-20%</td><td>7-10%</td></tr>
      <tr><td>Volatilité</td><td>Non mesurée</td><td>Élevée</td></tr>
      <tr><td>Accessibilité</td><td>Limitée</td><td>Totale</td></tr>
      <tr><td>Diversification</td><td>Difficile</td><td>Facile</td></tr>
    </tbody>
  </table>

  <h2>Conclusion</h2>
  <p>Le Private Equity est une classe d'actifs attractive pour diversifier un patrimoine important, avec un potentiel de rendement supérieur aux marchés cotés. Il convient aux investisseurs patients, tolérants au risque et capables d'immobiliser leur capital sur le long terme. Les FCPI/FIP offrent un accès simplifié avec avantage fiscal.</p>
  `
  },

  'crowdfunding-immobilier': {
    titre: 'Crowdfunding immobilier : investir dès 1 000€ dans l\'immobilier',
    categorie: 'finance',
    keywords: 'crowdfunding immobilier, financement participatif immobilier, investir immobilier 1000 euros, rendement crowdfunding',
    description: `Le crowdfunding immobilier permet d'investir dans des projets immobiliers dès 1 000€. Découvrez son fonctionnement, rendements et risques.`,
    contenu: `
  <h2>Qu'est-ce que le crowdfunding immobilier ?</h2>
  <p>Le <strong>crowdfunding immobilier</strong> (financement participatif) permet aux particuliers d'investir collectivement dans des projets immobiliers : promotions, marchands de biens, rénovations. C'est un prêt aux promoteurs qui finance leurs opérations.</p>

  <h2>Fonctionnement</h2>
  <ol>
    <li>Un promoteur présente son projet sur une plateforme</li>
    <li>La plateforme analyse et sélectionne le projet</li>
    <li>Les investisseurs souscrivent (minimum souvent 1 000€)</li>
    <li>Le promoteur réalise l'opération (12-36 mois)</li>
    <li>Remboursement du capital + intérêts à l'échéance</li>
  </ol>

  <h2>Types de projets</h2>
  <ul>
    <li><strong>Promotion immobilière</strong> : construction neuve (résidentiel, bureaux)</li>
    <li><strong>Marchand de biens</strong> : achat-revente avec travaux</li>
    <li><strong>Rénovation</strong> : transformation de bâtiments existants</li>
    <li><strong>Aménagement foncier</strong> : viabilisation de terrains</li>
  </ul>

  <h2>Rendement</h2>
  <h3>Taux proposés</h3>
  <ul>
    <li>Moyenne du marché : 9-11% brut annuel</li>
    <li>Projets peu risqués : 7-9%</li>
    <li>Projets plus risqués : 10-12%</li>
  </ul>

  <h3>Durée</h3>
  <ul>
    <li>Moyenne : 18-24 mois</li>
    <li>Court terme : 12-15 mois</li>
    <li>Long terme : jusqu'à 36 mois</li>
  </ul>

  <h2>Avantages</h2>
  <ul>
    <li><strong>Accessibilité</strong> : dès 1 000€</li>
    <li><strong>Rendement attractif</strong> : 9-11% annuel</li>
    <li><strong>Durée courte</strong> : 12-24 mois</li>
    <li><strong>Diversification</strong> : nombreux projets disponibles</li>
    <li><strong>Simplicité</strong> : 100% en ligne</li>
    <li><strong>Pas de gestion</strong> : investissement passif</li>
  </ul>

  <h2>Risques</h2>
  <ul>
    <li><strong>Perte en capital</strong> : possible en cas de défaut du promoteur</li>
    <li><strong>Retard</strong> : projets fréquemment prolongés</li>
    <li><strong>Illiquidité</strong> : capital bloqué jusqu'à l'échéance</li>
    <li><strong>Défaut</strong> : taux moyen de 2-4% selon les plateformes</li>
    <li><strong>Concentration</strong> : risque si peu de projets</li>
  </ul>

  <h2>Fiscalité</h2>
  <ul>
    <li><strong>PFU (Flat Tax)</strong> : 30% sur les intérêts perçus</li>
    <li>Ou option pour le barème progressif si plus favorable</li>
    <li>Pertes éventuelles : imputables sur gains de même nature</li>
  </ul>

  <h2>Comment bien choisir ?</h2>
  <h3>Critères de sélection d'une plateforme</h3>
  <ul>
    <li><strong>Agrément AMF</strong> : obligatoire (CIP ou PSI)</li>
    <li><strong>Track record</strong> : historique de remboursement</li>
    <li><strong>Taux de défaut</strong> : < 3% idéalement</li>
    <li><strong>Transparence</strong> : informations détaillées sur les projets</li>
    <li><strong>Volume collecté</strong> : indicateur de solidité</li>
  </ul>

  <h3>Critères de sélection d'un projet</h3>
  <ul>
    <li><strong>LTV (Loan-to-Value)</strong> : ratio dette/valeur, idéalement < 70%</li>
    <li><strong>Expérience du promoteur</strong> : track record, solidité financière</li>
    <li><strong>Garanties</strong> : hypothèque, caution, GAPD</li>
    <li><strong>Pré-commercialisation</strong> : % de lots déjà vendus</li>
    <li><strong>Localisation</strong> : marché immobilier local dynamique</li>
  </ul>

  <h2>Principales plateformes</h2>
  <table>
    <thead>
      <tr>
        <th>Plateforme</th>
        <th>Collecte cumulée</th>
        <th>Taux moyen</th>
        <th>Défaut</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Homunity</td><td>700M€+</td><td>9%</td><td>~2%</td></tr>
      <tr><td>Anaxago</td><td>500M€+</td><td>10%</td><td>~2%</td></tr>
      <tr><td>ClubFunding</td><td>400M€+</td><td>10%</td><td>~3%</td></tr>
      <tr><td>Fundimmo</td><td>300M€+</td><td>9%</td><td>~2%</td></tr>
      <tr><td>Raizers</td><td>200M€+</td><td>10%</td><td>~3%</td></tr>
    </tbody>
  </table>

  <h2>Stratégie d'investissement</h2>
  <ul>
    <li><strong>Diversifier</strong> : minimum 10-20 projets différents</li>
    <li><strong>Étaler</strong> : investir régulièrement plutôt qu'un gros montant</li>
    <li><strong>Mixer les durées</strong> : court et moyen terme</li>
    <li><strong>Multiplier les plateformes</strong> : ne pas tout mettre sur une seule</li>
    <li><strong>Privilégier la qualité</strong> : taux élevé = risque élevé</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Le crowdfunding immobilier offre une alternative intéressante avec des rendements attractifs sur des durées courtes. Attention cependant au risque de perte en capital et aux retards fréquents. Une bonne diversification est essentielle. Utilisez notre <a href="/simulateur-crowdfunding-immo">simulateur crowdfunding immobilier</a> pour évaluer vos investissements.</p>
  `
  },

  'regle-4-pourcent': {
    titre: 'La règle des 4% : stratégie pour l\'indépendance financière',
    categorie: 'finance',
    keywords: 'règle des 4%, indépendance financière, FIRE, taux de retrait, rente perpétuelle, retraite anticipée',
    description: `La règle des 4% permet de calculer le capital nécessaire pour vivre de ses rentes. Découvrez son origine, son application et ses limites.`,
    contenu: `
  <h2>Qu'est-ce que la règle des 4% ?</h2>
  <p>La <strong>règle des 4%</strong> stipule qu'un retraité peut retirer 4% de son capital la première année, puis ajuster ce montant à l'inflation chaque année, avec une très forte probabilité de ne jamais épuiser son capital sur 30 ans.</p>

  <h2>Origine : l'étude Trinity</h2>
  <p>Cette règle provient de l'étude Trinity (1998), qui a analysé les performances historiques des portefeuilles actions/obligations américains de 1926 à 1995. Résultat : un taux de retrait de 4% offrait un taux de succès de 95% sur 30 ans.</p>

  <h2>Application pratique</h2>
  <h3>Calculer son objectif</h3>
  <p>Capital nécessaire = Dépenses annuelles × 25</p>
  <ul>
    <li>Si vous avez besoin de 30 000€/an : 30 000 × 25 = 750 000€</li>
    <li>Si vous avez besoin de 50 000€/an : 50 000 × 25 = 1 250 000€</li>
    <li>Si vous avez besoin de 80 000€/an : 80 000 × 25 = 2 000 000€</li>
  </ul>

  <h3>Fonctionnement des retraits</h3>
  <ol>
    <li>Année 1 : retirer 4% du capital initial</li>
    <li>Années suivantes : ajuster le montant à l'inflation</li>
    <li>Exemple : capital 1M€, an 1 = 40 000€, an 2 (2% inflation) = 40 800€</li>
  </ol>

  <h2>Allocation d'actifs recommandée</h2>
  <ul>
    <li><strong>60% actions / 40% obligations</strong> : allocation classique</li>
    <li><strong>75% actions / 25% obligations</strong> : plus de croissance, plus volatile</li>
    <li><strong>100% actions</strong> : rendement maximal, risque plus élevé</li>
  </ul>
  <p>L'étude Trinity montrait que les portefeuilles majoritairement en actions performaient mieux sur le long terme.</p>

  <h2>Limites de la règle</h2>
  <h3>Basée sur l'histoire américaine</h3>
  <ul>
    <li>Le marché US a surperformé historiquement</li>
    <li>Résultats potentiellement différents dans d'autres pays</li>
    <li>Performances passées ≠ performances futures</li>
  </ul>

  <h3>Horizon de 30 ans</h3>
  <ul>
    <li>Pour une retraite à 65 ans, 30 ans peut suffire</li>
    <li>Pour une retraite à 40 ans (FIRE), 50+ ans nécessaires</li>
    <li>Taux de 3,5% ou 3% plus prudent pour horizons longs</li>
  </ul>

  <h3>Frais et fiscalité</h3>
  <ul>
    <li>L'étude ne prend pas en compte les frais de gestion</li>
    <li>La fiscalité réduit le rendement net</li>
    <li>Prévoir une marge de sécurité</li>
  </ul>

  <h2>Variantes de la règle</h2>
  <h3>Taux de retrait variable</h3>
  <ul>
    <li><strong>Règle des 3%</strong> : plus conservatrice, capital ×33</li>
    <li><strong>Règle des 3,5%</strong> : compromis pour horizons > 30 ans</li>
    <li><strong>Retrait flexible</strong> : s'adapter aux conditions de marché</li>
  </ul>

  <h3>Guardrails (barrières de sécurité)</h3>
  <p>Ajuster le taux de retrait selon la performance du portefeuille :</p>
  <ul>
    <li>Si le portefeuille augmente fortement : possibilité d'augmenter les retraits</li>
    <li>Si le portefeuille baisse : réduire temporairement les retraits</li>
  </ul>

  <h2>Le mouvement FIRE</h2>
  <p>FIRE (Financial Independence, Retire Early) utilise la règle des 4% comme base :</p>
  <ul>
    <li><strong>Lean FIRE</strong> : dépenses minimales (~25 000€/an)</li>
    <li><strong>Fat FIRE</strong> : train de vie confortable (~100 000€/an)</li>
    <li><strong>Barista FIRE</strong> : semi-retraite avec revenus complémentaires</li>
    <li><strong>Coast FIRE</strong> : capital suffisant pour croître seul jusqu'à la retraite</li>
  </ul>

  <h2>Adapter à la France</h2>
  <ul>
    <li><strong>Retraite par répartition</strong> : la pension réduit le besoin de capital</li>
    <li><strong>Fiscalité</strong> : PFU 30%, ou barème IR selon les supports</li>
    <li><strong>Enveloppes fiscales</strong> : PEA, assurance-vie pour optimiser</li>
    <li><strong>Inflation européenne</strong> : historiquement plus faible qu'aux US</li>
  </ul>

  <h2>Exemple concret</h2>
  <p>Marie, 45 ans, veut prendre sa retraite à 50 ans :</p>
  <ul>
    <li>Dépenses actuelles : 40 000€/an</li>
    <li>Capital nécessaire (4%) : 1 000 000€</li>
    <li>Capital nécessaire (3,5%) : 1 143 000€ (plus prudent)</li>
    <li>Horizon : 40+ ans → privilégier 3,5%</li>
    <li>Pension retraite à 67 ans : 20 000€/an → besoin réduit après 67 ans</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La règle des 4% reste un excellent point de départ pour planifier l'indépendance financière. Pour plus de sécurité, surtout avec un horizon long, privilégiez 3,5% ou 3%. N'oubliez pas d'intégrer la fiscalité française et la future pension retraite dans vos calculs. Utilisez notre <a href="/simulateur-independance-financiere">simulateur d'indépendance financière</a> pour personnaliser votre plan.</p>
  `
  },

  'optimisation-fiscale': {
    titre: 'Optimisation fiscale légale : toutes les stratégies en France',
    categorie: 'finance',
    keywords: 'optimisation fiscale, réduction impôt, niches fiscales, défiscalisation, stratégies fiscales légales',
    description: `Découvrez toutes les stratégies légales pour réduire vos impôts en France : niches fiscales, placements, immobilier, épargne retraite.`,
    contenu: `
  <h2>Introduction</h2>
  <p>L'<strong>optimisation fiscale légale</strong> consiste à utiliser tous les dispositifs prévus par la loi pour réduire son imposition. Ce n'est pas de la fraude : c'est utiliser intelligemment le cadre fiscal existant.</p>

  <h2>Le plafonnement des niches fiscales</h2>
  <p>La plupart des avantages fiscaux sont plafonnés à <strong>10 000€/an</strong> de réduction d'impôt. Certains dispositifs bénéficient d'un plafond majoré (18 000€) ou sont hors plafond.</p>

  <h2>Réductions d'impôt sur le revenu</h2>
  <h3>Investissement locatif</h3>
  <ul>
    <li><strong>Pinel</strong> : 10,5% à 17,5% sur 6-12 ans (plafonné)</li>
    <li><strong>Denormandie</strong> : équivalent Pinel dans l'ancien rénové</li>
    <li><strong>Malraux</strong> : 22-30% des travaux (hors plafond)</li>
    <li><strong>Monuments historiques</strong> : déduction totale des travaux (hors plafond)</li>
  </ul>

  <h3>Épargne retraite</h3>
  <ul>
    <li><strong>PER</strong> : versements déductibles du revenu imposable (hors plafond des niches)</li>
    <li>Plafond : 10% des revenus (max ~35 000€/an)</li>
    <li>Report des plafonds non utilisés sur 3 ans</li>
  </ul>

  <h3>FCPI et FIP</h3>
  <ul>
    <li>Réduction de 25% des sommes investies</li>
    <li>Plafond : 12 000€ (24 000€ couple) → 3 000€ (6 000€) de réduction</li>
    <li>Soumis au plafonnement global</li>
  </ul>

  <h3>Emploi à domicile</h3>
  <ul>
    <li>Crédit d'impôt de 50% des dépenses</li>
    <li>Plafond : 12 000€ + 1 500€/personne à charge</li>
    <li>Maximum : 15 000€ → 7 500€ de crédit d'impôt</li>
  </ul>

  <h3>Dons aux associations</h3>
  <ul>
    <li><strong>66%</strong> pour les associations d'intérêt général</li>
    <li><strong>75%</strong> pour les organismes d'aide aux personnes (plafond 1 000€)</li>
    <li>Plafond global : 20% du revenu imposable</li>
    <li>Hors plafonnement des niches</li>
  </ul>

  <h2>Déductions du revenu imposable</h2>
  <h3>Déficit foncier</h3>
  <ul>
    <li>Travaux déductibles des revenus fonciers</li>
    <li>Excédent imputable sur revenu global : 10 700€/an</li>
    <li>Report du surplus sur revenus fonciers futurs (10 ans)</li>
  </ul>

  <h3>Pension alimentaire</h3>
  <ul>
    <li>Déductible du revenu imposable</li>
    <li>Plafond pour enfant majeur : 6 674€ (2024)</li>
  </ul>

  <h2>Optimisation des revenus du capital</h2>
  <h3>PEA (Plan d'Épargne en Actions)</h3>
  <ul>
    <li>Exonération d'IR après 5 ans</li>
    <li>Seuls les prélèvements sociaux (17,2%) sont dus</li>
    <li>Plafond : 150 000€</li>
  </ul>

  <h3>Assurance-vie</h3>
  <ul>
    <li>Fiscalité dégressive avec le temps</li>
    <li>Après 8 ans : abattement 4 600€ (9 200€ couple) puis 7,5%</li>
    <li>Transmission hors succession jusqu'à 152 500€/bénéficiaire</li>
  </ul>

  <h3>Option barème vs PFU</h3>
  <ul>
    <li>PFU (Flat Tax) : 30% forfaitaire</li>
    <li>Barème progressif : peut être avantageux si TMI ≤ 11%</li>
    <li>Avec le barème : abattement 40% sur dividendes, CSG déductible</li>
  </ul>

  <h2>Stratégies pour indépendants et dirigeants</h2>
  <h3>Rémunération vs dividendes</h3>
  <ul>
    <li>Optimiser le mix selon le statut (SASU, EURL, SARL)</li>
    <li>Utiliser notre <a href="/simulateur-dividendes-salaire">simulateur dividendes vs salaire</a></li>
  </ul>

  <h3>PER en société</h3>
  <ul>
    <li>Versements déductibles du bénéfice imposable</li>
    <li>Réduction IS pour l'entreprise + IR pour le dirigeant</li>
  </ul>

  <h3>Crédit d'impôt recherche (CIR)</h3>
  <ul>
    <li>30% des dépenses de R&D</li>
    <li>50% pour les PME dans certaines conditions</li>
  </ul>

  <h2>Stratégies immobilières</h2>
  <h3>LMNP (Location Meublée Non Professionnelle)</h3>
  <ul>
    <li>Amortissement du bien (non déductible en location nue)</li>
    <li>Souvent 0€ d'impôt pendant 10-15 ans</li>
  </ul>

  <h3>SCI à l'IS</h3>
  <ul>
    <li>IS 15% jusqu'à 42 500€ de bénéfice</li>
    <li>Amortissement déductible</li>
    <li>Capitalisation sans imposition immédiate</li>
  </ul>

  <h2>Stratégies de transmission</h2>
  <ul>
    <li><strong>Donation avant 80 ans</strong> : abattements renouvelables tous les 15 ans</li>
    <li><strong>Démembrement</strong> : réduction de la base taxable</li>
    <li><strong>Assurance-vie</strong> : hors succession jusqu'à 152 500€</li>
    <li><strong>Pacte Dutreil</strong> : 75% d'exonération sur entreprises</li>
  </ul>

  <h2>Tableau récapitulatif</h2>
  <table>
    <thead>
      <tr>
        <th>Dispositif</th>
        <th>Avantage</th>
        <th>Plafond niches</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>PER</td><td>Déduction IR</td><td>Hors plafond</td></tr>
      <tr><td>Pinel</td><td>10,5-17,5%</td><td>Dans plafond</td></tr>
      <tr><td>FCPI/FIP</td><td>25%</td><td>Dans plafond</td></tr>
      <tr><td>Emploi domicile</td><td>50%</td><td>Dans plafond</td></tr>
      <tr><td>Dons</td><td>66-75%</td><td>Hors plafond</td></tr>
      <tr><td>Malraux</td><td>22-30%</td><td>Hors plafond</td></tr>
    </tbody>
  </table>

  <h2>Conclusion</h2>
  <p>L'optimisation fiscale légale nécessite une vision globale de votre situation. Combinez plusieurs dispositifs dans le respect des plafonds. Faites-vous accompagner par un conseiller en gestion de patrimoine ou un expert-comptable pour une stratégie personnalisée.</p>
  `
  },

  'transmission-patrimoine': {
    titre: 'Transmission de patrimoine : donation, succession et assurance-vie',
    categorie: 'finance',
    keywords: 'transmission patrimoine, donation, succession, droits de succession, assurance-vie transmission, héritage',
    description: `Préparez la transmission de votre patrimoine : donations, abattements, assurance-vie, démembrement. Toutes les stratégies pour optimiser.`,
    contenu: `
  <h2>Introduction</h2>
  <p>La <strong>transmission de patrimoine</strong> est un sujet crucial qui nécessite une anticipation. En France, les droits de succession peuvent atteindre 60% selon le lien de parenté. Heureusement, de nombreux outils permettent d'optimiser cette transmission.</p>

  <h2>Les droits de succession</h2>
  <h3>Barème en ligne directe (parents/enfants)</h3>
  <table>
    <thead>
      <tr>
        <th>Tranche</th>
        <th>Taux</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Jusqu'à 8 072€</td><td>5%</td></tr>
      <tr><td>8 072€ - 12 109€</td><td>10%</td></tr>
      <tr><td>12 109€ - 15 932€</td><td>15%</td></tr>
      <tr><td>15 932€ - 552 324€</td><td>20%</td></tr>
      <tr><td>552 324€ - 902 838€</td><td>30%</td></tr>
      <tr><td>902 838€ - 1 805 677€</td><td>40%</td></tr>
      <tr><td>Au-delà</td><td>45%</td></tr>
    </tbody>
  </table>

  <h3>Autres situations</h3>
  <ul>
    <li><strong>Entre époux/partenaires PACS</strong> : exonération totale</li>
    <li><strong>Entre frères et sœurs</strong> : 35% puis 45% (abattement 15 932€)</li>
    <li><strong>Neveux et nièces</strong> : 55% (abattement 7 967€)</li>
    <li><strong>Non parents</strong> : 60%</li>
  </ul>

  <h2>Les abattements</h2>
  <h3>Abattements principaux</h3>
  <ul>
    <li><strong>Enfant</strong> : 100 000€</li>
    <li><strong>Petit-enfant</strong> : 31 865€</li>
    <li><strong>Arrière-petit-enfant</strong> : 5 310€</li>
    <li><strong>Frère/sœur</strong> : 15 932€</li>
    <li><strong>Neveu/nièce</strong> : 7 967€</li>
  </ul>

  <h3>Renouvellement des abattements</h3>
  <p>Les abattements se reconstituent tous les <strong>15 ans</strong>. Avec une bonne planification, on peut transmettre des sommes importantes en franchise de droits.</p>

  <h2>La donation</h2>
  <h3>Avantages de donner de son vivant</h3>
  <ul>
    <li>Utilisation des abattements (renouvelables tous les 15 ans)</li>
    <li>Voir ses proches profiter de la donation</li>
    <li>Réduction des droits pour les donations en pleine propriété avant 80 ans</li>
    <li>Gel de la valeur du bien (plus-value ultérieure non taxée)</li>
  </ul>

  <h3>Types de donations</h3>
  <ul>
    <li><strong>Don manuel</strong> : remise de main à main (argent, bijoux)</li>
    <li><strong>Donation simple</strong> : acte notarié</li>
    <li><strong>Donation-partage</strong> : répartition équitable entre héritiers</li>
    <li><strong>Donation avec réserve d'usufruit</strong> : conserver l'usage du bien</li>
  </ul>

  <h3>Don familial d'argent (Sarkozy)</h3>
  <ul>
    <li>31 865€ en franchise supplémentaire</li>
    <li>Conditions : donateur < 80 ans, donataire majeur</li>
    <li>Cumulable avec l'abattement classique</li>
    <li>Renouvelable tous les 15 ans</li>
  </ul>

  <h2>L'assurance-vie</h2>
  <h3>Avantages transmission</h3>
  <ul>
    <li><strong>Hors succession</strong> : versée directement aux bénéficiaires</li>
    <li><strong>Abattement de 152 500€</strong> par bénéficiaire (primes versées avant 70 ans)</li>
    <li><strong>Taxation allégée</strong> : 20% jusqu'à 700 000€, puis 31,25%</li>
    <li><strong>Liberté de désignation</strong> : pas forcément les héritiers légaux</li>
  </ul>

  <h3>Primes versées après 70 ans</h3>
  <ul>
    <li>Abattement global de 30 500€ (tous bénéficiaires confondus)</li>
    <li>Au-delà : droits de succession selon le lien de parenté</li>
    <li>Les intérêts restent exonérés de droits</li>
  </ul>

  <h3>Clause bénéficiaire</h3>
  <p>Essentielle pour optimiser : rédiger avec précision, démembrer si besoin, adapter à la situation familiale.</p>

  <h2>Le démembrement de propriété</h2>
  <h3>Principe</h3>
  <ul>
    <li>Donner la nue-propriété en conservant l'usufruit</li>
    <li>Droits calculés sur la nue-propriété seulement</li>
    <li>Au décès : les enfants deviennent pleins propriétaires sans droits supplémentaires</li>
  </ul>

  <h3>Exemple</h3>
  <p>Parents de 65 ans, bien de 400 000€ :</p>
  <ul>
    <li>Valeur nue-propriété (60%) : 240 000€</li>
    <li>Après abattement 100 000€ : 140 000€ taxables</li>
    <li>Droits : ~28 000€ au lieu de ~58 000€ en pleine propriété</li>
  </ul>

  <h2>Le Pacte Dutreil</h2>
  <p>Pour la transmission d'entreprises :</p>
  <ul>
    <li><strong>Exonération de 75%</strong> de la valeur des titres</li>
    <li>Engagement collectif de conservation (2 ans minimum)</li>
    <li>Engagement individuel (4 ans)</li>
    <li>Fonctions de direction pendant 3 ans</li>
  </ul>

  <h2>Stratégies combinées</h2>
  <h3>Donation + assurance-vie</h3>
  <ol>
    <li>Donner 100 000€ par enfant tous les 15 ans</li>
    <li>Placer le reste en assurance-vie (152 500€/bénéficiaire)</li>
    <li>Au décès : transmission optimisée</li>
  </ol>

  <h3>Démembrement + donation progressive</h3>
  <ol>
    <li>Donner la nue-propriété du bien principal</li>
    <li>Faire des donations d'argent complémentaires</li>
    <li>Utiliser l'assurance-vie pour l'excédent</li>
  </ol>

  <h2>Exemple de planification sur 30 ans</h2>
  <p>Couple avec 2 enfants, patrimoine 2M€ :</p>
  <ul>
    <li>Année 0 : donation 200 000€ par enfant (abattements utilisés)</li>
    <li>Année 15 : nouvelle donation 200 000€ par enfant</li>
    <li>Assurance-vie : 152 500€ × 2 bénéficiaires × 2 contrats = 610 000€ optimisés</li>
    <li>Total transmis en franchise : 1 410 000€</li>
  </ul>

  <h2>Conclusion</h2>
  <p>La transmission de patrimoine se prépare sur le long terme. Combinez donations régulières, assurance-vie et démembrement pour optimiser. Consultez un notaire pour adapter ces stratégies à votre situation. Utilisez notre <a href="/simulateur-droits-succession">simulateur de droits de succession</a> et notre <a href="/simulateur-donation">simulateur de donation</a> pour vos estimations.</p>
  `
  }
};
