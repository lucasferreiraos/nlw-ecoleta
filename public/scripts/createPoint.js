function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(response => response.json())
    .then(states => {
        for (state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
};

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    var ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = '';
    citySelect.disabled = true;

    fetch(url)
    .then(response => response.json())
    .then(cities => {
        for (city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    })
};

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items");

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    const alreadySelcted = selectedItems.findIndex(item => {
        return item == itemId
    });

    if (alreadySelcted >=0) {
        const filtederItems = selectedItems.filter(item => {
            return item != itemId;
        });
        selectedItems = filtederItems;
    } else {
        selectedItems.push(itemId);
    }
    
    collectedItems.value = selectedItems;
}
