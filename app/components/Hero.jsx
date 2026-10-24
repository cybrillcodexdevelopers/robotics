export default function Hero() {
  return (
    <section className="home-hero">
      <div className="container-fluid">
        <div className="row main-hero-section">
          <div className="col-md-6 hero-text">
            <div className="hero-text-area">
              <div className="hero-subtitle">Robert Network Research</div>
              <div className="hero-title">
                Research. <br />
                Insight. <br />
                Network.
              </div>
              <div className="hero-description">
                Explore research, token insights, and ecosystem updates around
                World Liberty Token.
                <br />
                Clear information for a changing digital asset landscape.
              </div>
              <div className="hero-btns">
                <a className="colored-button" href="/echosystem">
                  Explore the ecosystem <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="bordered-button" href="/tokenomics">
                  Explore WLT research
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 hero-video">
            <div className="hero-image-coin">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="hero-video-element"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="World Liberty Token hero animation"
              >
                <source src="/images/wlt-hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
