function LoginInput({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  error,
}) {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          value={email}
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default LoginInput;
