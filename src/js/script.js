{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    books: {
      image: '.book__image',
    },
  };

  const templates = {
    bookProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();
    }

    initData() {
      this.data = dataSource.books;
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      for (let books of dataSource.books) {
        books.ratingBgc = dataSource.books.determineRatingBgc(books.rating);
        books.ratingWidth = books.rating * 10;
        /* generateHTML based on template */
        const generatedHTML = templates.bookProduct(books);

        /* create element using utills.createElementFromHtml */
        const element = utils.createDOMFromHTML(generatedHTML);

        /* find book container */
        const bookContainer = document.querySelector(
          select.containerOf.booksList
        );

        /* add element to menu */
        bookContainer.appendChild(element);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.bookContainer.addEventListener(
        'dblclick',
        function (event) {
          event.preventDefault();
          const clickedElement = event.target.offsetParent;
          const id = clickedElement.getAttribute('data-id');

          if (!clickedElement.classList.contains('favorite')) {
            thisBooksList.favoriteBooks.push(id);
            clickedElement.classList.add('favorite');
          } else {
            thisBooksList.favoriteBooks.splice(
              thisBooksList.favoriteBooks.indexOf(id),
              1
            );
            clickedElement.classList.remove('favorite');
          }
        }
      );
    }

    filterBooks() {
      thisBooksList = this;
      for (let books of dataSource.books) {
        let shouldBeHidden = false;
        for (let filter of filters)
          if (!books.details[filter]) {
            shouldBeHidden = true;
            break;
          }
      }
      const bookImage = document.querySelector(
        '.book__image[data-id="' + books.id + '"]'
      );
      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }
    return background;
  }

  const app = new BooksList();
}
