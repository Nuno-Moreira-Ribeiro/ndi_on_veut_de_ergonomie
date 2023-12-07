const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

const question = document.querySelector('#questions-bloc .question');
const slider = document.querySelector('#questions-bloc .slider input');

const progressBar = document.querySelector('#content .progress-done');
const questionsBloc = document.getElementById('questions-bloc');
var shareButton;

const qsList = [
    "Je parle facilement en public.",
    "J'aime rencontrer de nouvelles personnes.",
    "Je préfère les grandes fêtes aux petits rassemblements.",
    "J'engage souvent des conversations avec des inconnus.",
    "Je suis à l'aise lors des événements sociaux.",
    "J'aime participer à des activités de groupe.",
    "Je me sens bien en compagnie d'amis proches.",
    "Je préfère passer du temps avec des gens plutôt que seul.",
    "Je suis sociable et bavard.",
    "Je me mets rarement en avant dans les conversations.",
    "Je suis un bon auditeur.",
    "Je me fais de nouveaux amis facilement.",
    "Je suis le genre de personne à organiser des sorties entre amis.",
    "Je ne me sens pas nerveux(se) lors de nouvelles rencontres.",
    "Je suis généralement à l'aise en société.",
    "Je suis ouvert(e) à de nouvelles expériences sociales.",
    "Je suis extraverti(e) par nature.",
    "J'ai tendance à aller vers les foules.",
    "Je ne suis pas quelqu'un de timide.",
    "Je ne me tiens pas souvent à l'écart des conversations de groupe.",
    "J'adore les grandes fêtes et les événements sociaux.",
    "J'essaie de faire en sorte que tout le monde se sente à l'aise en ma présence.",
    "Je suis autant à l'aise avec les amis qu'avec des inconnus.",
    "J'aime discuter de divers sujets avec différentes personnes.",
    "Je suis facile à aborder.",
    "Je préfère les rencontres en personne aux interactions en ligne .",
    "Je m'ouvre autant une fois que je connais mieux quelqu'un que pas du tout.",
    "Je trouve enrichissant d'apprendre à connaître de nouvelles personnes."
];

const statusList = [
    "Explorateur de la solitude",
    "Ami du calme",
    "Étoile sociale",
    "Maître des conversations",
    "Génie de la sociabilité"
];

const dcpList = [
    "Tu es un explorateur de la solitude. Tu apprécies la tranquillité et la réflexion personnelle. La vie sociale n'est pas ta priorité, mais tu as tes propres passions.",
    "Tu es l'ami du calme. Tu es à l'aise avec des interactions légères, mais tu préfères souvent des moments de quiétude. Tu trouves un équilibre entre solitude et société.",
    "Tu es une étoile sociale. Les conversations et les rencontres font partie intégrante de ta vie. Tu sais t'amuser sans perdre de vue les règles sociales.",
    "Tu es un maître des conversations. La sociabilité est ton domaine. Tu es à l'aise dans toutes les situations sociales et tu brilles dans les interactions humaines.",
    "Tu es un génie de la sociabilité. Tu es le centre de toutes les conversations, et tu as une capacité innée à connecter avec les autres. La sociabilité est ton art de vivre."
];

const citList = ["« La société veut des citoyens, elle ne veut pas des hommes. » - Oscar Wilde",
    "«La normalité est une route pavée : on y marche aisément mais les fleurs n'y poussent pas. - Vincent Van Gogh»",
    "«La société veut des moutons, elle trouvera toujours un berger.» - Michel Audiard",
    "«Dans la vie, il n'y a qu'une chose qui soit vraiment importante : c'est de décider ce que l'on veut faire de sa vie.» - Winston Churchill",
    "«Les conventions sont des inventions humaines et rien ne nous oblige à les suivre aveuglément.» - Bertrand Russell",
    "«Dans toute société, il y a des normes qui façonnent les comportements, mais la créativité vient de ceux qui savent briser ces normes et faire les choses différemment.» - Quelqu'un"]
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


