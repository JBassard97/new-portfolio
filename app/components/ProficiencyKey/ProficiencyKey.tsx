import "./ProficiencyKey.css";

const ProficiencyKey = () => {
  const proficiencyLevels = [
    { color: "blue", label: "Excellent" },
    { color: "green", label: "Comfortable" },
    { color: "yellow", label: "Familiar" },
    { color: "orange", label: "Used Once" },
  ];
  return (
    <div className="proficiency-key">
      <p className="proficiency-key-label">Key (Proficiency)</p>
      <div className="color-blocks">
        {proficiencyLevels.map(({ color, label }) => (
          <div key={color} className="key-item">
            <div className="block" style={{ backgroundColor: color }} />
            <span className="label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProficiencyKey;
