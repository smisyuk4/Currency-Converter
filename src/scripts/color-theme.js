import { refs } from './refs';

function initialTheme(themeName) {
    localStorage.setItem('theme', themeName)
    document.documentElement.classList = themeName
}

initialTheme('light-theme') 

refs.buttonColorTheme.addEventListener('click', onClickButtonCT)

function onClickButtonCT() {
    refs.iconNight.toggleAttribute('hide')
    refs.iconLight.toggleAttribute('hide')

    if (localStorage.getItem('theme') === 'light-theme') {        
        initialTheme('night-theme') 
    } else {
        initialTheme('light-theme') 
    }    
}