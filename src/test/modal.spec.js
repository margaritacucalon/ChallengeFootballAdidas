import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Modal } from "../components/Shared/Modal";

describe("Modal", () => {
  it("should render modal with children", () => {
    const { queryByText } = render(
      <Modal>
        <p>message</p>
      </Modal>
    );
    expect(queryByText("message")).toBeTruthy();
  });

  it("should call onClose", () => {
    const close = jest.fn();
    const { getByTestId } = render(<Modal onClose={close} />);
    const button = getByTestId("modalCloseButton");
    fireEvent.click(button);
    expect(close).toHaveBeenCalled();
  });
});
