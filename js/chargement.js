const loader = document.querySelector('.loader');

window.addEventListener('load', () => {

    loader.classList.add('fondu-out');

})
setTimeout(() => {
    const loader = document.querySelector('.fondu-out');
    loader.style.zIndex = '-10000'; // Nouvelle valeur de z-index
    loader.style.display = "none";
}, 500)