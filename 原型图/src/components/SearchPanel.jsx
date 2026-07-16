import { Search } from "lucide-react";

export default function SearchPanel({ fields = ["关键词", "对象类型", "风险等级"], placeholder = "请输入关键词、证件号、事件编号" }) {
  return (
    <section className="search-panel">
      <div className="search-input">
        <Search size={18} />
        <input placeholder={placeholder} />
      </div>
      {fields.map((field) => (
        <select key={field} defaultValue="">
          <option value="">{field}</option>
          <option>全部</option>
          <option>重点关注</option>
          <option>待研判</option>
        </select>
      ))}
      <button className="btn primary">查询</button>
      <button className="btn ghost">重置</button>
    </section>
  );
}
