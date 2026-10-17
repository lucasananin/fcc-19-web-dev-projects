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

const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

for (let i = 0; i < lists.length; i++) {
    const list = lists[i];
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", this.id);
    console.log(this);
}

function dragEnd(event) {
    console.log(this);
}

function dragOver(event) {
    event.preventDefault();
    console.log(this);
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add("over");
}

function dragLeave(event) {
    this.classList.remove("over");
}

function dragDrop(event) {
    const id = event.dataTransfer.getData("text/plain");
    const card = document.getElementById(id)
    this.appendChild(card);
    this.classList.remove("over");
}