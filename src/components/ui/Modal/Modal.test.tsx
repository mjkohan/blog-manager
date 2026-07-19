import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "./Modal";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";
import { ModalMessage } from "./ModalMessage";

function renderModal(props: { onClose?: () => void; closable?: boolean } = {}) {
  return render(
    <Modal open onClose={props.onClose}>
      <ModalHeader
        title="Delete article"
        caption="This cannot be undone"
        closable={props.closable}
      />
      <ModalBody>Body content</ModalBody>
      <ModalFooter>
        <button type="button">Cancel</button>
      </ModalFooter>
    </Modal>,
  );
}

describe("Modal", () => {
  it("renders header, body and footer content", () => {
    renderModal();
    expect(screen.getByRole("heading", { name: "Delete article" })).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("labels the dialog with the title", () => {
    renderModal();
    const heading = screen.getByRole("heading", { name: "Delete article" });
    const dialog = heading.closest("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("close button calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderModal({ onClose });
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("hides the close button when closable is false", () => {
    renderModal({ closable: false });
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("applies success message styling", () => {
    render(<ModalMessage type="success">Saved</ModalMessage>);
    const message = screen.getByText("Saved");
    expect(message.previousSibling).toHaveClass("bg-success-bg1");
  });
});
