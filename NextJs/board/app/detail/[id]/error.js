'use client'

export default function Error({error, reset}) {
  return(
    <div>
      <h4>Error</h4>
      <button onClick={() => { reset() }}>btn</button>
    </div>
  )
}