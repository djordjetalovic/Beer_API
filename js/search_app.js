let ui = new UI();
let punk_api = new Punk_API();

ui.renderNav();

ui.search_input.addEventListener("keyup", (e) => {
  let input_val = e.target.value.toLowerCase().split(" ").join("_");
  clearTimeout(punk_api.delayTimeout);

  if (e.target.value.length !== 0) {
  punk_api.delayTimeout = setTimeout(() => {
      punk_api
        .searchBeerData(input_val)
        .then((results) => {
          ui.renderSearchList(results);
        })
        .catch((err) => {
          console.log(err);
        });
      }, 400);
    } else {
      ui.beer_list.innerHTML = "";
    }
});
