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
//building a table when a page loads
buildTable(GOODS);

//sorting of array by object property
const propComparator = (prop) =>
    (a, b) => a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
const compareByCat = propComparator("category");
const compareByName = propComparator("name");

let isSorted = false;
const sortButtons = document.getElementsByClassName("sortButton");
Array.from(sortButtons).forEach((button) => {
    button.addEventListener("click", (event) => {
        if (!isSorted) {
            filteredArray.sort(event.target.id === "name" ? compareByName : compareByCat);
        } else {
            filteredArray.reverse();
        }
        isSorted = !isSorted;
        buildTable(filteredArray);
    });
});


const categoryInput = document.getElementById("filter");
const nameInput = document.getElementById("search");
//filtering  objects by category
categoryInput.addEventListener("change", () => {
    filter(categoryInput.value, nameInput.value);
});
//filtering objects by name
nameInput.addEventListener("keyup", () => {
    filter(categoryInput.value, nameInput.value)
});


/**
 * Method takes as a parameter array of objects and builds a result in HTML document
 * where: num of rows equals array length and number of columns is a number of
 * object properties
 * @param array contains objects
 */
function buildTable(array) {
    tbody.innerText = "";
    const fragment = document.createDocumentFragment();
    array.forEach((item) => {
        const row = document.createElement("tr");
        const properties = Object.values(item);
        properties.forEach((itemProperty) => {
            const cell = document.createElement("td");
            cell.innerText = itemProperty;
            row.appendChild(cell);
        });
        fragment.appendChild(row);
    });
    tbody.appendChild(fragment);
    calculateSum(array);
}

/**
 * Calculating total sum of goods stores in array
 * @param array of objects
 */
function calculateSum(array) {
    const sum = array.reduce(function (sum, current) {
        return sum + current.amount * current.price;
    }, 0);
    totalPrice.innerText = sum + " $";
}


/**
 * Sorts objects in array by object property.
 * @param isSorted showing if method already been used
 * @param compareMethod shows how to compare objects
 */
function sortByAbc(isSorted, compareMethod) {

}


/**
 * Filtering array by category and name
 * @param category
 * @param name
 */
function filter(category, name) {
    filteredArray = GOODS;
    if (category) {
        filteredArray = filteredArray.filter((item) => category === item.category);
    }
    searchByName(name);
    buildTable(filteredArray);
}


/**
 * Searching items by their names
 * @param name input by user
 */
function searchByName(name) {
    const nameRegExp = new RegExp(name, "i");
    filteredArray = filteredArray.filter((item) => nameRegExp.test(item.name));
}
