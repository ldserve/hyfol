document.addEventListener('DOMContentLoaded', function() {
  if (!window.mz) {
    return
  }

  function getWrapper() {
    const wrapper = document.querySelector('.header__search-bar-wrapper')
    return wrapper
  }

  function getInput() {
    const input = document.querySelector('.search-bar input[name="q"]')
    return input
  }

  function onAutocompleteOpen() {
    getWrapper().classList.add('mz-autocomplete-mobile')
  }
  function onAutocompleteClose() {
    getWrapper().classList.remove('mz-autocomplete-mobile')
  }

  if (mz.suggest && mz.suggest.$bus) {
    mz.suggest.$bus.on('autocomplete-open', onAutocompleteOpen)
    mz.suggest.$bus.on('autocomplete-close', onAutocompleteClose)
  }

  const clear = document.querySelector('.search-bar .search-bar__input-clear')
  if (clear) {
    clear.addEventListener('click', function() {
      getInput().value = ''
      getInput().form.submit()
    })
  }

  // inject left arrow
  const parent = document.querySelector('.search-bar__top')
  const bar = document.querySelector('.search-bar__input-wrapper')
  if (bar) {
    const arrow = document.createElement('div')
    arrow.innerHTML =
      '<a href="#" class="mz-autocomplete-close"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z" fill="currentColor"></path></svg></a>'
    parent.insertBefore(arrow, bar)
  }

  const close = document.querySelector('.search-bar .mz-autocomplete-close')
  if (close) {
    close.addEventListener('click', function(e) {
      getInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      e.preventDefault()
    })
  }
})
