import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import { render } from "test-helpers/index";
import { Routes } from "types";

import InsufficientFoundsModal from "./index";

const mockedOnClose = jest.fn();
const mockedPush = jest.fn();
let props;

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockedPush,
  })),
}));

beforeEach(() => {
  props = {
    onClose: mockedOnClose,
    isOpen: true,
  };
});

describe("InsufficientFoundsModal component", () => {
  it("should render and call actions properly", async () => {
    const user = userEvent.setup();

    render(<InsufficientFoundsModal {...props} />);

    const checkBalanceButton = screen.getByRole("button", { name: /check balance/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const otherAmountButton = screen.getByRole("button", { name: /other amount/i });

    await user.click(checkBalanceButton);
    expect(mockedPush).toHaveBeenCalledWith(Routes.BALANCE);
    expect(mockedOnClose).toHaveBeenCalled();

    await user.click(otherAmountButton);
    expect(mockedPush).toHaveBeenCalledWith(Routes.OTHER);
    expect(mockedOnClose).toHaveBeenCalled();

    await user.click(cancelButton);
    expect(mockedOnClose).toHaveBeenCalled();
  });
});
