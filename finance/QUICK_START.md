# ⚡ DÉMARRAGE ULTRA-RAPIDE

**Pour migrer tous vos simulateurs en 5 minutes.**

---

## 🎯 Commandes à Copier-Coller

```bash
# 1. Aller dans le dossier
cd "c:\Users\loren\Desktop\Dev appli web 2\finance\finance"

# 2. Sauvegarder (optionnel mais recommandé)
git add . && git commit -m "Avant migration auto"

# 3. TESTER SANS RIEN MODIFIER (recommandé)
node migrate-simulators.js --dry-run

# 4. MIGRER POUR DE VRAI
node migrate-simulators.js

# 5. Vérifier que ça compile
npm run build

# 6. Tester en local
ng serve
# Ouvrir http://localhost:4200/simulateur-micro-entrepreneur

# 7. Commit
git add . && git commit -m "feat: migration auto FAQ" && git push
```

---

## ✅ C'EST TOUT !

**Le script fait automatiquement :**
- ✅ Trouve tous les simulateurs avec FAQ
- ✅ Extrait les questions/réponses du JSON-LD
- ✅ Crée la propriété `faqItems`
- ✅ Supprime le code JSON-LD manuel (~70 lignes par simulateur)
- ✅ Remplace la FAQ HTML par `<app-faq-section>`

**Résultat :**
- ✅ ~12-15 simulateurs migrés
- ✅ ~1000 lignes de code supprimées
- ✅ FAQ générée automatiquement
- ✅ SEO optimisé

---

## 📚 Plus d'infos ?

- [README_MIGRATION.md](README_MIGRATION.md) - Guide complet
- [MIGRATION_SCRIPT_GUIDE.md](MIGRATION_SCRIPT_GUIDE.md) - Détails du script
- [GUIDE_COMPOSANTS_GENERIQUES.md](GUIDE_COMPOSANTS_GENERIQUES.md) - Utilisation des composants

---

## 🐛 Problème ?

### Le script ne trouve rien
→ Vous n'êtes pas dans le bon dossier
```bash
cd "c:\Users\loren\Desktop\Dev appli web 2\finance\finance"
```

### Erreur de compilation après migration
→ Ajouter `FaqSectionComponent` dans les imports du module

### La FAQ ne s'affiche pas
→ Vérifier que `<app-faq-section>` est bien dans le HTML

### Annuler la migration
```bash
git reset --hard HEAD~1
```

---

**Créé le 5 janvier 2026**
**Temps estimé : 5-10 minutes** ⏱️
