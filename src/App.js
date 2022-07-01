import React from 'react';
import Header from './components/Header/Header';
import pen from './assets/icons/pen-to-square-solid.svg';
import deleteIcon from './assets/images/Trash.png';
import clarifyDrag from './assets/images/clarity_drag-handle-line.png';
import List from './components/List/List';

function App() {
  const [tasks,setTasks] = React.useState([]);
  const [inputText, setText] = React.useState('');
  const [msgError,setMsgError] = React.useState('');
  
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);


  React.useEffect(() => {
    const setLocalTask = () => {
      if(tasks.length > 0){
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
    setLocalTask();
  },[tasks])

  React.useEffect(() => {
    const getLocalTasks = () => {
      if(localStorage.getItem("tasks") === null){
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }else {
        let localTask = JSON.parse(localStorage.getItem('tasks'));
        setTasks(localTask);
      }
    }
    getLocalTasks();
  }, []);

  const handleClick = () => {
    
    if(inputText !== ''){

      setTasks([
        ...tasks,
        {
          text: inputText,
          id: (Math.random() * 1000),
        }
      ])
      setText('');
      setMsgError('');
    }else {
      setMsgError('Campo é obrigatório, por favor preencha o campo.');
    } 
  }

  const onUpdateItems = (e,id) => {
    const button = e.target.parentNode;
    button.hidden = true;
    const saveAndUpdate = {
      edit(){
        const mainCard = e.target.parentNode.parentNode.parentNode;
        const div = mainCard.firstElementChild;
        const h3 = div.lastElementChild;
        const input = document.createElement('input');

        input.className = 'input_update_text';
        input.type = 'text';
        input.value = h3.textContent;
        div.insertBefore(input,h3);
        div.removeChild(h3);
      },
    }

    function save(e){   
      if(e.target.tagName === 'INPUT'){ 
        if(e.key === 'Enter'){ 
          const input = e.target;
          const div = input.parentNode;
          const h3 = document.createElement('h3');

          h3.className = 'mt-0 mb-0 card__headline_title';
          h3.textContent = input.value;
          div.insertBefore(h3,input);
          div.removeChild(input);
          button.hidden = false;
          window.removeEventListener('keydown', save);
        }
      }
    }
    
    if(id){
      saveAndUpdate.edit();
      window.addEventListener('keydown', save);
    }
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const onHandleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const onHandleSortable = () => {
    // duplicate tasks 
    let _tasks = [...tasks];

    // save and remove 
    let draggedItemContent = _tasks.splice(dragItem.current,1)[0]; 

    // Choosen position
    _tasks.splice(dragOverItem.current,0,draggedItemContent);

    // reset 
    dragItem.current = null;
    dragOverItem.current = null;

    // Update actual datas
    setTasks(_tasks);
  }

  return (

    <div className="App">
      <Header />
      <div className="container">
          <input value={inputText} className="form-control inputTask" onChange={(handleChange)} type="text" placeholder="Qual lista você deseja criar?" />
          <label className="label-plus" onClick={handleClick}></label>
          <small style={{color: '#e74c3c'}}>{msgError}</small>
      </div>
      <div className="main-card container">
            {tasks && tasks.map((task,index) => (
              <div 
                key={task.id} 
                className="card" 
                draggable
                onDragStart={() => dragItem.current = index}
                onDragEnter={() => dragOverItem.current = index}
                onDragEnd={onHandleSortable}  
              >
                  <div className="card__headline">
                      <div className="card__headline_item_1">
                          <img src={clarifyDrag} alt={clarifyDrag} style={{heigth: '20px'}}/>
                          <h3 className="mt-0 mb-0 card__headline_title">{task.text}</h3>
                      </div>
                      <div className='card__trash'>
                          <button className='edit_button' onClick={(e) => onUpdateItems(e,task.id)}><img src={pen} alt={task.text} style={{width: '17px',height: '17px',position: 'relative', top: '7px',marginRight: '10px'}}/></button>
                          <span onClick={() => onHandleDelete(task.id)}><img className="card__headline_trash" src={deleteIcon} alt={deleteIcon} /></span>
                      </div>
                  </div>
                  <div className="card_input_sub_items">                    
                    <List tasks={tasks} indexElement={index} id={task.id} />
                  </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
