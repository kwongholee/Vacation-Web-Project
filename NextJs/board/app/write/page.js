export default function Write() {
  return (
    <div>
      <h4>Write</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="title" /><br/>
        <input name="content" placeholder="content" /><br/>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}