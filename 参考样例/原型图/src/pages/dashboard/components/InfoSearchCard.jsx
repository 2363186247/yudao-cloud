import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard.jsx";
import { hotSearches } from "../mockData.js";

export default function InfoSearchCard() {
  const navigate = useNavigate();
  const [scope, setScope] = useState("仅搜领域");
  const [keyword, setKeyword] = useState("");
  const [timeRange, setTimeRange] = useState("近三天");

  const submitSearch = (nextKeyword = keyword) => {
    const params = new URLSearchParams({
      keyword: nextKeyword,
      timeRange,
      scope,
    });
    navigate(`/search/info?${params.toString()}`);
  };

  return (
    <SectionCard title="信息搜索" className="info-search-card">
      <div className="dashboard-search-line">
        <select value={scope} onChange={(event) => setScope(event.target.value)}>
          <option>仅搜领域</option>
          <option>全库搜索</option>
          <option>关注目标</option>
        </select>
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="请输入关键词或关键词组合" />
        <button className="btn primary" onClick={() => submitSearch()}>
          搜索
        </button>
      </div>
      <div className="form-row">
        <span>时间范围：</span>
        <select value={timeRange} onChange={(event) => setTimeRange(event.target.value)}>
          <option>近三天</option>
          <option>近七天</option>
          <option>近30天</option>
          <option>自定义</option>
        </select>
      </div>
      <div className="hot-search-row">
        <span>热门搜索：</span>
        <div>
          {hotSearches.map((word) => (
            <button key={word} className="soft-tag" onClick={() => submitSearch(word)}>
              {word}
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
