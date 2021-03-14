let ui = new UI();
let punk_api = new Punk_API();

ui.renderNav();
punk_api
  .getSingleBeerData()
  .then((results) => {
    ui.renderSinglePage(results[0]);
  })
  .catch((err) => {
    console.log(err);
  });
