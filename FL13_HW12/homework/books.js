const books = [
    {
        id: 1,
        title: 'The Hobbit, or There and Back Again',
        author: 'J. R. R. Tolkien',
        cover: 'https://tinyurl.com/y8uehwgb',
        summary: 'Written for Tolkien’s children, The Hobbit met instant critical acclaim when it was first published.'
    },

    {
        id: 2,
        title: 'The Spire',
        author: 'William Golding',
        cover: 'https://tinyurl.com/yaxuqllk',
        summary: 'Dean Jocelin has a vision: that God has chosen him to erect a great spire on his cathedral.'
    }, 

    {
        id: 3,
        title: 'Animal Farm',
        author: 'George Orwell',
        cover: 'https://tinyurl.com/ybqazhth',
        summary: 'George Orwells allegorical novela scathing satire on a societys blind march towards totalitarianism.'
    }
]

window.addEventListener('load', () => {
    if(!localStorage.books){
        localStorage.setItem('books', JSON.stringify(books));
        location.reload();
    }
})