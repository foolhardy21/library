let libraryDiv = document.querySelector('.lib')
let formDiv = document.querySelector('form')
let nameInput = document.querySelector('input[name="name"]')
let authorInput = document.querySelector('input[name="author"]')
let pageInput = document.querySelector('input[name="pages"]')
let localStorage = window.localStorage

let library = [
    {
        name: 'Meluha',
        author: 'Amish Tripathi',
        pages: 300,
        isRead: false
    },
    {
        name: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        pages: 200,
        isRead: false
    },
    {
        name: 'Zarathustra',
        author: 'Friedrich Neitzche',
        pages: 350,
        isRead: false
    }
]

getLibrary()
displayLibrary()

formDiv.addEventListener('submit',(e) => {
    e.preventDefault()
    
    let book = new Book(nameInput.value, authorInput.value, pageInput.value)
    
    addBookToLibrary(book)

})

libraryDiv.addEventListener('click',(e) => {

    if( e.target.innerText == 'Delete' ) {
        const index = parseInt(e.target.getAttribute('data-id'))
        library.splice(index,1)
        localStorage.setItem('library',JSON.stringify(library))
        displayLibrary()
    } else if( e.target.innerText == 'Change' ) {
        
        const index = parseInt(e.target.getAttribute('data-id'))
        let book = new Book(library[index].name,library[index].author,library[index].pages,library[index].isRead)
        book.changeRead()
        library[index].isRead = book.isRead
        localStorage.setItem('library',JSON.stringify(library))
        displayLibrary()
    }
})
    
function Book(name, author, pages, isRead = false) {
    this.name = name
    this.author = author
    this.pages = pages
    this.isRead = isRead
}
Book.prototype.changeRead = function() {
    this.isRead = !this.isRead
    
}

function addBookToLibrary(bookObj) {
    getLibrary()
    library.push(bookObj)
    localStorage.setItem('library',JSON.stringify(library))
    addBookInDisplay(bookObj,library.indexOf(bookObj))
    emptyInputs()
}

function getLibrary() {
    const storageLibrary = JSON.parse(localStorage.getItem('library')) 
    
    if( storageLibrary && storageLibrary.length > 0 ) {
        library =  storageLibrary                       
    } else {
        localStorage.setItem('library',JSON.stringify(library))    
    }
}

function displayLibrary() {
    refreshDisplay()
    library.forEach((book,index) => {
        
        addBookInDisplay(book,index)
         
    })
}
function refreshDisplay() {
    while(libraryDiv.firstChild) {
        libraryDiv.removeChild(libraryDiv.firstChild)
    }
}
function addBookInDisplay(book,index) {
        let bookDiv = document.createElement('div')
        bookDiv.className='book'

        let nameDiv = document.createElement('div')
        let authorDiv = document.createElement('div')
        let pageDiv = document.createElement('div')
        let readDiv = document.createElement('div')
        let removeBtn = document.createElement('button')
        let readStatusBtn = document.createElement('button')

        nameDiv.innerText = book.name
        authorDiv.innerText = `Written By: ${book.author}`
        pageDiv.innerText = `No of Pages: ${book.pages}`
        readDiv.innerText = ` ${book.isRead ? 'Read' : 'Not Read yet'} `
        
        removeBtn.innerText = 'Delete'
        removeBtn.setAttribute('data-id',index)
        readStatusBtn.innerText = 'Change'
        readStatusBtn.setAttribute('data-id',index) 

        bookDiv.appendChild(nameDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pageDiv)
        bookDiv.appendChild(readDiv)
        bookDiv.appendChild(removeBtn)
        bookDiv.appendChild(readStatusBtn)
        bookDiv.appendChild(document.createElement('hr'))
        bookDiv.appendChild(document.createElement('br'))

        libraryDiv.appendChild(bookDiv)
        
}
function emptyInputs() {
    nameInput.value = ''
    authorInput.value = ''
    pageInput.value = ''
}
