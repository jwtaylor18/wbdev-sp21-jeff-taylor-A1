<<<<<<< HEAD
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
=======
var users = []

var rowTemplate
var tbody
var userService = new AdminUserServiceClient()
var $username
var $password
var $firstName
var $lastName
var $role

var selectedUser = null
function selectUser(event) {
    var id = $(event.target).attr("id")
    selectedUser = users.find(user => user._id === id)
    $username.val(selectedUser.username)
    $firstName.val(selectedUser.firstName)
    $lastName.val(selectedUser.lastName)
    $role.val(selectedUser.role)
}

function updateUser(){

    if (selectedUser === null) {
        alert("Select a user before updating")
    }
    else {
        selectedUser.username = $username.val()
        selectedUser.password = $password.val()
        selectedUser.firstName = $firstName.val()
        selectedUser.lastName = $lastName.val()
        selectedUser.role = $role.val()
        userService.updateUser(selectedUser._id, selectedUser)
            .then(status => {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
                clearInputFields()
            })
    }
}

function renderUsers(users) {
    tbody.empty()
    for(var i=0; i<users.length; i++) {
        const user = users[i]
        const rowClone = rowTemplate.clone()
        rowClone.removeClass('wbdev-hidden')
        rowClone.find('.wbdv-username').html(user.username)
        rowClone.find('.wbdv-first-name').html(user.firstName)
        rowClone.find('.wbdv-last-name').html(user.lastName)
        rowClone.find('.wbdv-role').html(user.role)
        rowClone.find('.wbdv-edit').attr('id', user._id)
        rowClone.find('.wbdv-remove').attr('id', i)
        tbody.append(rowClone)
    }
    $(".wbdv-edit").click(selectUser)
    $(".wbdv-remove").click(deleteUser)
}

function createUser() {
    var newUser = {
        username: $username.val(),
        password: $password.val(),
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        role: $role.val()
    }
    console.log("running create user")
    userService.createUser(newUser).then(function (actualUser){
        users.push(newUser)
        renderUsers(users)
        clearInputFields()
    })
}

function deleteUser(event) {
    var button = $(event.target)
    var index = button.attr("id")
    var id = users[index]._id
    userService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}

function clearInputFields() {
    $username.val('')
    $password.val('')
    $firstName.val('')
    $lastName.val('')
    selectedUser = null
}

function main() {
    rowTemplate = jQuery('.wbdv-template')
    tbody = jQuery('tbody')
    $username = $("#usernameFld")
    $password = $("#passwordFld")
    $firstName = $("#firstNameFld")
    $lastName = $("#lastNameFld")
    $role = $("#roleFld")
    $(".wbdv-update").click(updateUser)
    $(".wbdv-create").click(createUser)
    users = userService.findAllUsers().then(function (actualUsers){
        users = actualUsers
        renderUsers(users)
    })
}

jQuery(main)
>>>>>>> fff7620d17562369cb9daa28c305de0d724bcfe1
