import SkillDetail from './SkillDetail';

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2>What I Do</h2>
        <div className="skill-list">
          <SkillDetail title="System Design">
            <p>Text here</p>
          </SkillDetail>
          <SkillDetail title="Backend Development">
            <p>Text here</p>
          </SkillDetail>
          <SkillDetail title="DevOps Practices">
            <p>Text here</p>
          </SkillDetail>
          <SkillDetail title="Cloud Infrastructure">
            <p>Text here</p>
          </SkillDetail>
        </div>
      </div>
    </section>
  );
}
