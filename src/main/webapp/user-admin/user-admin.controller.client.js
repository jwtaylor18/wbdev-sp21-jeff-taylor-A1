(function () {
  const users = [
    {id: 123, username: 'alice', firstName: 'Alice'},
    {id: 456, username: 'bob', firstName: 'Bob'},
    {id: 789, username: 'charlie', firstName: 'Charlie'},
    {id: 101112, username: 'dan', firstName: 'Dan'}
  ]

  var rowTemplate
  var tbody

  jQuery(main)

  function main() {
    rowTemplate = jQuery('.wbdv-template')
    tbody = jQuery('tbody')
    renderUsers(users)
    alert("finished rendering users")
  }

  function renderUsers(users) {
    for(var u in users) {
      const user = users[u]
      const rowClone = rowTemplate.clone()
      rowClone.removeClass('wbdev-hidden')
      rowClone.find('.wbdv-username').html(user.username)
      rowClone.find('.wbdv-first-name').html(user.firstName)
      tbody.append(rowClone)
    }
  }

})()