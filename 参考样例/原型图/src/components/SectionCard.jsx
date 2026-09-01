export default function SectionCard({ title, extra, children, className = "" }) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-head">
        <h2>{title}</h2>
        {extra ? <div className="section-extra">{extra}</div> : null}
      </div>
      {children}
    </section>
  );
}
