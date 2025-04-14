import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FieldCurrency from "./FieldCurrency";

describe("FieldCurrency Component", () => {
  const user = userEvent.setup();
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renderiza corretamente com valor inicial", () => {
    render(<FieldCurrency value={0} onChange={mockOnChange} />);

    expect(screen.getByRole("textbox")).toHaveValue("0,00");
    expect(screen.getByText("R$")).toBeInTheDocument();
  });

  test("formata entrada de dígitos corretamente", async () => {
    render(<FieldCurrency value={0} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "123456");

    expect(input).toHaveValue("1.234,56");
    expect(mockOnChange).toHaveBeenLastCalledWith(1234.56);
  });

  test("remove zeros à esquerda na formatação", async () => {
    render(<FieldCurrency value={0} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "00123456");

    expect(input).toHaveValue("1.234,56");
    expect(mockOnChange).toHaveBeenLastCalledWith(1234.56);
  });

  test("permite apagar caracteres", async () => {
    render(<FieldCurrency value={1234.56} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "{backspace}{backspace}");
    expect(input).toHaveValue("12,34");
    expect(mockOnChange).toHaveBeenLastCalledWith(12.34);
  });

  test("bloqueia caracteres não numéricos", async () => {
    render(<FieldCurrency value={0} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "abc!@#");
    expect(input).toHaveValue("0,00");
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test("mantém formatação ao perder o foco", async () => {
    render(<FieldCurrency value={0} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "123456");
    fireEvent.blur(input);
    expect(input).toHaveValue("1.234,56");
  });

  test("atualiza quando o valor prop muda", async () => {
    const { rerender } = render(
      <FieldCurrency value={0} onChange={mockOnChange} />,
    );
    const input = screen.getByRole("textbox");

    rerender(<FieldCurrency value={56.78} onChange={mockOnChange} />);
    expect(input).toHaveValue("56,78");
  });
});
