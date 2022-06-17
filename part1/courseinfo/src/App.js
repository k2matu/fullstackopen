// Header
const Header = (props) => {
  return (
    <h1>{props.nameOfCourse}</h1>
  )
}

// Content
const Content = (props) => {
  return (
    <div>
      <Part p={props.parts[0]}/>
      <Part p={props.parts[1]}/>
      <Part p={props.parts[2]}/>
    </div>
  )
}
// Part 
const Part = (props) => {
  return (
    <div>
      <p>{props.p.name} {props.p.exercises}</p>
    </div>
  )
}
// Total
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


// main
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header nameOfCourse={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App