const baseUrl = 'https://pixabay.com/api/?key=';
export default {
  page: 1,
  query: '',

  fetchImages() {
    const apiKey = '17820994-9f31f9cb0d4f96d74b3464930';
    const requestParams =
      '&q=' + this.query + '&page=' + this.page + '&per_page=12';

    return fetch(baseUrl + apiKey + requestParams).then(res =>
      res.json().then(parsedResponse => {
        this.icrementPage();

        return parsedResponse.hits;
      }),
    );
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },

  icrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
