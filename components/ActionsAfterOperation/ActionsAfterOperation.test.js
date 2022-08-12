import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import { AuthProvider } from "contexts/AuthContext";
import { render } from "test-helpers/index";
import { Routes } from "types";

import ActionsAfterOperation from "./index";

const login = jest.fn();
const logout = jest.fn();
const authUser = {
  document: 23232323,
  id: 1,
  accountNumber: "241234-234234",
  isAuthenticated: true,
  name: "Santi",
};

const mockedPush = jest.fn();

jest.mock("contexts/AuthContext", () => ({
  ...jest.requireActual("contexts/AuthContext"),
  useAuthUser: jest.fn().mockImplementation(() => ({
    authUser,
    login,
    logout,
  })),
}));

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockedPush,
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ActionsAfterOperation component", () => {
  it("should render and call actions properly", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider value={{}}>
        <ActionsAfterOperation />{" "}
      </AuthProvider>,
    );

    const yesButton = screen.getByText(/yes/i);
    const noButton = screen.getByText(/no/i);

    expect(screen.getByText(/Do you want to make other operation/i)).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();

    await user.click(noButton);
    expect(logout).toHaveBeenCalled();

    await user.click(yesButton);
    expect(mockedPush).toHaveBeenCalledWith(Routes.HOME);
  });
});
