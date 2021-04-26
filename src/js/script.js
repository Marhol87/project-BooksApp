{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    bookProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
  };

  function render() {
    for (let books of dataSource.books) {
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
  render();
}
