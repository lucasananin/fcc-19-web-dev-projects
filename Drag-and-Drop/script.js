//#region Spawn Cards
const cardTemplate = document.getElementById("card-template");

function spawnCardTemplate(container, id, textContent) {
    const clone = cardTemplate.content.cloneNode(true);
    const div = clone.querySelector(".card");
    div.id = id;
    div.textContent = textContent;
    container.appendChild(clone);
}

const list1 = document.getElementById("list1");
spawnCardTemplate(list1, "card2", "Buy groceries");
const list2 = document.getElementById("list2");
spawnCardTemplate(list2, "card3", "Learn to code");
//#endregion