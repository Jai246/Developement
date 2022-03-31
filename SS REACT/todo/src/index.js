import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

class AddTask extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            taskDesc: ''
        }
    }
    handleTaskTextChange(e)
    {
        this.setState({
            taskDesc: e.target.value
        })
    }

    handleAddTaskClick(){
        this.props.handlerToCollectTaskInfo(this.state.taskDesc);
        this.setState({
            taskDesc: ''
        })
    }

    render(){
        return(
            <form>
                <input type="text" value={this.state.taskDesc} onChange={(e) => this.handleTaskTextChange(e)} />
                <input type="button" value="Add Task" onClick={() => this.handleAddTaskClick()}/>
            </form>
        )
    }
}

class TaskList extends React.Component {

   handleTaskClick(taskDesc){
        this.props.handlerToCollectTaskClickInfo(taskDesc);
   }
   handleDeleteTask(taskDesc){
        this.props.handleDeleteTask(taskDesc);
   }

   render(){
        let list = [];

        for(let i = 0; i < this.props.tasks.length; i++){
            let task = this.props.tasks[i];
            let spanAction;

            if(task.isFinished){
                spanAction = (
                    <div className="actions">
                        <span>{task.desc}</span>
                        <span className="material-icons" onClick={() => this.handleTaskClick(task.desc)}>close</span>
                        <span className="material-icons-outlined" onClick={() => this.handleDeleteTask(task.desc)}>remove_circle_outline</span>
                    </div>
                );
            } 
            else {
                spanAction = (
                    <div className="actions">
                        <span>{task.desc}</span>
                        <span className="material-icons" onClick={() => this.handleTaskClick(task.desc)}>done</span>
                        <span className="material-icons-outlined" onClick={() => this.handleDeleteTask(task.desc)}>remove_circle_outline</span>
                    </div>
                    
                );
            }

            let listItem = (
                <div key={i}>
                    {spanAction}
                </div>
            );
            list.push(listItem);
        }

        return(
            <div className={this.props.forStyling}>
                <div className="list-container">
                    <div className='title'>{this.props.purpose}</div>
                    <div className='content'>
                        {list}
                    </div>
                </div>
            </div>
        )
    }
}

class App extends React.Component 
{
    constructor(props){
        super(props);
        this.state = {
            tasks: [{
                desc : "Jai Bhambri",
                isFinished : false
            }]
        }
    }
    handleNewTask(taskDesc){
        let oldTasks = this.state.tasks.slice();
        // We an do this using spread operator as well
        oldTasks.push({
            desc: taskDesc,
            isFinished: false
        });
        this.setState({
            tasks: oldTasks
        })
    }
    handleTaskStatusUpdate(taskDesc, newStatus){
        let oldTasks = this.state.tasks.slice();
        let taskItem = oldTasks.find(ot => ot.desc == taskDesc);
        taskItem.isFinished = newStatus;

        this.setState({
            tasks: oldTasks
        })
    }

    deleteTask(taskDesc){
        let oldTasks = this.state.tasks;
        let newTasks = [];

        for(let i = 0;i<oldTasks.length;i++)
        {
            console.log(oldTasks[i].desc);
            if(oldTasks[i].desc == taskDesc) continue;
            else newTasks.push(oldTasks[i]);
        }

        // console.log(newTasks);

        this.setState({
            tasks: newTasks
        })
    }
    render(){
       let tasks = this.state.tasks;
       let todoTasks = tasks.filter(t => t.isFinished == false);
       let doneTasks = tasks.filter(t => t.isFinished == true);
       return (
           <>
              <div className="add-task">
                <AddTask handlerToCollectTaskInfo={(taskDesc) => this.handleNewTask(taskDesc)}/>
              </div>
              <div className='task-lists'>
                <TaskList handleDeleteTask={(taskDesc)=> this.deleteTask(taskDesc)} handlerToCollectTaskClickInfo={(taskDesc) => this.handleTaskStatusUpdate(taskDesc, true)} tasks={todoTasks} purpose="Todo" forStyling="todo"/>
                <TaskList handleDeleteTask={(taskDesc)=> this.deleteTask(taskDesc)} handlerToCollectTaskClickInfo={(taskDesc) => this.handleTaskStatusUpdate(taskDesc, false)} tasks={doneTasks} purpose="Finished" forStyling="finished"/>
              </div>
           </>
       );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));