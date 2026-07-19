import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Button } from "../Button";
import { Placeholder } from "../Placeholder";
import { Modal, type ModalSize } from "./Modal";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";
import { ModalMessage } from "./ModalMessage";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  args: { open: false },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ size = "small", danger = false }: { size?: ModalSize; danger?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader title="title" caption="description" />
        <ModalBody>
          <Placeholder />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={danger ? "danger" : "primary"} onClick={() => setOpen(false)}>
            {danger ? "Delete" : "Confirm"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const Default: Story = { render: () => <Demo /> };
export const Medium: Story = { render: () => <Demo size="medium" /> };
export const Large: Story = { render: () => <Demo size="large" /> };
export const Danger: Story = { render: () => <Demo danger /> };

function MessageDemo({ type }: { type: "success" | "error" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {type}</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="title" caption="description" />
        <ModalMessage type={type}>dialogue message</ModalMessage>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={type === "error" ? "danger" : "primary"} onClick={() => setOpen(false)}>
            {type === "error" ? "Delete" : "Confirm"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const SuccessMessage: Story = { render: () => <MessageDemo type="success" /> };
export const ErrorMessage: Story = { render: () => <MessageDemo type="error" /> };
