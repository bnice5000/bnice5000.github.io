// JavaScript From https://github.com/Pelican-Elegant/elegant/blob/master/templates/search.html
// Many thanks to Talha Mansoor (talha131) on github

function lunr_search(term) {
  if (!tipuesearch) {
    console.error("Pelican Boostrap4: Tipue search plugin is required");
    return;
  }

  const items = tipuesearch["pages"];
  const documents = tipuesearch["pages"];
  let counter = 0;

  for (item in documents) {
    documents[item]["id"] = counter;
    counter = counter + 1;
  }

  idx = lunr(function () {
    this.ref("id");
    this.field("title");
    this.field("url");
    this.field("text", { boost: 10 });
    this.field("tags");

    items.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  if (term && idx && documents) {
    const resultHeadingRoot = document.getElementById(
      "lunr-search-result-heading"
    );
    const resultIntro = `
    <h1>Search Results for... <samp class="search rounded">${term}</samp></h1>
    `;

    resultHeadingRoot.insertAdjacentHTML("beforeend", resultIntro);

    const resultRoot = document.getElementById("lunr-search-result");
    //put results on the screen.
    var results = idx.search(term);
    if (results.length > 0) {
      //if results
      for (var i = 0; i < results.length; i++) {
        var ref = results[i]["ref"];
        var url = documents[ref]["url"];
        var title = documents[ref]["title"];
        var body = documents[ref]["text"].substring(0, 280) + "...";

        const resultItem = `
          <div class="lunr-search-result-item">
              <h4>
                  <a href=${url}>
                  ${title}
                  </a>
               </h4>
              </a>
              <p class="lunr-search-result-item-body text-muted pl-4">${body}
              </p>
          </div>
          `;

        resultRoot.insertAdjacentHTML("beforeend", resultItem);
      }
    } else {
      const resultFailure = `<p class="lunr-result-fail alert alert-danger">No results found for <samp class="lunr-search-term">${term}</samp>!</p>`;

      resultRoot.insertAdjacentHTML("beforeend", resultFailure);
    }
  }
  return false;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
    }
  }
}

function parseReturnCode(returnCode) {
  const resultHeadingRoot = document.getElementById(
    "lunr-search-result-heading"
  );
  let resultCode = '';
  if (returnCode == 404) {
    resultCode = `
        <div class="alert alert-danger w-100 rcalert">
          <h1>That page doesn't exist!</h1>
          <h3>You have been redirected to the search page.</h3>
        </div>`;
  }
  resultHeadingRoot.insertAdjacentHTML("beforebegin", resultCode);
}

var searchTerm = getQueryVariable("q");
if (searchTerm) {
  lunr_search(searchTerm);
}

var returnCode = getQueryVariable("code");
if (returnCode) {
  parseReturnCode(returnCode)
}
