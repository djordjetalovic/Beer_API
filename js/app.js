let ui = new UI();
let punk_api = new Punk_API();

ui.renderNav();
punk_api
  .getBeerData()
  .then((results) => {
    ui.renderTables(results);
  })
  .catch((err) => {
    console.log(err);
  });

ui.dropdown_el.addEventListener("change", (e) => {
  let drop_value = Number(e.target.value);

  if (drop_value === ui.per_page) {
    return;
  } else if (drop_value > ui.per_page || drop_value < ui.per_page) {
    ui.per_page = drop_value;

    let newPage = Math.ceil(ui.max_items / drop_value);
    if (ui.page > newPage) {
      ui.page = newPage;
    }

    punk_api
      .getBeerData(ui.page, ui.per_page)
      .then((results) => {
        ui.renderTables(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

ui.search_table_input.addEventListener("keyup", (e) => {
  let input_val = e.target.value.toLowerCase();
  let rows = document.querySelectorAll(".beer_table tbody tr");

  Array.from(rows).forEach((el) => {
    if (el.children[1].textContent.toLowerCase().indexOf(input_val) === -1) {
      el.style.display = "none";
    } else if (input_val === "") {
      el.style.display = "revert";
    } else {
      el.style.display = "revert";
    }
  });
});

ui.pagination_ul.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.textContent === "Prev") {
    ui.page -= 1;
  } else if (e.target.textContent === "Next") {
    ui.page += 1;
  } else if (e.target.classList.contains("page_link")) {
    ui.page = Number(e.target.textContent);
  }
  punk_api
    .getBeerData(ui.page, ui.per_page)
    .then((results) => {
      ui.renderTables(results);
    })
    .catch((err) => {
      console.log(err);
    });
});
