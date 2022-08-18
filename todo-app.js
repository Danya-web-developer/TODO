(function () {
  let todoArray = []

  function createApptitle(title) {
    let appTitle = document.createElement('h2')
    appTitle.innerHTML = title
    return appTitle
  }

  function createTodoForm() {
    let form = document.createElement('form')
    let input = document.createElement('input')
    let wrapper = document.createElement('div')
    let addButton = document.createElement('button')

    addButton.disabled = true

    input.addEventListener('input', function () {
      if (!input.value) {
        addButton.disabled = true
      } else {
        addButton.disabled = false
      }
    })

    form.classList.add('input-group', 'mb-3')
    input.classList.add('form-control')
    input.placeholder = 'Введите название дела'
    wrapper.classList.add('input-group-append')
    addButton.classList.add('btn', 'btn-primary')
    addButton.textContent = 'Добавить дело'

    wrapper.append(addButton)
    form.append(input, wrapper)

    return {
      form,
      input,
      addButton
    }
  }

  function createTodoList() {
    let list = document.createElement('ul')
    list.classList.add('list-group')
    return list
  }

  function createTodoItem(name) {
    let todoItem = document.createElement('li')
    let btnWrapper = document.createElement('div')
    let doneBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')

    let randomId = Math.random()
    todoItem.id = randomId

    todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    doneBtn.classList.add('btn', 'btn-success')
    deleteBtn.classList.add('btn', 'btn-danger')
    todoItem.textContent = name
    doneBtn.textContent = 'Готово'
    deleteBtn.textContent = 'Удалить'

    btnWrapper.append(doneBtn, deleteBtn)
    todoItem.append(btnWrapper)

    return {
      todoItem,
      doneBtn,
      deleteBtn,
      btnWrapper
    }
  }

  function changeItemDone(arr, item) {
    arr.map(obj => {
      if (obj.id === item.id && obj.done === false) {
        obj.done = true
      } else if (obj.id === item.id && obj.done === true) {
        obj.done = false
      }
    })
  }

  function completeTodoItem(item, btn) {
    btn.addEventListener('click', function () {
      todoArray = JSON.parse(localStorage.getItem(key))
      item.classList.toggle('list-group-item-success')
      changeItemDone(todoArray, item)
      localStorage.setItem(key, JSON.stringify(todoArray))
    })
  }

  function deleteTodoItem(item, btn) {
    btn.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        todoArray = JSON.parse(localStorage.getItem(key))
        let newList = todoArray.filter(obj => obj.id !== item.id)
        localStorage.setItem(key, JSON.stringify(newList))
        item.remove()
      }
    })
  }

  function createTodoApp(container, title = 'Список дел', key) {
    let appTitle = createApptitle(title)
    let appForm = createTodoForm()
    let appList = createTodoList()

    container.append(appTitle, appForm.form, appList)

    if (localStorage.getItem(key)) {
      todoArray = JSON.parse(localStorage.getItem(key))

      for (let obj of todoArray) {
        let todoItem = createTodoItem(appForm.input.value)

        todoItem.todoItem.textContent = obj.name
        todoItem.todoItem.id = obj.id

        if (obj.done == true) {
          todoItem.todoItem.classList.add('list-group-item-success')
        } else {
          todoItem.todoItem.classList.remove('list-group-item-success')
        }

        completeTodoItem(todoItem.todoItem, todoItem.doneBtn)
        deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn)

        appList.append(todoItem.todoItem)
        todoItem.todoItem.append(todoItem.btnWrapper)
      }
    }

    appForm.form.addEventListener('submit', function (e) {
      e.preventDefault()

      let todoItem = createTodoItem(appForm.input.value)

      if (!appForm.input.value) {
        return
      }

      appList.append(todoItem.todoItem)

      completeTodoItem(todoItem.todoItem, todoItem.doneBtn)
      deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn)

      let localStorageDate = localStorage.getItem(key)

      if (localStorageDate == null) {
        todoArray = []
      } else {
        todoArray = JSON.parse(localStorageDate)
      }

      function createItemObj(arr) {
        let itemObj = {}
        itemObj.id = todoItem.todoItem.id
        itemObj.name = appForm.input.value
        itemObj.done = false

        arr.push(itemObj)
      }
      createItemObj(todoArray)

      localStorage.setItem(key, JSON.stringify(todoArray))

      appForm.input.value = ''
      appForm.addButton.disabled = true
    })
  }
  window.createTodoApp = createTodoApp
})()