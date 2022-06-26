import SkillDetail from './SkillDetail';

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2>What I Do</h2>
        <div className="skill-list">
          <SkillDetail title="System Design">
            <p>
              I plan and build systems that leverage a variety of technologies. I have experience
              working with monoliths, microservice architecture, and systems in various states in
              between. I&apos;ve also worked extensively with asynchronous systems and messaging.
            </p>
          </SkillDetail>
          <SkillDetail title="Backend Development">
            <p>
              I build applications and web services in many different languages, including Go, Java,
              TypeScript/JavaScript, Python, Ruby, and C#.
            </p>
          </SkillDetail>
          <SkillDetail title="Embedded Development">
            <p>
              I&apos;ve written embedded applications for IoT in C++ and Java. I&apos;ve been
              experimenting with Rust for this as well.
            </p>
          </SkillDetail>
          <SkillDetail title="Frontend Development">
            <p>
              While not something I specialize in these days, I know my way around frontend
              development because it is how I got my start in the industry. I try to keep up with
              what&apos;s going on in this world.
            </p>
          </SkillDetail>
          <SkillDetail title="DevOps Practices">
            <p>
              Implementing practices such as CI/CD and Infrastructure as Code is second nature to
              me. If there is a process that can be automated, I will automate it.
            </p>
          </SkillDetail>
          <SkillDetail title="Cloud Infrastructure">
            <p>
              I&apos;ve worked with Amazon Web Services and Google Cloud Platform in depth. I work
              with technologies such as Docker, Kubernetes, and cloud native applications on a
              regular basis.
            </p>
          </SkillDetail>
        </div>
      </div>
    </section>
  );
}
