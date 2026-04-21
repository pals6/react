const NoticePanel = ({ title, message, action }) => {
  return (
    <section className="panel notice-panel">
      <p className="eyebrow">Heads up</p>
      <h2>{title}</h2>
      <p className="muted-copy">{message}</p>
      {action ? <div className="notice-panel__action">{action}</div> : null}
    </section>
  )
}

export default NoticePanel
