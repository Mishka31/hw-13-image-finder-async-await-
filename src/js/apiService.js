import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { error } = require('@pnotify/core');

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fectchArticles() {
    try {
      const KEY = '22480002-eee2092533377b2ba98494930';
      const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

      const respons = await fetch(URL);
      const resJson = await respons.json();
      this.page += 1;
      if (resJson.total === 0) {
        return error({
          title: 'Wrong word!',
          text: 'Enter something else',
        });
      }
    } catch (er) {
      return error({
        title: '404',
        text: 'The origin server did not find a current representation',
      });
    }
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
