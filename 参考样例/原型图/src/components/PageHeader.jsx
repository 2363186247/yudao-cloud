export default function PageHeader({ moduleTitle, pageTitle, description }) {
  return (
    <div className="page-header">
      <div>
        <div className="breadcrumb">
          首页 / {moduleTitle} / <span>{pageTitle}</span>
        </div>
        <h1>{pageTitle}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="page-actions">
        <button className="btn ghost">导出</button>
        <button className="btn primary">新建任务</button>
      </div>
    </div>
  );
}
