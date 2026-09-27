document.addEventListener("DOMContentLoaded", () => {
  const headerInner = document.querySelector(".md-header__inner");
  const searchButton = document.querySelector(".md-header__option, .md-header__source, .md-search");

  if (!headerInner || document.querySelector(".ndb-header-actions")) {
    return;
  }

  const actions = document.createElement("div");
  actions.className = "ndb-header-actions";
  actions.innerHTML = `
    <a class="ndb-header-actions__button" href="https://newdb.net" target="_blank" rel="noopener">
      Вернуться на сайт
    </a>
    <a class="ndb-header-actions__button ndb-header-actions__button--primary" href="https://t.me/newdb_net" target="_blank" rel="noopener">
      Поддержка в Telegram
    </a>
  `;

  if (searchButton && searchButton.parentElement === headerInner) {
    headerInner.insertBefore(actions, searchButton);
  } else {
    headerInner.appendChild(actions);
  }
});
