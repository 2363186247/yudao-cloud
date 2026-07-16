import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/SectionCard.jsx";
import { hotWords } from "../mockData.js";

export default function HotWordsCard() {
  const navigate = useNavigate();

  const openWord = (word) => {
    navigate(`/search/info?keyword=${encodeURIComponent(word)}&source=hot-word`);
  };

  return (
    <SectionCard
      title="高频热词"
      className="hot-words-card"
      extra={
        <div className="filter-row">
          <select className="compact-select" defaultValue="all">
            <option value="all">全部领域</option>
            <option value="international">国际</option>
            <option value="domestic">国内</option>
          </select>
          <select className="compact-select" defaultValue="3">
            <option value="3">近三天</option>
            <option value="7">近七天</option>
            <option value="30">近30天</option>
          </select>
        </div>
      }
    >
      <div className="word-cloud">
        {hotWords.map((item) => (
          <button key={item.word} className={`word-cloud-item weight-${item.weight}`} onClick={() => openWord(item.word)}>
            {item.word}
          </button>
        ))}
      </div>
      <button className="link-button" onClick={() => navigate("/search/info?source=hot-word")}>
        查看更多 &gt;
      </button>
    </SectionCard>
  );
}
