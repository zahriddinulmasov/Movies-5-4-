const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elSelect = document.querySelector(".genres__select");
const elForm = document.querySelector(".form");
const elWatchTrailer = document.querySelector(".watch-trailer");
const elMoreInfo = document.querySelector(".more-info");
const elBookmarksList = document.querySelector(".bookmarks-list");

let localBookmark = JSON.parse(window.localStorage.getItem("bookmarks"))

const bookmarks = localBookmark || [];

elBookmarksList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark-delete-btn")) {
    const bookmarkDeleteId = evt.target.dataset.bookmarkDeleteId;
    const foundBookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === bookmarkDeleteId
      );

      bookmarks.splice(foundBookmarkIndex, 1);

      elBookmarksList.innerHTML = null;

      window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

      if(bookmarks.length === 0){
        window.localStorage.removeItem("bookmarks")
      }

      renderBookmarks(bookmarks, elBookmarksList);
    }
  });

  const renderBookmarks = function (arr, htmlElement) {
    arr.forEach((bookmark) => {
      const newItem = document.createElement("li");
      const newDeleteBtn = document.createElement("button");

      // ATTRIBUTES:
      newItem.textContent = bookmark.title;
      newDeleteBtn.textContent = "Delete";
      newDeleteBtn.setAttribute(
        "class",
        "bookmark-delete-btn btn btn-danger ms-3 m-2"
        );

        //DATASET:
        newDeleteBtn.dataset.bookmarkDeleteId = bookmark.id;

        htmlElement.appendChild(newItem);
        newItem.appendChild(newDeleteBtn);
      });
    };

    elMovieList.addEventListener("click", function (evt) {
      if (evt.target.matches(".bookmark-btn")) {
        const bookmarkId = evt.target.dataset.bookmarkBtnId;
        const foundBookmark = films.find((film) => film.id === bookmarkId);

        if (!bookmarks.includes(foundBookmark)) {
          bookmarks.push(foundBookmark);
        }

        elBookmarksList.innerHTML = null;

        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

        renderBookmarks(bookmarks, elBookmarksList);
      }
    });

    elResult.textContent = films.length;

    const renderGenres = function (arr) {
      const uniqueGenres = [];

      arr.forEach((film) => {
        film.genres.forEach((genre) => {
          if (!uniqueGenres.includes(genre)) {
            uniqueGenres.push(genre);
          }
        });
      });

      uniqueGenres.forEach((genre) => {
        const genresOption = document.createElement("option");

        genresOption.textContent = genre;
        genresOption.value = genre;

        elSelect.appendChild(genresOption);
      });
    };

    const renderMovies = function (arr, htmlElement) {
      arr.forEach((movie) => {
        //CREATE ELEMENT
        const newLi = document.createElement("li");
        const newImg = document.createElement("img");
        const newDiv = document.createElement("div");
        const newTitle = document.createElement("h5");
        const newLanguage = document.createElement("p");
        const newYear = document.createElement("p");
        const genresList = document.createElement("ul");
        const watchTrailer = document.createElement("button");
        const moreInfo = document.createElement("button");
        const bookmarkBtn = document.createElement("button");

        //SET ATTTIBUTE
        newLi.setAttribute("class", "card mb-3");
        newLi.style.width = "19.5rem";
        newImg.classList.add("card-img-top");
        newImg.setAttribute("src", movie.poster);
        newDiv.classList.add("card-body");
        newTitle.setAttribute("class", "card-title fs-3");
        newLanguage.classList.add("card-text");
        newYear.setAttribute("class", "card-text");
        watchTrailer.setAttribute("class", "btn btn-outline-primary mt-1 m-1");
        moreInfo.setAttribute("class", "btn btn-outline-info mt-1 m-1");
        bookmarkBtn.setAttribute("class", "bookmark-btn btn btn-outline-success mt-1 m-1");

        //TEXT CONTENT:
        newTitle.textContent = movie.title;
        newYear.textContent = movie.year;
        watchTrailer.textContent = "Watch Trailer";
        moreInfo.textContent = "More Info";
        bookmarkBtn.textContent = "Bookmark";

        // DATASET:
        bookmarkBtn.dataset.bookmarkBtnId = movie.id;

        movie.genres.forEach((genre) => {
          const genreItem = document.createElement("li");

          genreItem.textContent = genre;

          genresList.appendChild(genreItem);
        });

        //APPEND
        htmlElement.appendChild(newLi);
        newLi.appendChild(newImg);
        newLi.appendChild(newDiv);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newYear);
        newDiv.appendChild(genresList);
        newDiv.appendChild(watchTrailer);
        newDiv.appendChild(moreInfo);
        newDiv.appendChild(bookmarkBtn);
      });
    };

    renderMovies(films, elMovieList);
    renderGenres(films);

    elForm.addEventListener("submit", function (evt) {
      evt.preventDefault();

      elMovieList.innerHTML = null;

      const selectedGenre = elSelect.value;

      const selectedFilms = [];

      films.forEach((film) => {
        if (selectedGenre === "all" || film.genres.includes(selectedGenre)) {
          selectedFilms.push(film);
        }
      });

      renderMovies(selectedFilms, elMovieList);
    });

    renderBookmarks(localBookmark, elBookmarksList)
