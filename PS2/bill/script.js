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
let filteredArray = GOODS;
let searchedArray = filteredArray;
buildTable(GOODS);

/**
 * Method takes as a parameter array of objects and builds a table in HTML document
 * where: num of rows equals arrays length and number of columns is a number of
 * object properties
 * @param array contains objects
 */
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

/**
 * Calculating total sum of goods stores in array
 * @param array of objects
 */
function calculateSum(array) {
    let sum = 0;
    array.forEach((item) => {
        sum += item.price * item.amount;
    });
    totalPrice.innerHTML = sum + " $";
}


let isSortedByName = false;
let isSortedByCat = false;
const sortByNameBtn = document.getElementById("sortByNameBtn");
sortByNameBtn.addEventListener("click", () => {sortByName(searchedArray)});

const sortByCatBtn = document.getElementById("sortByCatBtn");
sortByCatBtn.addEventListener("click", () => {sortByCat(searchedArray)});

/**
 * Sorts objects in array by name property.
 * @param array of objects
 */
function sortByName(array) {

    if (!isSortedByName) {
        array.sort(compareByName);
        sortByNameBtn.innerText = "▲";
    } else {
        array.reverse();
        sortByNameBtn.innerText = "▼";
    }
    buildTable(array);
    isSortedByName = !isSortedByName;
}

/**
 * Sorts objects in array by category property.
 * @param array of objects
 */
function sortByCat(array) {
    if (!isSortedByCat) {
        array.sort(compareByCat);
        sortByCatBtn.innerText = "▲";
    } else {
        array.reverse();
        sortByCatBtn.innerText = "▼";
    }
    isSortedByCat = !isSortedByCat;
    buildTable(array);
}
/**
 * Comparing objects by name
 * @param a object
 * @param b object
 */
function compareByName(a, b) {
    if (a.name > b.name)
        return 1;
    return -1;
}
/**
 * Comparing objects by category
 * @param a object
 * @param b object *
 */
function compareByCat(a, b) {
    if (a.category > b.category)
        return 1;
    return -1;
}

//filter objects by category
const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", () => {
    filter(filterSelect.value)
});

/**
 * Filtering array by value
 * @param value
 */
function filter(value) {
    if (value !== "") {
        filteredArray = GOODS.filter((item) => value === item.category);
    } else filteredArray = GOODS;
    buildTable(filteredArray);
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", () => {search(searchInput.value)});

/**
 * Searching items by their names
 * @param value
 */
function search(value){
    const regex = new RegExp("^" + value, "i");
    if (value!== "") {
      searchedArray = filteredArray.filter((item) => regex.test(item.name));
    } else searchedArray = filteredArray;

    buildTable(searchedArray);
}
