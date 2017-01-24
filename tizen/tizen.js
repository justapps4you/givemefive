var tizenEvents = {
    startNewGame: function() {

        var r = confirm("If you continue, you will lose all your progress in the game. Is it OK for you?");
        if(r === true){
            location.reload();
        }
    },
    exit: function () {
        var r = confirm("Do you want to exit?");
        if(r === true){
            tizen.application.getCurrentApplication().exit();
        }
    },
    menuState: 'closed',
    switchMenu: function() {
        if(tizenEvents.menuState === 'open'){
            tizenEvents.menuClose();
        }else{
            tizenEvents.menuOpen();
        }
    },
    menuOpen: function(){
        document.getElementsByClassName('menu-content')[0].className = 'menu-content menu-open';
        document.getElementsByClassName('MainPanel')[0].style = '-webkit-filter:blur(5px)';
        document.getElementsByClassName('div-exit-menu')[0].style.display = 'block';
        tizenEvents.menuState = 'open';
    },
    menuClose: function(){
        document.getElementsByClassName('menu-content')[0].className = 'menu-content menu-close';
        document.getElementsByClassName('MainPanel')[0].style = '-webkit-filter:blur(0px)';
        document.getElementsByClassName('div-exit-menu')[0].style.display = 'none';
        tizenEvents.menuState = 'closed';
    }
};


//CREATING DOM ELEMENTS
///////////////////////

//0. adding CSS
var cssLink = document.createElement('link');
cssLink.setAttribute('rel','stylesheet');
cssLink.setAttribute('type','text/css');
cssLink.setAttribute('href','tizen/tizen.css');
document.body.appendChild(cssLink);

//1. creating div exit menu
var divExitMenu = document.createElement('div');
divExitMenu.className = 'div-exit-menu';
divExitMenu.style = 'width:100%;height:calc(100% - 30px);top:30px;position:fixed;display:none';
divExitMenu.addEventListener('click',tizenEvents.menuClose)
document.body.appendChild(divExitMenu);


//2. creating image menu
var menuImage = document.createElement('img');
menuImage.className = 'menu-img';
menuImage.src = 'tizen/menu.png';

var divMenuContainer =  document.createElement('div');
divMenuContainer.className = 'menu-container';
divMenuContainer.appendChild(menuImage)

document.body.appendChild(divMenuContainer);


//3. creating the menu
var ulElement = document.createElement('ul');

var liElementOne = document.createElement('li');
liElementOne.innerText = 'START NEW GAME';
liElementOne.addEventListener('click',tizenEvents.startNewGame);
ulElement.appendChild(liElementOne);

var liElementTwo = document.createElement('li');
liElementTwo.style = 'border-bottom-style:none';
liElementTwo.innerText = 'EXIT';
liElementTwo.addEventListener('click',tizenEvents.exit);
ulElement.appendChild(liElementTwo);

var divMenuContent = document.createElement('div');
divMenuContent.className = 'menu-content';
divMenuContent.appendChild(ulElement);

document.body.appendChild(divMenuContent);


//4. creating click button area
var divMenuButton =  document.createElement('div');
divMenuButton.className = 'menu-button';
divMenuButton.addEventListener('click',tizenEvents.switchMenu);
document.body.appendChild(divMenuButton);



/*
var tizenEvents = {
    startNewGame: function() {

        var r = confirm("If you continue, you will lose all your progress in the game. Is it OK for you?");
        if(r === true){
            localStorage.clear();
            location.reload();
        }
    },
    exit: function () {
        var r = confirm("Do you want to exit?");
        if(r === true){
            tizen.application.getCurrentApplication().exit();
        }
    },
    menuState: 'closed',
    switchMenu: function() {
        if(tizenEvents.menuState === 'open'){
            tizenEvents.menuClose();
        }else{
            tizenEvents.menuOpen();
        }
    },
    menuOpen: function(){
        $('div.menu-content').removeClass('menu-close');
        $('div.menu-content').addClass('menu-open');
        $('div#wrapper').css('-webkit-filter','blur(5px)');
        $('div.div-exit-menu').css('display','block');
        tizenEvents.menuState = 'open';
    },
    menuClose: function(){
        $('div.menu-content').removeClass('menu-open');
        $('div.menu-content').addClass('menu-close');
        $('div#wrapper').css('-webkit-filter','blur(0px)');
        $('div.div-exit-menu').css('display','none');
        tizenEvents.menuState = 'closed';
    }
};

$(function() {

    $('div.menu-content > ul > li').click(function(){
        $(this).removeClass('menuButtonAnimation');
        $(this).addClass('menuButtonAnimation');
    });

    $('li.menu-start-new-game').click(tizenEvents.startNewGame);
    $('li.menu-exit').click(tizenEvents.exit);
    $('div.menu-button').click(tizenEvents.switchMenu);
    $('div.header').click(tizenEvents.switchMenu);
    $('div.div-exit-menu').click(tizenEvents.menuClose);
    $('div#notifications').click(tizenEvents.menuClose);
});


// BACK BUTTON
/////////////////////////////

document.addEventListener('tizenhwkey', function(e) {

    if(e.keyName == "back") {
        try {
            tizen.application.getCurrentApplication().exit();
        } catch (error) {
            console.error("getCurrentApplication(): " + error.message);
        }
    }

    if(e.keyName == "menu") {
        try {
            tizenEvents.switchMenu();
        } catch (error) {
            console.error("getCurrentApplication(): " + error.message);
        }
    }
});
*/


