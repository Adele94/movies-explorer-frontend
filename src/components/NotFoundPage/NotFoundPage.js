
function NotFoundPage(props) {
  return (
    <main className="notFoundPage">
      <h1 className="notFoundPage__error">404</h1>
      <p className="notFoundPage__text">Страница не найдена</p>
      <button type='button' className="notFoundPage__button-back"> Назад </button>
    </main>
  );
}

export default NotFoundPage;