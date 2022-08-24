import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import React from "react";

import { render } from "test-helpers/index";

import AuthContext, { AuthProvider, useAuthUser } from "./AuthContext";

const mockedPush = jest.fn();

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockedPush,
  })),
}));

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const FAKE_USER_LOGIN = {
  name: "santi",
  document: 12345567,
  id: 1,
  accountNumber: "12312323-123123",
};

const TestComponent = () => {
  const { authUser, login, logout } = React.useContext(AuthContext);

  return (
    <div>
      {authUser.isAuthenticated ? (
        <div role="user">{authUser?.name}</div>
      ) : (
        <h1>not authenticated</h1>
      )}
      <button onClick={logout}>logout</button>
      <button onClick={() => login(FAKE_USER_LOGIN)}>login</button>
    </div>
  );
};

describe("useAuthUser hook", () => {
  const TestComponentUsingHook = () => {
    const auth = useAuthUser();

    return (
      <div>
        {auth.authUser.isAuthenticated ? (
          <div role="user">{auth.authUser?.name}</div>
        ) : (
          <h1>not authenticated</h1>
        )}
        <button onClick={auth.logout}>logout</button>
        <button onClick={() => auth.login(FAKE_USER_LOGIN)}>login</button>
      </div>
    );
  };

  it("AuthContext values and events", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const loginButton = screen.getByText(/login/i);
    const logout = screen.getByText(/logout/i);

    expect(screen.getByText(/not authenticated/i)).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    await user.click(loginButton);
    expect(screen.getByText(FAKE_USER_LOGIN.name)).toBeInTheDocument();

    await user.click(logout);
    expect(screen.getByText(/not authenticated/i)).toBeInTheDocument();
  });

  it("useAuth custom hook needs context", async () => {
    try {
      render(<TestComponentUsingHook />);
    } catch (e) {
      expect(e.message).toBe("useAuthUser must be inside a Auth Provider with a value");
    }
  });

  it("useAuth custom hook", async () => {
    const user = userEvent.setup();
    const TestComponentUsingHook = () => {
      const auth = useAuthUser();

      return (
        <div>
          {auth.authUser.isAuthenticated ? (
            <div role="user">{auth.authUser?.name}</div>
          ) : (
            <h1>not authenticated</h1>
          )}
          <button onClick={auth.logout}>logout</button>
          <button onClick={() => auth.login(FAKE_USER_LOGIN)}>login</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponentUsingHook />{" "}
      </AuthProvider>,
    );

    const loginButton = screen.getByText(/login/i);
    const logout = screen.getByText(/logout/i);

    expect(screen.getByText(/not authenticated/i)).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    await user.click(loginButton);
    expect(screen.getByText(FAKE_USER_LOGIN.name)).toBeInTheDocument();

    await user.click(logout);
    expect(screen.getByText(/not authenticated/i)).toBeInTheDocument();
    expect(mockedPush).toHaveBeenCalledWith("/");
  });
});
