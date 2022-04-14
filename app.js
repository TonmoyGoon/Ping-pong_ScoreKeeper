const p1 = {
    score: 0,
    button: document.querySelector("#btn-1"),
    display: document.querySelector("#player1Score"),
    name: document.querySelector("#p1name")
}
const p2 = {
    score: 0,
    button: document.querySelector("#btn-2"),
    display: document.querySelector("#player2Score"),
    name: document.querySelector("#p2name")
}

const displayName = document.querySelector(".display-name");
const displaySuccessMsg = document.querySelector("#success-msg");

const resetButton = document.querySelector("#reset");
const winningScoreSelect = document.querySelector("#playTo");

const audio = document.querySelector(`audio[data-key="64"]`);


let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
    }
    if (player.score === winningScore) {
        isGameOver = true;
        player.display.classList.add("has-text-success")
        opponent.display.classList.add("has-text-danger")
        player.button.disabled = true;
        opponent.button.disabled = true;

        if (player.name.value !== "") {
            displayName.textContent = `${player.name.value}`
        } else {
            displayName.textContent = `Undefined Player`;
        }

        displaySuccessMsg.classList.remove("hide");
        displaySuccessMsg.classList.add("show");

        // Adding sound logic
        audio.currentTime = 0;
        audio.play();
    }
    player.display.textContent = player.score;
}


p1.button.addEventListener("click", function () {
    updateScores(p1, p2)
})


p2.button.addEventListener("click", function () {
    updateScores(p2, p1);
})

winningScoreSelect.addEventListener("change", function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener("click", reset)

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove("has-text-success", "has-text-danger")
        p.button.disabled = false;
        displaySuccessMsg.classList.add("hide");
        location.reload();
        resetName();
    }
}

function resetName() {
    for (let p of [p1, p2]) {
        p.name.value = "";
    }
}


// Dismiss the message by clicking X

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        const $notification = $delete.parentNode;

        $delete.addEventListener('click', () => {
            $notification.parentNode.removeChild($notification);
        });
    });
});