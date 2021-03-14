class Punk_API {
  constructor() {
    this.delayTimeout = null;
  }

  async getBeerData(page = 1, per_page = 10) {
    let response = await fetch(
      `https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`
    );

    let res_data = await response.json();

    return { status: "render_table", data: res_data };
  }

  async searchBeerData(search_data) {
    let response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${search_data}`
    );

    let res_data = await response.json();

    return res_data;
  }

  async getSingleBeerData() {
    let page_id = window.location.search.slice(4);

    let response = await fetch(`https://api.punkapi.com/v2/beers/${page_id}`);

    let res_data = await response.json();

    return res_data;
  }
}
