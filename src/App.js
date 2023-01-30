import React, { useState, useEffect } from "react"
import "./App.css"
import Alert from "./components/Alert"
import List from "./components/List"

//stpe: last-2
const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return []
  }
}
function App() {
  const [name, setName] = useState("")
  //const [list, setList] = useState([])
  //stpe: last-2
  const [list, setList] = useState(getLocalStorage())
  const [update, setupdate] = useState(false)
  const [edit, setEdit] = useState(null)
  const [alert, setAlert] = useState({ show: true, msg: "", type: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // display alert
      //step2:
      //setAlert({ show: true, msg: "Please enter value", type: "danger" })
      showAlert(true, "danger", "Please enter value")
    } else if (name && edit) {
      //deal with edit
      //stpe: second last
      setList(
        list.map((item) => {
          if (item.id === edit) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName("")
      setEdit(null)
      setupdate(false)
      showAlert(true, "success", "value change")
    } else {
      // show alert
      showAlert(true, "success", "item added to the list")

      //step1:
      const newItems = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItems])
      setName("")
    }
  }

  //step3:
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show: show, type, msg })
  }

  const clearList = () => {
    showAlert(true, "danger", "empty list")
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed")
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setupdate(true)
    setEdit(id)
    setName(specificItem.title)
  }
  //stpe: last-1
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])
  return (
    <>
      <main>
        <section>
          <div className='heading'>
            <h1>To Do List</h1>
          </div>
          <form action='' onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

            <div className='input'>
              <input type='text' placeholder='Add an items...' value={name} onChange={(e) => setName(e.target.value)} />
              <button type='submit'>{edit ? "edit" : "submit"}</button>
            </div>
          </form>
          {list.length > 0 && (
            <article>
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className='clear' onClick={clearList}>
                Clear items
              </button>
            </article>
          )}
        </section>
      </main>
    </>
  )
}

export default App
