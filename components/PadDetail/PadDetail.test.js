import { screen } from "@testing-library/dom";

import { render } from "test-helpers/index";

import PadDetail from "./index";

describe("PadDetail Component", () => {
  it("should show the correct content", () => {
    const TEST_CONTENT = "test";

    render(<PadDetail content={TEST_CONTENT} />);

    expect(screen.getByText(TEST_CONTENT)).toBeInTheDocument();
  });

  it("should show the correct when is masked", () => {
    const TEST_CONTENT = "test";
    const EXPECTED_RESULT = "****";

    render(<PadDetail maskContent content={TEST_CONTENT} />);

    expect(screen.getByText(EXPECTED_RESULT)).toBeInTheDocument();
  });
});
