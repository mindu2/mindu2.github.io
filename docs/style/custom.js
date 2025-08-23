document$.subscribe(() => {
  const siteNameSpan = document.querySelector('.md-header__title .md-header__topic:not([data-md-component]) .md-ellipsis');
  if (siteNameSpan) {
    siteNameSpan.style.cursor = 'pointer';
    siteNameSpan.addEventListener('click', () => {
      window.location.href = document.querySelector('.md-logo').href;
    });
  }
});