const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load tasks from /api/tasks
const showDetails = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { details },
    } = await axios.get('/api/v1/details')
    if (details.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No Student in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allDetails = details
      .map((task) => {
        const { name, _id: id, sex,dob,department,type } = detail
        return `<thead>
<tr>
  <th scope="col">#</th>
  <th scope="col">Name</th>
  <th scope="col">Sex</th>
  <th scope="col">Date of Birth</th>
  <th scope="col">Department</th>
  <th scope="col">Student Type</th>
  <th scope="col">Action</th>
</tr>
</thead>

<tbody>
<tr>
  <th scope="row">1</th>
  <td>Mark</td>
  <td>Male</td>
  <td>20-04-2003</td>
  <td>Mass-Com</td>
  <td>New Student</td>
  <td><div class="task-links">

        <!-- edit link -->
        <a href="detail.html?student-id=${id}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${id}">
        <i class="fas fa-trash"></i>
        </button>
        </div>
  </td>
  </tr>
  </tbody>`

      })
      .join('')
    tasksDOM.innerHTML = allDetails
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showDetails()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post('/api/v1/tasks', { name })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
