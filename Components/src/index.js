import React, {Component} from 'react'
import ReactDOM from 'react-dom'

let skiData = 
{
  total: 50,
  powder: 20,
  backcountry: 10,
  goal: 100
}

class SkiDayCounter extends Component
{
  getPercent = decimal =>
  {
    return decimal * 100 + "%"
  }

  calcGoalProgress = (total, goal) =>
  {
    return this.getPercent(total/goal)
  }
  render(){
    const {total, powder, backcountry, goal} = this.props
    return(
      <section>
        <div>
          {/*Now we dont need the this.props.total (btw, this is how comments works*/}

          <p>Total Days: {total}</p>
        </div>
        <div>
          <p>Powder Days: {powder} </p>
        </div>
        <div>
          <p>Backcountry Days: {backcountry}</p>
        </div>
        <div>
          <p>Goal progress: {this.calcGoalProgress(total, goal)}</p>
        </div>
      </section>

    )
  }
}

class Message extends Component
{
  render()
  {
    return(
      <div>
        <h1 style = {{color: this.props.color}}>
          {this.props.msg}</h1>
          <p>Ok, this might look weird, but it's a first try in React. Let's be positive and see how it works.</p>
      </div>
    )
  }
}

ReactDOM.render(<Message minutes = {5} color = "purple" msg = "Ski Days" />,
  document.getElementById('root')
)

ReactDOM.render(<SkiDayCounter 
total = {skiData.total}
powder = {skiData.powder}
backcountry = {skiData.backcountry}
goal = {skiData.goal}
/>,
  document.getElementById('scdroot')
)