## 🪐 Projet-Rover

Aujourd'hui on va travailler avec un rover (robot explorateur) qui part explorer la planète Mars ! 
Le but est d'écrire le programme qui permettra aux scientifiques de le piloter depuis la Terre.

Pour l'instant notre rover est un peu bête : 
il ne peut pas tourner et avancer en même temps. S'il veut partir à gauche, 
il doit d'abord se tourner vers la gauche puis avancer tout droit. 
Il est en phase de test et se déplace sur une grille qui fait 10x10 cases : une fois le test fini nous l'enverrons sur Mars !

1) Commençons par créer quelques variables :

- La grille sera représenté par la variable `grid` contenant un array en 2D : 
des arrays dans un array (pour représenter les lignes et les colonnes, comme dans une partie d'échecs). 
Vous pouvez en apprendre plus [sur la doc de MDN]
Chaque case sera représentée par une string " " (un espace) pour signifier qu'elle est vide.

- Le rover sera représenté par la variable `rover` 
contenant un objet contenant une seule clé pour l'instant : `direction`. 
Cette clé pourra contenir une valeurs parmis "N", "S", "E", "W" (North, South, East, West). Par défaut on met "N".

2) Ajoutons quelques fonctions :

- Les fonctions `turnLeft` et `turnRight` reçoivent en paramètre le rover. 
Elles modifient la valeur de "direction" dans le rover en fonction de la direction initiale, 
et de la fonction appelée. Exemple : `turnRight` transformera "N" en "E". 
N'oubliez pas d'ajouter un console log de la nouvelle direction du rover à la fin 
pour pouvoir vérifier que la fonction a fait son boulot !

3) Le déplacement : pour que notre rover puisse avancer, nous avons besoin de tracer sa position sur la grille. 
Elle sera représentée par deux coordonnées : x et y. Ajoutez les clés `x` et `y` au rover. 
Par défaut, leurs valeurs seront `0`. Ces coordonnées correspondent aux index des éléments dans la grille : 
x = l'abscisse (les éléments de chaque array, les colonnes) et y = l'ordonnée (les arrays dans l'array grille, les lignes) ! 
Au départ, le rover est en 0 / 0 : en haut à gauche (dans le premier élément du premier array de l'array grille).

4) Faisons avancer le rover :

- La fonction `moveForward` reçoit en paramètre le rover. 
En fonction de la position actuelle du rover et de sa direction, elle modifie les coordonnées. 
Exemple : le rover est en position 0 / 0 et en direction "E", la fonction changera la position en 1 / 0 
(deuxième élément du premier array de l'array grille). 
N'oubliez pas d'ajouter un console log de la nouvelle position du rover à la fin pour pouvoir vérifier que la fonction a fait son boulot !

Bon. Le rover tourne, il avance, mais c'est un peu laborieux d'appeler les fonctions une par une, non ? 
Il faudrait pouvoir recevoir des commandes qui exécuteront des fonctions automatiquement... ✨

5) Créons un outil de commande :

- La fonction `pilotRover` recevra une string en paramètre. 
Chaque lettre de cette string correspondra à une commande précise : (l)eft, (r)ight ou (f)orward. 
Comme chaque lettre de la string représente une étape importante, pourquoi ne pas utiliser une boucle ? 
Chaque étape appellera une fonction selon la commande reçue !

6) L'historique : On veut savoir par où est passé le rover avant d'arriver à sa position. 
Ajoutez une clé `travelLog` à votre rover, qui contiendra un array de toutes les coordonnées précédentes du rover. 
Par défaut, sa valeur sera un array vide. À chaque fois que le rover recevra l'ordre d'avancer, 
il enregistrera ses coordonnées actuelles **avant** se de déplacer.

7) Utiliser le package [prompt] => https://www.npmjs.com/package/prompt pour piloter vous même votre rover !


## ⭐ Bonus

8) Les limites : le code actuel risque de faire sortir notre rover de la grille ! 
Il faut absolument ajouter une vérification dans la fonction `moveForward` 
pour savoir si notre déplacement reste dans la grille ou pas **avant** de se déplacer. 
Si ce n'est pas le cas, la fonction affichera une erreur dans la console pour nous avertir et ne fera pas avancer le rover.

9) Reculer : notre rover ne peut qu'avancer, ce qui n'est pas pratique si on veut le faire revenir en arrière. 
Créez une fonction `moveBackward` pour lui permettre de reculer, et adaptez le reste du code pour prendre en compte cette option !

10) Commande valides : ajoutez une vérification dans la fonction `pilotRover` pour renvoyer une erreur si une commande n'est pas valide ! 
Exemple : la commande globale `"rfyl"` donnerait une erreur.

11) Le visuel de la grille : à chaque fois que le rover tourne ou se déplace, remplacer son ancienne position (s'il a bougé) 
par un espace et écrire la lettre de sa direction à la nouvelle position / remplacer sa direction ! 
Afficher la grille au début du programme, puis l'afficher de nouveau après chaque appel de `pilotRover`. 
Exemple : notre rover est en 0 / 0 et direction "N" : la console devrait afficher 

```
[
	["N", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
]
```

## ⭐⭐ Bonus

Jusqu’à présent, notre code ne fait aucune requête à une API/un serveur.

Nous allons rajouter une fonctionnalité rendant le jeu plus intéressant, et faisant appel à une API.

L’objectif est le suivant :

- au début du jeu,  contacter l’api [PokeAPI] => https://pokeapi.co/
et demander une liste de 100 Pokémons (pendant la requête, afficher “Chargement en cours...” dans le terminal)
- une fois la requête terminée, associer chaque case à un Pokémon
- choisir aléatoirement un Pokémon dans la liste et le stocker dans une variable nommée **randomPokemon**
- lancer le jeu

L’utilisateur va naviguer sur la grille à la recherche du Pokémon 
(quand il arrive sur une case, afficher dans le terminal le nom du Pokémon qui est associée à cette dernière). 
Quand l’utilisateur a trouvé le bon Pokémon, c’est-à-dire **randomPokemon**, 
le jeu s’arrête et affiche dans le terminal “BRAVO” ainsi que le nom du Pokémon.

## ⭐⭐⭐ Bonus

Notre jeu commence à être fun, mais il manque un peu de challenge.

Pour rendre le tout plus pétillant, rajouter un timer.

L’utilisateur a 30 secondes pour trouver le Pokémon. 
Si il n’a pas réussi dans le temps imparti, le jeu s’arrête et affiche dans le terminal “GAME OVER”

PS: regardez du côté de la fonction [setTimeout] => https://developer.mozilla.org/fr/docs/Web/API/setTimeout
