const form = document.getElementById("guestForm");
const entries = document.getElementById("entries");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const entry = document.createElement("div");
    entry.classList.add("entry");

    entry.innerHTML = `
        <h3>${name}</h3>
        <p>${message}</p>
    `;

    entries.appendChild(entry);

    form.reset();
});