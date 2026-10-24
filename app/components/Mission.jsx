export default function Mission() {
  return (
    <section className="mission-section">
      <div className="mission-inner">
        <div className="mission-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/robert-network-research-coin.png"
            alt="Gold Robert Network Research coin emblem"
            className="mission-image"
          />
        </div>
        <div className="mission-content">
          <p className="mission-kicker">Our Mission</p>
          <h2 className="mission-heading">
            Research For
            <br />The Network.
          </h2>
        </div>
        <div className="mission-description">
          <p>
            Robert Network Research brings World Liberty Token information,
            ecosystem research, and project updates into one place—so the
            community can explore the network with greater clarity.
          </p>
        </div>
      </div>
    </section>
  );
}
