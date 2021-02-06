document.addEventListener('DOMContentLoaded', () =>{
    numberOfPages

// *********** VARIABLES ***********
const url = 'http://localhost:3000/monsters/'
let currentPage = 1

fetchMonsters(50, 1)
renderCreateForm()

let monsterContainer = document.getElementById('monster-container')

let form = document.getElementById('monster-form')
const backBtn = document.getElementById('back')
const forwardBtn = document.getElementById('forward')

// *********** EVENT LISTENERS/HANDLERS ***********

form.addEventListener('submit', createMonster)
backBtn.addEventListener('click', previousPage)
forwardBtn.addEventListener('click', nextPage)

// *********** FUNCTIONS ***********
function fetchMonsters(numMonsters, page) {
    fetch(`${url}?_limit=${numMonsters}&_page=${page}`)
    .then(response => response.json())
    .then(monsterData => monsterData.forEach(monster => renderMonster(monster)))
};

function renderMonster(monster) {
    let thisMonster = document.createElement('div')
    let thisMonsterName = document.createElement('h2')
    let thisMonsterAge = document.createElement('h4')
    let thisMonsterDesc = document.createElement('p')
    
    thisMonster.setAttribute('monster-data-id', monster.id)
    
    thisMonsterName.innerHTML = monster.name
    thisMonsterAge.innerHTML = `Age: ${monster.age}`
    thisMonsterDesc.innerHTML = `Bio: ${monster.description}`
    thisMonster.append(thisMonsterName, thisMonsterAge, thisMonsterDesc)

    monsterContainer.append(thisMonster)
};

function renderCreateForm() {
    let createForm = document.createElement('form')
    createForm.id = 'monster-form'
    let nameField = document.createElement('input')
    nameField.id = 'name'
    nameField.placeholder = 'name'

    let ageField = document.createElement('input')
    ageField.id = 'age'
    ageField.placeholder = 'age'

    let descField = document.createElement('input')
    descField.id = 'desc'
    descField.placeholder = 'desc'

    let submitBtn = document.createElement('button')
    submitBtn.innerHTML = "create monster"
    
    createForm.append(nameField, ageField, descField, submitBtn)
    document.getElementById('create-monster').append(createForm)
};

function createMonster(event) {
    event.preventDefault()
    const name = event.target[0].value
    const age = event.target[1].value
    const description = event.target[2].value

    const newMonster = {name, age, description}

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(monsterData => renderMonster(monsterData))

    form.reset()
};

function numberOfPages() {
    fetch(url)
    .then(response => response.json())
    .then(data => monsterData = data)
}

function nextPage() {
    // if ()
    currentPage++
    Array.from(monsterContainer.children).forEach(monster => {
        monster.remove()
    })
    fetchMonsters(50, currentPage)
};

function previousPage() {
    if (currentPage > 1) {
    currentPage--
    Array.from(monsterContainer.children).forEach(monster => {
        monster.remove()
    })
    fetchMonsters(50, currentPage)
    }
};

})


//     div
//     h2 - Monster Name
//     h4 - Age: 
//     p - "bio"