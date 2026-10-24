import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { Button, Orb } from "./ui";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <header className="landing-nav"><a href="/" className="brand-link"><span className="brand-mark"><span /><span /><span /></span><span className="brand-word">learning<span>companion</span></span></a>
        <span className="landing-nav-note"><i className="context-dot" /> A school learning layer, built around every student</span>
        <Button variant="quiet" size="small" onClick={() => navigate("/student")}>Open demo <ArrowRight size={15} /></Button>
      </header>
      <main>
        <section className="landing-hero">
          <div className="landing-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A calmer way to learn, together</div>
            <h1>Every student learns differently.<br /><em>Their learning companion should too.</em></h1>
            <p>Thoughtful AI learning support, grounded in the school curriculum and designed to work alongside teachers.</p>
            <div className="landing-actions"><Button onClick={() => navigate("/student")}>Explore the experience <ArrowRight size={16} /></Button><button className="text-button" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>See how it works <ChevronRight size={15} /></button></div>
            <div className="landing-trust"><span className="trust-avatars"><i>A</i><i>S</i><i>P</i></span><span>Made for students, teachers and the people who support them.</span></div>
          </div>
          <div className="landing-art" aria-label="A learning path connects concepts to mastery">
            <div className="art-grain" />
            <svg className="art-connections" viewBox="0 0 600 480" fill="none" aria-hidden="true">
              <path d="M80 260 C150 250 160 105 250 125 S355 310 430 260 S500 110 555 150" />
              <path d="M245 125 C280 210 310 355 400 350 S490 260 550 275" />
              <path d="M80 260 C190 320 235 356 400 350" className="art-dash" />
            </svg>
            <div className="art-star star-a">✳</div><div className="art-star star-b">✦</div><div className="art-star star-c">·</div>
            <div className="art-node art-node-a"><span className="art-node-dot done"><Check size={13} /></span><span><b>Fractions</b><small>Concept understood</small></span></div>
            <div className="art-node art-node-b"><span className="art-node-dot learn"><span /></span><span><b>Linear equations</b><small>Learning together</small></span></div>
            <div className="art-node art-node-c"><span className="art-node-dot next"><Sparkles size={13} /></span><span><b>New connections</b><small>One step at a time</small></span></div>
            <div className="art-progress"><div className="art-ring"><span>72<small>%</small></span></div><div><small>YOUR JOURNEY</small><b>Growing with every try</b></div><TrendingUp size={16} /></div>
            <div className="art-ai"><Orb state="explaining" size="small" /><span><b>A gentle hint</b><small>What should we undo first?</small></span></div>
            <div className="art-label">LEARNING MAP · CLASS 8</div>
          </div>
        </section>
        <section className="landing-proof" id="how-it-works">
          <div className="proof-intro"><div className="eyebrow">A shared learning loop</div><h2>From curriculum<br />to confidence.</h2><p>Every step gives the next person a clearer view of how to help.</p></div>
          <div className="proof-steps">
            {[["01", "A concept becomes a path", "Students follow small, connected ideas from the syllabus.", "A student"], ["02", "A hint opens the door", "The companion asks first, explains next and celebrates understanding.", "An AI companion"], ["03", "Teachers see where to help", "Concept-level signals turn into timely, targeted support.", "A teacher"]].map(([number, title, body, author], i) =>
              <div className="proof-step" key={number}><span className={"proof-number proof-" + i}>{number}</span><div><h3>{title}</h3><p>{body}</p><small>{author} <ArrowRight size={12} /></small></div></div>)}
          </div>
        </section>
        <section className="landing-end"><Orb state="idle" /><div><span className="eyebrow">A companion, not a replacement</span><h2>Better learning happens together.</h2><p>Start with the student view. Then see what teachers, families and school leaders can do with the same learning story.</p></div><Button variant="secondary" onClick={() => navigate("/student")}>Step into the demo <ArrowRight size={15} /></Button></section>
      </main>
      <footer className="landing-footer"><span>learning companion <i>·</i> prototype preview</span><span>Delhi Public School — Demo</span></footer>
    </div>
  );
}
