import View from './view';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find the recipes. Please try another one.';
  _message = 'Success';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview);
  }

  _generateMarkupPreview(results) {
    return `
        <li class="preview">
            <a class="preview__link " href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
