import { useState } from "react";
import "./App.css";

function Icon({ type, size = 18 }) {
  const paths = {
    mail: (
      <>
        <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
        <path d="m3.5 6 8.5 6.5L20.5 6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V5.5L13 3v18M13 8h7v13M7.5 8h1M7.5 12h1M7.5 16h1M16 12h1M16 16h1M10 21v-3h3v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    "eye-off": (
      <>
        <path d="m3 3 18 18M10.6 6.2A9.5 9.5 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3.1 3.5M6.2 6.9C3.9 8.5 2.5 12 2.5 12s3.5 6 9.5 6c1 0 1.9-.2 2.7-.5M9.8 9.8a3 3 0 0 0 4.4 4.4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5.5c0 4.8-3.4 8.1-8 9.5-4.6-1.4-8-4.7-8-9.5V6l8-3Z" />
        <path d="m8.5 12 2.3 2.3 4.8-4.8" />
      </>
    ),
    arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[type]}
    </svg>
  );
}

function App() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const isRegister = mode === "register";

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setNotice("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));

    if (isRegister && values.password !== values.confirmPassword) {
      setNotice("Passwords do not match. Please check them once.");
      return;
    }

    setNotice(
      isRegister
        ? "Registration form captured. Backend account creation comes next."
        : "Sign-in form captured. Backend authentication comes next.",
    );
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark">
            <svg aria-hidden="true" fill="none" viewBox="0 0 32 32">
              <path d="M7 22.5 16 6l9 16.5" />
              <path d="M10.5 18h11M8.5 23h15" />
              <circle cx="16" cy="6" r="2" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>LandLens</strong>
            <small>LAND INTELLIGENCE</small>
          </span>
        </a>
        <div className="topbar-status">
          <span className="status-dot" /> Secure workspace
        </div>
      </header>

      <main className="auth-layout">
        <section className="story-panel" aria-labelledby="story-title">
          <div className="story-badge">
            <span className="badge-dot" /> Smart India Hackathon · SIH26019
          </div>
          <h1 id="story-title">
            See the land.
            <br />
            <em>Understand the change.</em>
          </h1>
          <p className="story-copy">
            One intelligent workspace for research, policy and geospatial insight—built to turn
            complex land data into clearer decisions.
          </p>

          <div className="insight-card">
            <div className="insight-heading">
              <span>LIVE INSIGHT</span>
              <span className="trend">↗ 12.8%</span>
            </div>
            <h2>Urban land transition</h2>
            <div className="map-visual" aria-label="Abstract land transition map" role="img">
              <svg fill="none" viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg">
                <path className="map-line map-line-one" d="M-20 133C56 96 83 151 153 116s105-66 175-24 91 66 157 39 78-68 143-76" />
                <path className="map-line map-line-two" d="M-15 160c80-31 119-5 175-44s96-84 164-63 90 56 141 31 79-63 150-55" />
                <path className="map-line map-line-three" d="M-20 80c71 39 114 24 169 41s98 42 164 10 89-65 151-40 78 51 150 28" />
                <circle className="map-point point-one" cx="154" cy="116" r="5" />
                <circle className="map-point point-two" cx="328" cy="92" r="5" />
                <circle className="map-point point-three" cx="485" cy="130" r="5" />
              </svg>
            </div>
            <div className="insight-footer">
              <span><i className="mini-pin" /> Maharashtra pilot region</span>
              <span>Updated just now</span>
            </div>
          </div>

          <div className="story-stats">
            <div className="story-stat">
              <strong>01</strong>
              <span>Unified<br />knowledge space</span>
            </div>
            <div className="story-stat">
              <strong>AI</strong>
              <span>Research<br />intelligence</span>
            </div>
            <div className="story-stat">
              <strong>GIS</strong>
              <span>Evidence-led<br />mapping</span>
            </div>
          </div>
        </section>

        <section className="form-panel" aria-labelledby="auth-title">
          <div className="form-heading">
            <p className="eyebrow">WELCOME TO LANDLENS</p>
            <h2 id="auth-title">{isRegister ? "Create your workspace" : "Welcome back"}</h2>
            <p>
              {isRegister
                ? "Start turning land data into meaningful insight."
                : "Sign in to continue your land intelligence journey."}
            </p>
          </div>

          <div className="mode-switch" role="tablist" aria-label="Authentication mode">
            <button
              aria-selected={!isRegister}
              className={!isRegister ? "mode-button active" : "mode-button"}
              onClick={() => changeMode("login")}
              role="tab"
              type="button"
            >
              Sign in
            </button>
            <button
              aria-selected={isRegister}
              className={isRegister ? "mode-button active" : "mode-button"}
              onClick={() => changeMode("register")}
              role="tab"
              type="button"
            >
              Create account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="field-grid">
                <label className="field">
                  <span>Full name</span>
                  <div className="input-wrap">
                    <Icon type="user" />
                    <input autoComplete="name" name="fullName" placeholder="Your full name" required type="text" />
                  </div>
                </label>
                <label className="field">
                  <span>Account role</span>
                  <div className="input-wrap select-wrap">
                    <Icon type="building" />
                    <select defaultValue="" name="role" required>
                      <option disabled value="">Select your role</option>
                      <option value="researcher">Researcher</option>
                      <option value="institution">Academic institution</option>
                      <option value="government">Government officer</option>
                      <option value="public">Public user</option>
                    </select>
                  </div>
                </label>
              </div>
            )}

            <label className="field">
              <span>Work email</span>
              <div className="input-wrap">
                <Icon type="mail" />
                <input autoComplete="email" name="email" placeholder="you@organisation.com" required type="email" />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <Icon type="lock" />
                <input
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  <Icon type={showPassword ? "eye-off" : "eye"} />
                </button>
              </div>
            </label>

            {isRegister && (
              <label className="field">
                <span>Confirm password</span>
                <div className="input-wrap">
                  <Icon type="lock" />
                  <input
                    autoComplete="new-password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    type="button"
                  >
                    <Icon type={showConfirmPassword ? "eye-off" : "eye"} />
                  </button>
                </div>
              </label>
            )}

            {!isRegister ? (
              <div className="helper-row">
                <label className="check-label">
                  <input name="remember" type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
                <button
                  className="text-button"
                  onClick={() => setNotice("Password recovery will be connected in the next backend milestone.")}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <label className="check-label terms-label">
                <input name="terms" required type="checkbox" />
                <span>I agree to the LandLens terms and data-use policy.</span>
              </label>
            )}

            <button className="primary-button" type="submit">
              <span>{isRegister ? "Create secure account" : "Sign in to LandLens"}</span>
              <Icon type="arrow" size={19} />
            </button>

            {notice && <p aria-live="polite" className="form-notice" role="status">{notice}</p>}
          </form>

          <p className="security-note">
            <Icon type="shield" size={17} />
            Your workspace is protected with role-based access.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 LandLens AI</span>
        <span>Research · Policy · Land intelligence</span>
      </footer>
    </div>
  );
}

export default App;
