const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

const question = document.querySelector('#questions-bloc .question');
const slider = document.querySelector('#questions-bloc .slider input');

const progressBar = document.querySelector('#content .progress-done');
const questionsBloc = document.getElementById('questions-bloc');
var shareButton;

const qsList = [
    "Je suis conscient(e) de mon impact sur l'environnement.",
    "Je prends des mesures pour réduire ma consommation d'énergie.",
    "Je trie régulièrement mes déchets.",
    "Je privilégie les produits locaux et durables dans mes achats.",
    "J'adopte des pratiques éco-responsables au quotidien.",
    "Je suis engagé(e) dans des actions de préservation de l'environnement.",
    "Je participe à des initiatives de nettoyage de mon quartier ou de ma ville.",
    "Je suis informé(e) sur les enjeux environnementaux actuels.",
    "Je cherche activement des moyens de réduire mon empreinte carbone.",
    "Je soutiens des causes liées à la protection de la nature.",
    "Je suis sensible aux problématiques de la biodiversité.",
    "Je m'informe sur les alternatives écologiques dans mes choix de consommation.",
    "Je fais attention à ma consommation d'eau au quotidien.",
    "Je préfère les modes de transport écologiques (vélo, transports en commun).",
    "Je participe à des événements visant à sensibiliser à l'écologie.",
    "Je suis ouvert(e) à adopter des habitudes de vie plus durables.",
    "Je cherche des moyens de réduire l'utilisation de plastique dans ma vie.",
    "Je suis attentif(ve) aux labels et certifications environnementales.",
    "Je sensibilise mon entourage aux enjeux écologiques.",
    "Je m'implique dans des projets de préservation de la nature.",
    "Je suis prêt(e) à changer mes habitudes pour contribuer à la protection de l'environnement.",
    "Je m'intéresse aux innovations éco-responsables.",
    "Je participe à des actions de reboisement ou de restauration de l'écosystème.",
    "Je cherche des moyens de réduire ma production de déchets.",
    "Je suis attentif(ve) à la provenance des produits que j'achète.",
    "Je m'efforce de diminuer ma consommation de viande pour des raisons environnementales.",
    "Je soutiens des initiatives locales en faveur de l'environnement.",
    "Je considère l'impact écologique dans mes décisions quotidiennes."
];

const statusList = [
    "Gardien(ne) de la nature",
    "Protecteur(trice) de l'environnement",
    "Ambassadeur(rice) de l'écologie",
    "Éco-conscient(e) engagé(e)",
    "Défenseur(trice) de la biodiversité"
];

const dcpList = [
    "Tu es un gardien(ne) de la nature. Tu consacres ton énergie à protéger l'environnement et à promouvoir des pratiques écologiques. La solitude te permet de te ressourcer pour mieux agir.",
    "Tu es le protecteur(trice) de l'environnement. Ton calme intérieur s'allie à ta détermination à sauvegarder la planète. Tu agis avec conscience pour un monde plus durable.",
    "Tu es l'ambassadeur(rice) de l'écologie. Les conversations sur l'environnement sont au cœur de tes interactions. Tu cherches à inspirer les autres à adopter des habitudes plus durables.",
    "Tu es éco-conscient(e) engagé(e). Maître des conversations écologiques, tu es à l'avant-garde des initiatives de préservation. Ta sociabilité sert la cause de la planète.",
    "Tu es le défenseur(trice) de la biodiversité. Génie de la sociabilité écologique, tu es au centre des efforts pour protéger la diversité biologique. La sociabilité durable est ton art de vivre."
];

const citList = [
    "« La société a besoin de citoyens écologiques, elle ne veut pas seulement des individus. » - Oscar Vert",
    "« L'écologie n'est pas une route pavée : on y marche différemment, et les fleurs y poussent. - Éco-Vincent »",
    "« La société a besoin de défenseurs de la nature, elle trouvera toujours des éco-guides. » - Michel Éco-audiard",
    "« Dans la vie, il n'y a qu'une chose qui soit vraiment importante : c'est de décider comment contribuer à la préservation de la planète. » - Éco-Winston",
    "« Les conventions écologiques sont des créations humaines et rien ne nous oblige à polluer aveuglément. » - Bertrand Éco-russell",
    "« Dans toute société écolo, il y a des normes qui façonnent les comportements, mais la créativité vient de ceux qui savent briser ces normes pour un monde plus vert. » - Éco-quelqu'un"
];
var statusIndex;
var qsIndex = 0; question.innerText = qsList[qsIndex];
var scoreList = []; initScoreList();
var finished = false;
var elapsedTime = 0;

const timer = setInterval(function () {
    elapsedTime++;
}, 1000);

changeQuestion();
changeButtons();

previousButton.addEventListener('click', previousQuestion);
nextButton.addEventListener('click', nextQuestion);

function initScoreList() {
    qsList.forEach(element => {
        scoreList.push(0);
    });
}

function nextQuestion() {
    if (finished) return

    scoreList[qsIndex] = slider.value;
    slider.value = 50;
    if (qsIndex + 1 < qsList.length) {
        qsIndex++;
        changeQuestion();
    } else {
        desappearQuestionsMenu();

    }
    changeButtons()
}

function previousQuestion() {
    if (finished) return

    if (qsIndex - 1 >= 0) {
        qsIndex--;
        changeQuestion();
        slider.value = scoreList[qsIndex];
    }
    changeButtons()
}

function changeButtons() {
    let pg;
    nextButton.innerText == "Terminer" ? pg = 100 : pg = qsIndex * 100 / qsList.length
    progressBar.style.width = pg + "%";

    let opa;
    qsIndex == 0 ? opa = .5 : opa = 1;
    previousButton.style.opacity = opa;

    let text;
    qsIndex == qsList.length - 1 ? text = "Terminer" : text = "Suivante";
    nextButton.innerText = text;
}

function getScore() {
    let finalSore = 0;
    scoreList.forEach(score => {
        finalSore += parseInt(score);
    });
    return finalSore;
}

function getStatus() {
    let score = getScore()
    let numStatus = statusList.length;
    let maxScore = qsList.length * 100;
    let pointsPerStatus = maxScore / (numStatus - 1);

    statusIndex = Math.floor(score / pointsPerStatus);
    if (statusIndex < 0) {
        statusIndex = 0;
    } else if (statusIndex >= numStatus) {
        statusIndex = numStatus - 1;
    }

    return statusList[statusIndex];
}

function desappearQuestionsMenu() {
    finished = true;
    questionsBloc.style.opacity = 0;
    //questionsBloc.style.filter = "brightness(0)";
    setTimeout(function () {
        questionsBloc.innerHTML = getResultCode();
        spawSeveralConfettis();
        questionsBloc.style.opacity = 1;
        document.querySelector('main').style.height = "100%";
        shareButton = questionsBloc.querySelector('#share-button');
        shareButton.addEventListener('click', copyLink);
        //questionsBloc.style.filter = "brightness(1)";
    }, 1000);
}

function getResultCode() {
    getStatus();
    let desc;
    elapsedTime < qsList.length ? desc = "As-tu réellement fait le test, ou bien t'as cliqué au hasard ?" : desc = dcpList[statusIndex];
    let code = `
    <h2 id="status-label">${getStatus()}</h2>
    <h3 id="score-label">${getScore()}/${qsList.length * 100}</h3>
    <p id="description-label">${desc}</p>
    <p id="quote-label">${citList[Math.floor(Math.random() * Math.floor(citList.length))]}</p>
    
    <div id="results-buttons">
    <a href="../index.html"><i class="fa-solid fa-house"></i></a>
    <a href="informations.html"><button class="classic-button" id="fiability-button">Doutes de fiabilité</button></a>
    <i id="share-button" class="fa-solid fa-share"></i>
    <div id="share-tooltip">Copié !</div>
    </div>
    `
    return code;
}

function copyLink() {
    navigator.clipboard.writeText("https://hellolife2750.github.io/socio-o-meter/").then(function () {
        const tooltip = document.getElementById("share-tooltip");
        tooltip.style.display = "block";
        tooltip.style.left = `${shareButton.offsetLeft - 5}px`;
        tooltip.style.top = `${shareButton.offsetTop - tooltip.offsetHeight}px`;
        setTimeout(() => {
            tooltip.style.display = "none";
        }, 1200);
    }, function (err) {
        console.error('Impossible de copier dans la presse-papier ', err);
    });
}

function changeQuestion() {
    let qs = "Q" + (qsIndex + 1) + ") ";
    qs += qsList[qsIndex];
    question.innerText = qs;

}

/*confettis*/
import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const spawnConfettis = () => {
    if (finished) {
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.6 }
        });
    }
};

function spawSeveralConfettis() {
    let count = 0;
    let timeMin = 1;
    let timeMax = 3;
    spawnConfettis();
    const interval = setInterval(() => {
        spawnConfettis();
        count++;
        if (count >= 5) {
            clearInterval(interval);
        }
    }, Math.floor(Math.random() * (timeMax * 1000 - timeMin * 1000 + 1)) + timeMin * 1000);
}

document.addEventListener('keypress', function (event) {
    event.code === 'Space' ? spawnConfettis() : 0;
});

const body = document.querySelector('body');
let secretInput = "";
window.addEventListener('keydown', (event) => {
    secretInput += event.key.toLowerCase();
    if (secretInput.includes('nunoclement')) {
        secretFunction();
        secretInput = "";
    }
});

function secretFunction() {
    const secretSong = new Audio('../res/sfx/secret_song.ogg');
    alert("Tu as activé un secret...");
    body.style.backgroundColor = "red";
    playInLoop(secretSong);
}

function playInLoop(audio) {
    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
}


