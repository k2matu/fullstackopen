// component 
const Hello = ({name, age}) => {
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
    </div>
  )
}

const App = () => {
  
  // array1
  const t = [1, -1, 3]

  t.push(5) // adds value to t array

  console.log(t.length) // 4 is printed
  console.log(t[1])     // -1 is printed

  t.forEach(value => {
    console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
  })
  
  const t2 = t.concat(5) // same result as push but makes copy of t array
  t2.forEach(value => {
    console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
  })
  
  
  const name = 'Peter'
  const age = 10
  
  // npm start
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  )
}

export default App;
