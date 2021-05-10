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
    book: {
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
      // thisBooksList.filterBooks();
      // thisBooksList.determineRatingBgc();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.bookContainer = document.querySelector(
        select.containerOf.booksList
      );
      thisBooksList.filtersContainer = document.querySelector(
        select.containerOf.filters
      );
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render() {
      const thisBooksList = this;
      for (let books of thisBooksList.data) {
        books.ratingBgc = thisBooksList.determineRatingBgc(books.rating);
        books.ratingWidth = books.rating * 10;
        /* generateHTML based on template */
        const generatedHTML = templates.bookProduct(books);

        /* create element using utills.createElementFromHtml */
        const element = utils.createDOMFromHTML(generatedHTML);

        /* find book container */
        thisBooksList.bookContainer.appendChild(element);
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
      thisBooksList.filtersContainer.addEventListener(
        'click',
        function (event) {
          const clickedElement = event.target;
          if (
            clickedElement.tagName === 'INPUT' &&
            clickedElement.type === 'checkbox' &&
            clickedElement.name === 'filter'
          ) {
            if (clickedElement.checked) {
              thisBooksList.filters.push(clickedElement.value);
              console.log(thisBooksList.filters);
              thisBooksList.filterBooks();
            } else {
              thisBooksList.filters.splice(
                thisBooksList.filters.indexOf(clickedElement.value),
                1
              );
              thisBooksList.filterBooks();
            }
          }
        }
      );
    }

    filterBooks() {
      const thisBooksList = this;

      let shouldBeHidden = false;
      for (let book of dataSource.books) {
        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
          const bookImage = document.querySelector(
            '.book__image[data-id="' + book.id + '"]'
          );
          if (shouldBeHidden) {
            bookImage.classList.add('hidden');
          } else {
            bookImage.classList.remove('hidden');
          }
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }

  const app = {
    init: function () {
      new BooksList();
    },
  };
  app.init();
}
