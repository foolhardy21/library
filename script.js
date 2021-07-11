let libraryDiv = document.querySelector('.lib')
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

function Book() {

}

function addBookToLibrary() {

}

function displayLibrary() {

    library.forEach((book) => {

        let bookDiv = document.createElement('div')
        let nameDiv = document.createElement('div')
        let authorDiv = document.createElement('div')
        let pageDiv = document.createElement('div')
        
        nameDiv.innerText = book.name
        authorDiv.innerText = book.author
        pageDiv.innerText = book.pages 

        bookDiv.appendChild(nameDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pageDiv)
        bookDiv.appendChild(document.createElement('br'))

        libraryDiv.appendChild(bookDiv)
         
    })
}

displayLibrary()