// variables 
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const booksContainer = document.getElementById('books-container');
const errorMessage = document.getElementById('error');
const numberOfBooks = document.getElementById('numbers-Of-books');

// Search Books 
const searchBooks = () => {
    const searchText = searchInput.value;
    // No Input Error 
    if(searchText === ''){
        numberOfBooks.innerHTML = '';
        error.innerHTML = `
        <div class="border py-5 px-5 w-75 mx-auto text-center bg-light">
        <div class="image mx-auto">
            <img src="images/error.png" alt="" width="100px" height="100px">
        </div>
           <h3 class="text-danger py-0">Search field cannot be empty.</h3>
       </div>
        `;
        booksContainer.innerHTML = '';
        numberOfBooks.innerHTML = '';
    } else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
          .then(res => res.json())
          .then(data => displayBooks(data.docs))
      }
    //   Clear 
    searchInput.value = '';
 }


//  Display Books 
const displayBooks = books => {
    console.log(books.length);
    const totalBooks = books.length;
    // No Result 
    if(totalBooks === 0){
        numberOfBooks.innerHTML = `
        <br>
        <div class="border rounded py-5 px-5 w-75 mx-auto text-center bg-light">
        <div class="image mx-auto">
            <img src="images/no-result.png" alt="" width="100px" height="100px">
        </div>
           <h3 class="text-danger py-0">No Results Found</h3>
       </div>
        `;
      
    } 
    // total books found 
    else{
        numberOfBooks.innerHTML = `
        <h4 class="text-center text-primary">Total <b id="number-of-books" class="fw-bolder">${totalBooks}</b>  Books Found</h4>
        `;
        console.log(numberOfBooks.innerHTML);
    }
    // clear books container 
    errorMessage.innerText = '';
    booksContainer.textContent = '';

    // create new div 
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
             <!-- Image  -->
             <img class="" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  alt="..." height="240px">
             <!-- Body  -->
             <div class="py-2 justify-content-between align-items-center d-block text-center">
            
                <p><b>Book:</b> ${book.title}</p>
                <p><b>Author:</b> ${book.author_name}</p>
                <p><b>Publisher:</b> ${book.publisher}</p>
                <p><b>First Publish:</b> ${book.first_publish_year}</p>
             </div>
        </div>
    `;
    booksContainer.appendChild(div);
    });

}
