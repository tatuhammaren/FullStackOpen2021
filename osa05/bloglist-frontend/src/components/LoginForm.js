import React from "react";


const LoginForm = ({username, setUsername, password, setPassword, handeLogin}) => 
(
    <div>
    <h2>Log in to application</h2>
  
    <form onSubmit={handeLogin}>
    <div>
      username <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit"> Loggaa sissään </button>
  </form>
  </div>
)


export default LoginForm