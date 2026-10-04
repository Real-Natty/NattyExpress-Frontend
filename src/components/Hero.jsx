function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div>
          <p className="hero-small">WELCOME TO NATTYEXPRESS</p>

          <h1>
            Your favourite gadgets,
            <br />
            delivered to you.
          </h1>

          <p className="hero-text">
            Shop smartphones, laptops, headphones, smartwatches and other
            quality gadgets at great prices.
          </p>

          <button className="hero-button">Shop Now</button>
        </div>

        <div className="hero-card">
          <div className="hero-circle">📱</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
