import { useReducer } from "react";
import "./index.css";

type State = {
  balance: number;
  loan: number;
  isActive: boolean;
};

type Action =
  | { type: "openAccount" }
  | { type: "deposit"; payload: number }
  | { type: "withdraw"; payload: number }
  | { type: "requestLoan"; payload: number }
  | { type: "payLoan" }
  | { type: "closeAccount" };

const initialState: State = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // reducer function takes current state and return next state
  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "openAccount":
        return { ...state, isActive: true, balance: 500 };
      case "deposit":
        return { ...state, balance: state.balance + action.payload };
      case "withdraw":
        return { ...state, balance: state.balance - action.payload };
      case "requestLoan":
        if (state.loan > 0) return state;
        return { ...state, loan: action.payload };
      case "payLoan":
        return { ...state, loan: 0 };
      case "closeAccount":
        if (state.balance === 0 && state.loan === 0) return { ...initialState };
        return state;
    }
  }

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={state.isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!state.isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!state.isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!state.isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!state.isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!state.isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
};

export default App;
