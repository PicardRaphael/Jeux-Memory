var app = {
  $board: $('#plateau'),
  $tentative: $('#nbTentative'),
  $tbImgCard: [0,0,100,100,200,200,300,300,400,400,500,500,600,600,700,700,800,800,900,900,1000,1000,1100,1100,1200,1200,1300,1300,1400,1400,1500,1500,1600,1600,1700,1700],
  $cardReturn: [],
  $cardIndexClick: [],
  $nbTry: 0,
  $nbCardFind: 0,
  $nbrCarte: 28,
  $level: 1,
  init: function() {
    console.log('App init');

    /*Création du plateau de jeux*/
    app.creatBoard(app.$nbrCarte);

    /*Lancement ecouteur click*/
    app.goClick();
    app.progressBar(); 
  },
  /*Création du plateau*/
  creatBoard: function($nbrCarte){
    app.$allCards = [];
    app.index = -1;
    for(var index = 0; index < $nbrCarte; index++){
      app.index++;
      app.creatCard();
    }
    app.shuffle(app.$allCards);
    app.$board.append(app.$allCards);
  },

  /*Mélange du tableau*/
  shuffle: function(allCards) {
    var j, x, i;
    for (i = allCards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = allCards[i];
        allCards[i] = allCards[j];
        allCards[j] = x;
    }
    return allCards;
  },

  /*Création des cartes*/
  creatCard: function(){
    app.$card = $('<div class="carte"><div class="cache"></div><div class="image"></div></div>');
    app.backgroundCardImg();

    /*Ajout dans le tableau allCards*/
    app.$allCards.push(app.$card);

  },

  /*Initialise background img pour toutes les cartes suivant leur background-position*/
  backgroundCardImg: function(){
    var imageCard = app.$card.children(1);
    var cardImg = {
      'background-position': '0 -'+app.$tbImgCard[app.index]+'px',
    };
    imageCard.css(cardImg);
  },

  /*Go click*/
  goClick: function(){
    $('.cache').on('click', app.selectCard);

  },

  /*Click sur les cartes*/
  selectCard: function(evt){
    /*Récup la cible*/
    app.$currentCard = $(evt.target);

    /*J'affiche l'imge de la cible*/
    app.$currentCard.hide('slow').next().show('slow');

    if(app.$cardReturn.length<2) {
      /*Je stock dans 2 tableau dif : currentCard / background-position*/
      app.$cardReturn.push(app.$currentCard.css('background-position'));
      app.$cardIndexClick.push(app.$currentCard);

      if(app.$cardReturn.length === 2){
        $('.cache').off('click');
        /*Ajoute d'un coup*/
        app.$nbTry++;
        console.log('nbr coup '+app.$nbTry);
        app.$tentative.text(app.$nbTry);
        if(app.$cardReturn[0] == app.$cardReturn[1]){
          console.log('same card');
          
          /*Verif le nbr de paire trouvé*/
          app.$nbCardFind++;
          console.log('Nbr paire '+app.$nbCardFind);
          
          setTimeout(function(){
            //app.destroyCard(app.$cardIndexClick);
            app.$cardReturn = [];
            app.$cardIndexClick = [];
            app.goClick();
          },500);
          if(app.$nbCardFind === 14){
            $.ajax({
              url: "game.php",
              type: "GET",
              data: "best_score="+app.$nbTry
            });
            setTimeout(app.victory,500); 
          }
        }else{
          console.log('loose');
          setTimeout(function(){
            app.hideCards(app.$cardIndexClick);
            app.$cardReturn = [];
            app.$cardIndexClick = [];
            app.goClick();
          }, 500);
        }
      }
    }
  },

  /*Retourne les cartes non identiques*/
  hideCards: function($cardIndexClick){
    var $div1 =$cardIndexClick[0];
    var $div2 =$cardIndexClick[1];

    $div1.show('slow');
    $div1.next().hide('slow');

    $div2.show('slow');
    $div2.next().hide('slow');

  },

  /*Lors de la victoire*/
  victory: function(){    
    var confirm = window.confirm('Vous avez gagné en '+app.$nbTry+'.\n Voulez-vous rejouer ?');
    if(confirm){
      app.$level++;
      document.location.href="game.php";
    }else{
      document.location.href="index.php";
    }
  },

  /*Lors de la défaite*/
  defeat: function(){
    var confirm = window.confirm('Vous avez perdu en '+app.$nbTry+'.\n Voulez-vous rejouer ?');
    if(confirm){
      document.location.href="game.php";
    }else{
      document.location.href="index.php";
    }   
  },

  /*Progress bar*/
  progressBar: function () {

    $( function() {
      var progressbar = $( '#progressbar' );
      var progressLabel = $( '.progress-label' );
 
      progressbar.progressbar({
        value: 60,
        max: 60,
 
        change: function() {
          progressLabel.text( progressbar.progressbar( 'value' ) + ' secondes restantes !' );
        },
 
        complete: function() {
          if (progressbar.progressbar( 'value' ) === 60) {
            progressLabel.text( 'Jeux lancé !' );
          }
        }
      });
 
      function progress() {
        var val = progressbar.progressbar( 'value' ) || 0;
        var $customProgressBar = $( '.ui-widget-header' );
 
        $customProgressBar.animate( { 'width': '0%' }, 60000 );
 
        progressbar.progressbar( 'value', val - 1 );
 
        if ( val > 45 ){
          $customProgressBar.css({ 'background': 'Green' });
        } else if (val > 30){
          $customProgressBar.css({ 'background': 'Yellow' });
        } else if (val > 15 ){
          $customProgressBar.css({ 'background': 'Orange' });
        } else{
          $customProgressBar.css({ 'background': 'Red' });
        }
 
        if ( val > 0 ) {
          setTimeout( progress, 1000 );
        } else if (progressbar.progressbar( 'value' ) === 0){
          app.defeat();
          progressLabel.text( 'Game Over !' );
        }
      }
 
      setTimeout( progress, 5000 );
    } );
  },

/*   levelUp: function($level){
    switch ($level){
      case 1:
        app.$nbrCarte = 28;
        break;
      case 2:
        app.$nbrCarte = 36;
        break;     
    }
    return app.$nbrCarte;
  } */
};

$(app.init);
  /*Détruit les cartes identiques*/
/*   destroyCard: function($cardIndexClick){
    var $div1 = $cardIndexClick[0];
    var $div2 = $cardIndexClick[1]

    $div1.next().remove();
    $div2.next().remove();
  } */
