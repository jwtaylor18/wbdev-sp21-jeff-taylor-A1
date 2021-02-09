(function () {
    var users = [
        {id: 123, username: 'alice', firstName: 'Alice'},
        {id: 456, username: 'bob', firstName: 'Bob'},
        {id: 789, username: 'charlie', firstName: 'Charlie'},
        {id: 101112, username: 'dan', firstName: 'Dan'}
    ]

    var rowTemplate
    var tbody
    var createIcon
    var userService = new AdminUserServiceClient()
    var $username
    var $password
    var $firstName
    var $lastName
    var $role

    jQuery(main)




    function main() {
        rowTemplate = jQuery('.wbdv-template')
        tbody = jQuery('tbody')
        $username = $("#usernameFld")
        $password = $("#passwordFld")
        $firstName = $("#firstNameFld")
        $lastName = $("#lastNameFld")
        $role = $("#roleFld")
        users = userService.findAllUsers().then(function (actualUsers){
            users = actualUsers
            renderUsers(users)
        })
        enableCreate()
    }

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
        })
    }

    function renderUsers(users) {
        tbody.empty()
        for(var u in users) {
            const user = users[u]
            const rowClone = rowTemplate.clone()
            rowClone.removeClass('wbdev-hidden')
            rowClone.find('.wbdv-username').html(user.username)
            rowClone.find('.wbdv-first-name').html(user.firstName)
            rowClone.find('.wbdv-edit').attr('id', user._id)
            tbody.append(rowClone)
        }
        $(".wbdv-edit").click(selectUser)
    }

    function enableCreate() {
        createIcon = $(".wbdv-create")
        createIcon.click(function () {
            var newUser = {
                username: $username.val(),
                password: $password.val(),
                firstName: $firstName.val(),
                lastName: $lastName.val(),
                role: $role.val()
            }

            userService.createUser(newUser).then(function (actualUser){
                users.push(newUser)
                renderUsers(users)
            })
        })
    }
})()