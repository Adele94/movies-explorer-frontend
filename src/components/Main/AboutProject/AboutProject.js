function AboutProject(props) {
  return (
    <section className="aboutProject" id="aboutProject">
      <h1 className="aboutProject__title">О проекте</h1>
      <div className="aboutProject__grid">
        <div className="aboutProject__content">
          <h2 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h2>
          <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="aboutProject__content">
          <h2 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h2>
          <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="aboutProject__scale">
        <p className="aboutProject__scale__text-black">1 неделя</p>
        <p className="aboutProject__scale__text-white">4 недели</p>
      </div>
      <div className="aboutProject__scale-text">
        <p className="aboutProject__scale-text__grey">Back-end</p>
        <p className="aboutProject__scale-text__grey">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;