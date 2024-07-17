function SearchPage({ routeParams }) {
  return (
    <>
      <h1>Buscador</h1>
      <h2>Estas buscando sobre {routeParams.query}</h2>
    </>
  )
}

export default SearchPage