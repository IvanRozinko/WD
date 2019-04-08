const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

const tbody = document.getElementById("tbody");
const totalPrice = document.getElementById("totalPrice");
buildTable(GOODS);

//fill table with data from array
function buildTable(array) {
    tbody.innerHTML = "";
    array.forEach((item) => {
        const row = document.createElement("tr");
        const properties = Object.values(item);
        properties.forEach((itemProperty) => {
            const cell = document.createElement("td");
            cell.innerHTML = itemProperty;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    calculateSum(array);
}

//calculate summary price
function calculateSum(array) {
    let sum = 0;
    array.forEach((item) => {
        sum += item.price;
    });
    totalPrice.innerHTML = sum + " $";
}

//sort objects by name
const sortByNameBtn = document.getElementById("sortByNameBtn");
sortByNameBtn.addEventListener("click", () => {
    sortByName(GOODS)
});


let isSortedByName = false;

function sortByName(array) {
    if (!isSortedByName) {
        array.sort(compareByName);
        buildTable(array);
        isSortedByName = true;
        sortByNameBtn.innerText = "▲";
    } else {
        array.reverse();
        buildTable(array);
        isSortedByName = false;
        sortByNameBtn.innerText = "▼";
    }
}

function compareByName(a, b) {
    if (a.name > b.name)
        return 1;
    if (a.name < b.name)
        return -1;
    return 0;
}

//filter objects by category
const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", () => {
    filter(filterSelect.value, GOODS)
});

function filter(value, array) {
    let filteredArray = array;
    if (value !== "") {
        filteredArray = array.filter((item) => value === item.category);
    }
    buildTable(filteredArray);
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {search(searchInput.value, GOODS)})

function search(value, array){
    const regex = new RegExp("^" + value, "i");
    const filteredArray = array.filter((item) => regex.test(item.name));
    buildTable(filteredArray);
}
