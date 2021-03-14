class UI {
  constructor() {
    this.navLinks = [
      { title: "Home", link: "index.html" },
      { title: "Search", link: "search.html" },
    ];
    this.max_items = 234;
    this.page = 1;
    this.per_page = 10;

    this.table_body = document.querySelector(".beer_table tbody");
    this.small_table_body = document.querySelector(
      ".small_beer_table_div tbody"
    );
    this.beer_list = document.querySelector(".beer_list");
    this.dropdown_el = document.querySelector(".select_pages");
    this.search_input = document.querySelector(".search_input");
    this.search_table_input = document.querySelector(".search_table_input");
    this.pagination_ul = document.querySelector(".pagination_ul");

    this.single_page_container = document.querySelector(
      ".single_page_container"
    );
  }

  renderNav() {
    let output = "";
    this.navLinks.forEach(function (el, index) {
      output += `<a class="nav_links ${
        window.location.pathname.includes("index") && index === 0
          ? "active_link"
          : ""
      } ${
        window.location.pathname.includes("search") && index === 1
          ? "active_link"
          : ""
      }" href="${el.link}">${el.title}</a>`;
      document.getElementById("siteNavbar").innerHTML = output;
    });
  }

  renderTables(beer_data) {
    let output = "";

    if (beer_data.status === "render_table") {
      beer_data.data.forEach(function (beer) {
        output += `
              <tr>
                 <th scope="row">${beer.id}</th>
                 <td class="name_column">${beer.name}</td>
                 <td><img src="${beer.image_url}" alt="Beer pic" height="50px" width="50px"></td>
                 <td>${beer.first_brewed}</td>
                 <td>${beer.abv}</td>
              </tr>
              `;
      });
    } else if (beer_data.status === "filter_table") {
      beer_data.data.forEach((beer) => {
        output += beer.outerHTML;
      });
    }
    this.table_body.innerHTML = output;
    this.renderPagination(this.per_page);
    this.small_table_body.innerHTML = this.renderSmallerTable(beer_data.data);
    this.search_table_input.value = "";
  }

  renderSmallerTable(data) {
    let min_abv_data = data.map((el) => {
      return el.abv;
    });
    min_abv_data = Math.min(...min_abv_data);

    let max_ph_data = data.map((el) => {
      return el.ph;
    });
    max_ph_data = Math.max(...max_ph_data);

    let darkest_ebc = data.map((el) => {
      return el.ebc;
    });
    darkest_ebc = Math.max(...darkest_ebc);

    let ferm_temp = data.map((el) => {
      return el.method.fermentation.temp.value;
    });

    let avg_ferm_temp =
      ferm_temp.reduce((a, b) => {
        return a + b;
      }, 0) / ferm_temp.length;

    let output = `<tr>
                    <td class="min_abv_column">${min_abv_data}</td>
                    <td>${max_ph_data}</td>
                    <td>${darkest_ebc}</td>
                    <td>${avg_ferm_temp}</td>
                  </tr>`;
    return output;
  }

  renderPagination(dropdown_num = 10) {
    let pages_num = Math.ceil(this.max_items / dropdown_num);
    let page_before = this.page - 1;
    let page_after = this.page + 1;
    let li_tags = ``;

    if (this.page > 1) {
      li_tags += `<li class="page_item btn_prev">
      <a class="page_link" href="#">Prev</a>
      </li>`;
    }

    if (this.page > 2) {
      li_tags += `<li class="page_nums">
      <a class="page_link" href="#">1</a>
      </li>`;
      if (this.page > 3) {
        li_tags += `<li class="page_dots">
        <span>...</span>
        </li>`;
      }
    }

    for (let pageNum = page_before; pageNum <= page_after; pageNum++) {
      if (pageNum > pages_num) {
        continue;
      }
      if (pageNum === 0) {
        pageNum += 1;
      }

      li_tags += `<li class="page_nums ${
        pageNum === this.page ? "active" : ""
      }">
      <a class="page_link" href="#">${pageNum}</a>
      </li>`;
    }

    if (this.page < pages_num - 1) {
      if (this.page < pages_num - 2) {
        li_tags += `<li class="page_dots">
        <span>...</span>
        </li>`;
      }
      li_tags += `<li class="page_nums">
      <a class="page_link" href="#">${pages_num}</a>
      </li>`;
    }

    if (this.page < pages_num) {
      li_tags += `<li class="page_item btn_next">
      <a class="page_link" href="#">Next</a>
      </li>`;
    }

    this.pagination_ul.innerHTML = li_tags;
  }

  renderSearchList(beer_data) {
    let output = "";

    beer_data.forEach(function (beer) {
      output += `
            <a
              href="beer.html?id=${beer.id}"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              ${beer.name}
          </a>
            `;
    });

    this.beer_list.innerHTML = output;
  }

  renderSinglePage(beer_data) {
    let ul_data = ``;

    beer_data.food_pairing.forEach((e) => {
      ul_data += `<li>${e}</li>`;
    });

    let output = `<div class="beer_img_basic_data d-flex pt-5 pb-4">
    <div class="beer_img_div">
      <img
        src="${beer_data.image_url}"
        class="d-inline-block beer_img"
        alt="Beer image"
      />
    </div>
    <div class="beer_basic_data">
      <h1 class="display-4 beer_basic_data_title">
        <span class="title_span">${beer_data.name}</span>
      </h1>
      <p class="fst-italic lead">${beer_data.tagline}</p>
      <div class="beer_info_div pt-3 pb-1 my-3">
        <h4 class="px-3">General information</h4>
        <div class="beer_info px-4 py-2">
          <p><span class="d-inline-block fw-bold">ABV:</span> &nbsp;${beer_data.abv}</p>
          <p>
            <span class="d-inline-block fw-bold">Attenuation level:</span>
            &nbsp;${beer_data.attenuation_level}
          </p>
          <p><span class="d-inline-block fw-bold">EBC:</span> &nbsp;${beer_data.ebc}</p>
          <p><span class="d-inline-block fw-bold">IBU:</span> &nbsp;${beer_data.ibu}</p>
          <p><span class="d-inline-block fw-bold">Ph:</span> &nbsp;${beer_data.ph}</p>
          <p>
            <span class="d-inline-block fw-bold">Target og:</span> &nbsp;${beer_data.target_og}
          </p>
          <p>
            <span class="d-inline-block fw-bold">Target fg:</span> &nbsp;${beer_data.target_fg}
          </p>
          <p>
            <span class="d-inline-block fw-bold">Volume:</span> &nbsp;${beer_data.volume.value} ${beer_data.volume.unit}
          </p>
          <p>
            <span class="d-inline-block fw-bold">Boil volume:</span>
            &nbsp;${beer_data.boil_volume.value} ${beer_data.boil_volume.unit}
          </p>
          <p><span class="d-inline-block fw-bold">SRM:</span> &nbsp;${beer_data.srm}</p>
          <p>
            <span class="d-inline-block fw-bold">First brewed:</span>
            &nbsp;${beer_data.first_brewed}
          </p>
          <p>
            <span class="d-inline-block fw-bold">Contributed by:</span>
            &nbsp;${beer_data.contributed_by}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="beer_description mx-auto d-flex my-4">
     <div class="desc_heading">
        <h4 class="">Description</h4>
     </div>
     <div class="desc_content">
        <p>${beer_data.description}</p>
     </div>
  </div>
  <div class="beer_tips mx-auto d-flex my-4">
     <div class="tips_heading">
        <h4 class="">Brewers tips</h4>
     </div>
     <div class="tips_content">
        <p>${beer_data.brewers_tips}</p>
     </div>
  </div>
  <div class="best_pair mx-auto d-flex mt-4 mb-5">
     <div class="pair_heading">
        <h4 class="">Best paired with</h4>
     </div>
     <div class="pair_content">
        <ul>
           ${ul_data}
        </ul>
     </div>
  </div>`;

    this.single_page_container.innerHTML = output;
  }
}
