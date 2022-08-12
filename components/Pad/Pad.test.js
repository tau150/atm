import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { render } from "test-helpers/index";

import Pad from "./index";

let props;
const mockedOnClickPadButton = jest.fn();

describe("Pad component", () => {
  beforeEach(() => {
    props = {
      onClickPadButton: mockedOnClickPadButton,
      enterButtonDisabled: true,
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render properly", () => {
    render(<Pad {...props} />);
    expect(screen.getByRole("button", { name: "0" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "1" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "2" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "3" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "4" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "5" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "6" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "7" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "8" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "9" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Enter" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Enter" })).toBeDisabled();
  });

  it("Buttons click should call the correct function", async () => {
    const user = userEvent.setup();

    props.enterButtonDisabled = false;
    render(<Pad {...props} />);

    const button0 = screen.getByRole("button", { name: "0" });
    const button1 = screen.getByRole("button", { name: "1" });
    const button2 = screen.getByRole("button", { name: "2" });
    const button3 = screen.getByRole("button", { name: "3" });
    const button4 = screen.getByRole("button", { name: "4" });
    const button5 = screen.getByRole("button", { name: "5" });
    const button6 = screen.getByRole("button", { name: "6" });
    const button7 = screen.getByRole("button", { name: "7" });
    const button8 = screen.getByRole("button", { name: "8" });
    const button9 = screen.getByRole("button", { name: "9" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    const enterButton = screen.getByRole("button", { name: "Enter" });

    await user.click(button0);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("0");

    await user.click(button1);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("1");

    await user.click(button2);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("2");

    await user.click(button3);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("3");

    await user.click(button4);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("4");

    await user.click(button5);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("5");

    await user.click(button6);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("6");

    await user.click(button7);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("7");

    await user.click(button8);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("8");

    await user.click(button9);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("9");

    await user.click(deleteButton);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("Delete");

    await user.click(enterButton);
    expect(mockedOnClickPadButton).toHaveBeenCalledWith("Enter");
  });

  it("Enter button should do nothing if is disabled", async () => {
    const user = userEvent.setup();

    render(<Pad {...props} />);
    const enterButton = screen.getByRole("button", { name: "Enter" });

    await user.click(enterButton);
    expect(mockedOnClickPadButton).not.toHaveBeenCalled();
  });
});
