/******************************************
           === variables globales === 
********************************************/
const EFFECTIF_MAX = 11; //effectif max pour une équipe
const POSTES = ["gardien","defenseur","milieu","attaquant"]; // noms des différents postes
const FORMATION_INITIALE="433"; // formation choisie par défaut au lancement

let joueurChoisi; // joueur choisi lors d'un click dans la zone joueurs


/**
 * initialisation
 */
const init = function(){
    raz();
    remplirPostes(FORMATION_INITIALE);
    const ok = document.getElementById("ok");
    ok.addEventListener("click", changeFormation);
}


/*****************************************************
           === Réinitialisation de la page=== 
******************************************************/

/**
 * Mise à l'état initial (feuille de match, effectifs et joueurs)
 * lors d'un changement de formation
 */
const raz = function(){
    razZoneJoueurs();
    abonneClickJoueurs();
    viderFeuilleDeMatch()
    effectifsA0();
    
    console.log('hello world');
}

/**
 * vide la feuille de match
 */
 
const viderFeuilleDeMatch = function(){
    const inputFormation = document.getElementById('formation');
    const validforma = verifFormation(inputFormation.value); // ATTENTION à mettre les paramètres
    // Id + un fils ul
    const feuilledema = document.querySelector('#feuilleDeMatch > ul')

    if (validforma) {
        feuilledema.innerHTML= '';
    }
}

/**
 * Réinitialise tous les effectifs du tableau HTML à 0
 */
const effectifsA0=function(){
    //TODO
}

/** 
 * Vide la <div> d'id "joueurs" puis la remplit à partir des données
 * présentes dans le script utilisé : "men.js" ou "women.js"
 */
const razZoneJoueurs = function(){
	const joueurs = document.getElementById("joueurs");
    joueurs.innerHTML = "";
	for(let i = 0; i < playersData.length; i++) {
		joueurs.appendChild(creerJoueur(playersData[i]));
	} 
}

/*****************************************************
           ===Changement de formation=== 
******************************************************/

/**
 *  change la formation présente sur le terrain
 *  puis remet la page dans on état initial.
 */
const changeFormation = function(){
    const input = document.getElementById('formation');
    if(verifFormation(input.value)){
        remplirPostes(input.value)
        raz();
    }
}

/**
 * Détermine si la formation de l'équipe est valide
 * 3 caractères correspondants à des nombres entiers 
 * de défenseurs, milieu et attaquants sont attendus :
 * - Les défenseurs sont 3 au moins, 5 au plus
 * - Les milieux : 3 au moins, 5 au plus
 * - Les attaquants : 1 au moins, 3 au plus
 * (Le gardien est toujours unique il n'est pas représenté dans la chaine de caractères).
 * @param {String} formation - la formation à tester provenant de l'input correspondant
 * @return {Boolean} - true si la formation est valide, false sinon
 */
const verifFormation = function(formation){
  const defenseurs = parseInt(formation[0])
  const milieux = parseInt(formation[1])
  const attaquants = parseInt(formation[2])

/*
  if (defenseurs >= 3 && defenseurs <= 5 &&
      milieux >= 3 && milieux <= 5 &&
      attaquants >= 1 && attaquants <= 3) {
        return true;
  }
  else{
    return false;
  }*/

  // Return de la condition (renvoie un booléen)
  /*console.error((
    defenseurs >= 3 && 
    defenseurs <= 5 &&
    milieux >= 3 && 
    milieux <= 5 &&
    attaquants >= 1 && 
    attaquants <= 3 &&
    defenseurs + milieux + attaquants == 10));*/

  return (
    defenseurs >= 3 && 
    defenseurs <= 5 &&
    milieux >= 3 && 
    milieux <= 5 &&
    attaquants >= 1 && 
    attaquants <= 3 &&
    defenseurs + milieux + attaquants == 10)
}


/**
 * Remplit les lignes de joueur en fonction de la formation choisie
 * @param {String} formation - formation d'équipe
 */
const remplirPostes = function(formation){
    const effectifs = [1]; // ajout du gardien
    for (c of formation)
        effectifs.push(parseInt(c))
    const lignes = document.getElementById("terrain").children
    for (let i=0; i<lignes.length ; i ++){
        lignes[i].innerHTML = ""
        for (let j = 0; j<effectifs[i]; j++){
            lignes[i].innerHTML +="<div class='positions "+POSTES[i]+"'></div>";
        }
    }
}

/*****************************************************
           === création des joueurs=== 
******************************************************/

/** Crée une <div> représentant un joueur avec un id de la forme "j-xxxxxx"
 * @param {Object} data - données d'un joueur
 * @return {HTMLElement} - div représentant un joueur
 */

const creerJoueur = function(data){
    //console.log("data : " + JSON.stringify(data));
    // créer une div joueur (attention aux attributs nécessaires)
    const div = document.createElement('div');
    // ID du joueur
    div.id =  "j-" + data.id

	// TODO créer l'image et l'ajouter  à la div joueur
    const image = document.createElement('img');
    image.src = data.src
    div.appendChild(image)
    
    // TODO créer les <div> correspondants au nom et au poste et les ajouter à la div joueur
    const infoDiv = document.createElement('div')
    infoDiv.setAttribute("class", "infoDiv")


    const nameDiv = document.createElement('div')
    nameDiv.setAttribute("class", "name")
    nameDiv.textContent = data.nom

    const posteDiv = document.createElement('div')
    posteDiv.setAttribute("class", "poste")
    posteDiv.textContent = data.poste

    infoDiv.appendChild(nameDiv)
    infoDiv.appendChild(posteDiv)

    div.appendChild(infoDiv)
    
    switch (data.poste){
        case 'gardien' :
            div.setAttribute("class", "cartejoueur gardien")
            break
        case 'defenseur':
            div.setAttribute("class","cartejoueur defenseur")
            break
        case 'milieu':
            div.setAttribute("class","cartejoueur milieu")
            break
        case 'attaquant':
            div.setAttribute("class","cartejoueur attaquant")
            break
        default:
            console.log('pas de poste');  
    }

    // TODO : relisez bien la documentation
    return div
}


/*****************************************************
           ===Sélection des joueurs=== 
******************************************************/

/** 
 * Abonne les <div> de class "joueur" à la fonction selectionneJoueur pour un click
 */
const abonneClickJoueurs = function(){
    let joueurChoisi = document.querySelectorAll(".cartejoueur");
    console.log(joueurChoisi);

    for (let i = 0; i < joueurChoisi.length; i++) {
        //console.log(joueurChoisi);
        joueurChoisi[i].addEventListener("click", selectionneJoueur);
  }

    //TODO
}

/** 
 * Selectionne un joueur, change son opacité puis le place sur le terrain
 */
const selectionneJoueur = function(){
    joueurChoisi = this
    this.style.opacity = "0.3"
    placeJoueur();
}


/*************************************************************
           ===Modifications des joueurs sur le terrain=== 
************************************************************/

/**
 * Renvoie le noeud DOM correspondant à la position disponible pour placer un
 *  joueur sur le terrain ou null si aucune n'est disponible
 * @param {HTMLElement} ligne - une div ligne de joueurs sur le terrain
 * @returns {HTMLElement || null} - une div de class "positions" disponible dans cette ligne
 */
const trouveEmplacement = function(ligne){
    const enfant = ligne.childNodes
    console.log(enfant);
    for (let i = 0; i < enfant.length; i++) {
        if (enfant[i].firstchild == null){
            return enfant[i]
        }     
    }
}

/**
 * Renvoie le noeud DOM correspondant à la 
 * ligne où placer un joueur qur le terrain en fonction de son poste
 * @param {String} poste - poste du joueur
 * @returns {HTMLElement} - une div parmi les id #ligne...
 */
const trouveLigne = function(poste){
    console.log("ligne" + poste.substring(0,1).toUpperCase() +poste.substring(1));
    return document.getElementById("ligne" + poste.substring(0,1).toUpperCase() +poste.substring(1));
}


/** 
 * Place un joueur sélectionné par un click sur la bonne ligne
 * dans une <div> de class "positions" avec un id de la forme "p-xxxxx"
 */
const placeJoueur = function(){
    const poste = joueurChoisi.classList[1] // le poste correspond à la 2ème classe;
    const ligne = trouveLigne(poste);
    console.log(poste);
    const emplacementLibre = trouveEmplacement(ligne)
    // Revoir la condition sûrement buguée
    if (emplacementLibre){
        // ajoute le nom du joueur et appelle la fonction permettant de mettre à jour la 
        // feuille de match
        const nom = joueurChoisi.querySelector(".name").textContent;
        emplacementLibre.title = nom;
        console.log(joueurChoisi.id);
        ajouteJoueurListe(nom, joueurChoisi.id);
        emplacementLibre.style.backgroundImage="url('images/" + joueurChoisi.id.substring(2) + ".jpg')"
        






        // TODO modifier l'image de l'emplacement Libre

        // TODO modifier l'id 

        // TODO Empecher le click dans la zone joueur, et autorise celui dans la zone terrain
        // pour le joueur choisi 

        // mise à jour des effectifs de la table )
        miseAJourNeffectifs(poste, true);
    }
    else {
        //joueurChoisi.style.opacity="";
    }     
        
}


/** 
 * Enléve du terrain le joueur sélectionné par un click
*/
const deselectionneCompo = function(){
    const poste = this.classList[1];
    const idJoueur = "j-" + this.id.substring(2);
    const joueur = document.getElementById(idJoueur);
    joueur.style.opacity="";
    joueur.addEventListener('click', selectionneJoueur);
    enleveJoueurFeuilleMatch(this.title);
    this.removeEventListener("click", deselectionneCompo);
    this.title="";
    this.style="";
    this.id="";
    enleveJoueurFeuilleMatch()
    miseAJourNeffectifs(poste, false);
}

/*************************************************************
           ===Mise à jour des effectifs=== 
************************************************************/

/**
 * Met à jour les effectifs dans le tableau lorsqu'un joueur est ajouté 
 * ou retiré du terrain.
 * Après chaque modification, une vérification de la composition compléte
 * doit être effectuée et le changement d'image de la feuille de match
 * doit être éventuellement réalisé.
 * @param {String} poste - poste du joueur
 * @param {Boolean} plus - true si le joueur est ajouté, false s'il est retiré
 */
const miseAJourNeffectifs = function(poste, plus){
    //TODO
}


/**
 * Verifie si l'effectif est complet.
 * L'image de la feuille de match est changée en conséquence.
 * @returns {Boolean} - true si l'effectif est au complet, false sinon
 */
const verifCompoComplete = function(){
    //TODO
}

/*************************************************************
           ===Mise à jour de la feuille de match=== 
************************************************************/

/**
 * Modifie l'image de la feuille de match
 * en fonction de la taille de l'effectif
 * @param {Boolean} complet - true si l'effectif est complet, false sinon
 */
const changeImageComplete = function(complet){
    i//TODO
}


/**
 * Enleve un joueur de la feuille de match
 * @param {String} nom - nom du joueur à retirer
 */
const enleveJoueurFeuilleMatch = function(nom){
    //TODO
}


/**
 * ajoute un joueur à la feuille de match dans un élément
 * <li> avec un id de la forme "f-xxxxx"
 * @param {String} nom - nom du joueur
 * @param {String} id - id du joueur ajouté au terrain de la forme "p-xxxxx"
 */
const ajouteJoueurListe = function(nom, id){
    const liste = document.getElementById('feuilleDeMatch').querySelector('ul');
    const li = document.createElement('li');
    li.textContent = nom;
    li.id =  "f-"+id.substring(2)
    liste.appendChild(li)
}


/*************************************************************
           ===Initialisation de la page=== 
************************************************************/

init();