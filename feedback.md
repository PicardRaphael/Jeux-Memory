# Feedback du prof

## Etape 1 : On installe

### Enoncé

- Création du header en HTML
- Création du plateau (conteneur des cartes) en HTML
- Création des 28 `.carte` avec une boucle
- CSS des cartes en 100 x 100 pixels
- Création de 2 enfants `.cache` et `.image` dans chaque `.carte`

### Notions

- [x] Syntaxe HTML (header et plateau)
- [x] Boucle `for` de création des 28 `.carte`
- [x] Utilisation de `document.createElement()` ou `$('<div>')` pour créer les cartes
- [x] Styliser les `.carte` à l'aide de la classe CSS
- [ ] Utilisation de `appendChild` ou `append` pour ajouter les `.cache` et `.image` dans `.carte`

### Commentaires

- Nickel :thumbsup:





## Etape 2 : On retourne

### Enoncé

- Gérer l'évènement du `click` sur une carte
- Afficher `.image` et masquer `.cache`
- Mettre un effet de `hover` sur les cartes

### Notions

- [x] Utiliser `.addEventListener()` ou `.on()` pour gérer le clic sur une carte
- [x] Gérer l'affichage de `.image` et `.cache`
- [ ] Syntaxe CSS pour le `hover`

### Commentaires

- Il manque juste un petit `:hover` :smile:
- Ta méthode `selectCard` est quand même très dense, avec beaucoup d’imbrications. Ça mériterait un petit travail de découpe : tu peux mettre par exemple tout ce qui est de l’ordre de la vérification de la correspondance des cartes dans une méthode séparée de ce qui concerne l’affichage pur. Et la victoire mériterait elle aussi sa méthode à elle toute seule, tu ne crois pas ? Ce n’est pas faux en soi, c’est juste pour gagner en lisibilité, donc en efficacité.
- Sinon RAS :ok_hand:



## Etape 3 : La face visible

### Enoncé

- Utiliser le fichier `cards.png` pour afficher les images des fruits
- Définir la position de chaque image avec `background-position`
- Mélanger les cartes sur le plateau

### Notions

- [x] Gérer l'affichage des cartes avec la méthode du _sprite_ en CSS
- [x] Utilisation du `background-position` pour afficher chaque image sur `.carte`
- [x] Mélanger les cartes avec un `Math.random()`

### Commentaires

- Pour les images, lister tous les background:position "en dur" n'est pas la meilleure des solutions. Tu peux les calculer en JS, dans ta boucle. Non seulement c'est plus rapide, mais en plus ça évite les erreurs manuelles, et c'est beaucoup plus "maintenable". Imagine par exemple qu'on te demande une version "facile" avec moins de cartes, et une difficile avec cent cartes. Ou bien si finalement l'image source qu'on te donne change et la hauteur des images est de 150px... Laisse l'ordi calculer les background-position, c'est son job de faire les maths :wink:
- Bien joué pour le mélange des cartes ;)





## Etape 4 : Une paire ?

### Enoncé

- Gestion des paires
- `interval` de 1 seconde après avoir retourné 2 mauvaises cartes

### Notions

- [x] Enregistrer la première carte retournée et la comparer à la deuxième
- [x] Masquer les mauvaises paires en interchangeant `.image` et `.cache`
- [x] Sauvegarder le fait qu'on trouve une paire
- [x] Gestion du timer qui empêche de retourner d'autres cartes pendant 1 seconde

### Commentaires

- Sinon nickel :thumbsup:





## Etape 5 : Veni, Vidi, Vici

### Enoncé

- À chaque paire trouvée, on regarde si on a gagné ou pas
- Afficher un message de félicitations en cas de victoire

### Notions

- [x] Garder en mémoire le nombre de paires trouvées (avec un `app.cardMatch = 0` par exemple)
- [x] Si toutes les paires ont été trouvées (`app.cardMatch === 14`), afficher un message `alert` de victoire

### Commentaires

- RAS :ok_hand:






## Etape 6 : Compte à rebours

### Enoncé

- Afficher une barre de progression de 60 secondes
- Chaque seconde, mettre à jour la barre de progression
- Si 60 secondes s'écoulent sans avoir gagné la partie, afficher un message d'échec
- Recharger la page en cas d'échec

### Notions

- [x] Utiliser une `div` dont le `width` va de 0 à 100%
- [x] Créer un `interval` d'une seconde qui met à jour le `width` de la `div` de progression
- [x] Si 60 secondes d'écoulées, afficher un message d'échec
- [x] Recharger la page avec un `window.location.reload()` ou une redirection

### Commentaires

- Bien codé, bravo :clap:






## Général

- Qualité du code
  - [x] Indentation et lisibilité du code
  - [x] Présence de commentaires dans le code


### Pistes de révisions

- `¯\_(ツ)_/¯`


### Commentaires

- Oh, super, un bonus :bowtie:
- Perso je ne suis vraiment pas fan de l'effet d'animation sur les cartes ; outre le fait que ce ne soit pas très réaliste c'est surtout très lent donc on ne voit pas très longtemps la seconde carte, ça rend le jeu plus difficile. Ça ne change rien à ton travail hein, c'est juste un ressenti personnel.
- Très bonne évaluation, bravo :clap:

Bien joué :D Tu es allé au bout de l'eval, et un peu au-delà - voire un peu trop loin avec PHP xD - sans réelle erreur (à part peut-être le tableau en dur pour les backgrounds :°)

À ce stade là, pour progresser, il ne te reste plus que les détails : optimiser, rendre plus lisible, plus évolutif... Demande-toi pour chaque action de ton code quel serait le moyen le plus adapté d’arriver à tes fins, quelles sont les conséquences de chacun de tes choix si le brief de départ évolue (il est fréquent qu’un client change d’avis sur une fonctionnalité, ou que des contraintes techniques surviennent en plein milieu de projet), ou si des questions de performances arrivent sur la table.
Si tu veux en savoir plus, je te conseille de t’intéresser aux principes de développement suivants : principe de responsabilité unique des fonctions (*SRP*), *DRY* (_Don’t Repeat Yourself_) et *KISS* (_Keep it simple, stupid_)

En tout cas je te souhaite de continuer comme ça ;)
