const API_KEY = "vQDbJRoWcKWABWwCu3gkV1ij75Q";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e=> postForm());

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch("API_URL", {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
            },
        body: form,
    })
};

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data.expiry);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    getElementById("resultsModalTitle").innerText = heading;
    getElementById("results-content").innerText = results;

    resultsModal.show();
}

