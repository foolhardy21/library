let libraryDiv = document.querySelector('.lib')
let formDiv = document.querySelector('form')
let nameInput = document.querySelector('input[name="name"]')
let authorInput = document.querySelector('input[name="author"]')
let pageInput = document.querySelector('input[name="pages"]')

let library = [
    {
        name: 'Meluha',
        author: 'Amish Tripathi',
        pages: 300
    },
    {
        name: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        pages: 200
    },
    {
        name: 'Zarathustra',
        author: 'Friedrich Neitzche',
        pages: 350
    }
]

displayLibrary()

formDiv.addEventListener('submit',(e) => {
    e.preventDefault()
    
    let book = new Book(nameInput.value, authorInput.value, pageInput.value)
    
    addBookToLibrary(book)
})



function Book(name, author, pages) {
    this.name = name
    this.author = author
    this.pages = pages

}

function addBookToLibrary(bookObj) {
    library.push(bookObj)
    addBookInDisplay(bookObj)
    emptyInputs()
}

function displayLibrary() {

    library.forEach((book) => {
        
        addBookInDisplay(book)
         
    })
}
function addBookInDisplay(book) {
        let bookDiv = document.createElement('div')
        let nameDiv = document.createElement('div')
        let authorDiv = document.createElement('div')
        let pageDiv = document.createElement('div')
        let removeBtn = document.createElement('button')
        
        nameDiv.innerText = book.name
        authorDiv.innerText = book.author
        pageDiv.innerText = book.pages
        removeBtn.innerText = 'Delete'

        bookDiv.appendChild(nameDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pageDiv)
        bookDiv.appendChild(removeBtn)
        bookDiv.appendChild(document.createElement('hr'))
        bookDiv.appendChild(document.createElement('br'))

        libraryDiv.appendChild(bookDiv)
        
}
function emptyInputs() {
    nameInput.value = ''
    authorInput.value = ''
    pageInput.value = ''
}
