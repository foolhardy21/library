class Book {
    constructor(name, author, pages, isRead = false) {
        this.name = name
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
    printInfo() {
        return `${this.name} by ${this.author}, ${this.pages}, ${this.isRead ?
                'Read' : 'Not Read yet'}\n\n`

    }
    changeRead() {
        this.isRead = !this.isRead
    }

}

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
        
    } else if( e.target.innerText == 'Change' ) {
        
        const index = parseInt(e.target.getAttribute('data-id'))
        
        let book = new Book(library[index].name,library[index].author,library[index].pages,library[index].isRead)
        book.changeRead()
        library[index].isRead = book.isRead
        
    }
    writeToStorage()
    displayLibrary()

})
    

function addBookToLibrary(bookObj) {
    
    library.push(bookObj)
    writeToStorage()
    addBookInDisplay(bookObj,library.indexOf(bookObj))
    emptyInputs()
}

function getLibrary() {
    const storageLibrary = JSON.parse(localStorage.getItem('library')) 
    
    if( storageLibrary && storageLibrary.length > 0 ) {
        library =  storageLibrary                       
    } else {
        writeToStorage()    
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
        
        let bookObj = new Book(book.name,book.author,book.pages,book.isRead)
        
        bookDiv.innerText = bookObj.printInfo()

        let removeBtn = document.createElement('button')
        let readStatusBtn = document.createElement('button')

        
        removeBtn.innerText = 'Delete'
        removeBtn.setAttribute('data-id',index)
        
        readStatusBtn.innerText = 'Change'
        readStatusBtn.setAttribute('data-id',index) 

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

function writeToStorage() {
    localStorage.setItem('library',JSON.stringify(library))
}