import "./CommitKey.css";

const CommitKey = () => {
  const commitLevels = [
    { color: "#161b21", label: "0" },
    { color: "#006e30", label: "1-5" },
    { color: "#25a642", label: "6-10" },
    { color: "#32d553", label: "10+" },
  ];

  return (
    <div className="commit-key">
      <p className="commit-key-label">Key (Commits)</p>
      <div className="color-blocks">
        {commitLevels.map(({ color, label }) => (
          <div key={color} className="key-item">
            <div className="block" style={{ backgroundColor: color }} />
            <span className="label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitKey;
