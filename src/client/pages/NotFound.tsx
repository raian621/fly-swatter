export default function NotFound() {
  const path = window.location.pathname

  return (
    <>
      <h1><code>'{path}'</code> page not found...</h1>
    </>
  )
}