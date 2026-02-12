import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "@/features/job-filters/FilterBar";
import { BENEFIT_OPTIONS } from "@/features/job-search-filters/config/benefits";
import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/programmingLanguages";
import { SPOKEN_LANGUAGE_OPTIONS } from "@/features/job-search-filters/config/spokenLanguages";

let replaceMock = vi.fn();
let params = new URLSearchParams("");

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => params,
}));

describe("FilterBar", () => {
  beforeEach(() => {
    replaceMock = vi.fn();
    params = new URLSearchParams("");
  });

  it("updates the URL when a region is selected", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: /location/i })[0]);
    await user.click(screen.getByLabelText("Europe"));

    expect(replaceMock).toHaveBeenCalledWith("/?region=europe", { scroll: false });
  });

  it("renders all benefit options", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: /benefits/i })[0]);

    BENEFIT_OPTIONS.forEach((benefit) => {
      expect(screen.getByLabelText(benefit.label)).toBeInTheDocument();
    });
  });

  it("renders Profession and Programming Language in the correct order", () => {
    render(<FilterBar />);
    const professionButton = screen.getAllByRole("button", {
      name: /profession/i,
    })[0];
    const languageButton = screen.getAllByRole("button", {
      name: /tech stack/i,
    })[0];
    const spokenButton = screen.getAllByRole("button", {
      name: /^languages$/i,
    })[0];
    const locationButton = screen.getAllByRole("button", { name: /location/i })[0];

    expect(
      professionButton.compareDocumentPosition(languageButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      languageButton.compareDocumentPosition(spokenButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      spokenButton.compareDocumentPosition(locationButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps only one popover open at a time", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: /location/i })[0]);
    expect(screen.getByText("Regions")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /salary/i })[0]);
    expect(screen.queryByText("Regions")).not.toBeInTheDocument();
    expect(screen.getByText("Presets")).toBeInTheDocument();
  });

  it("renders all programming languages", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(
      screen.getAllByRole("button", { name: /tech stack/i })[0],
    );

    PROGRAMMING_LANGUAGE_OPTIONS.forEach((language) => {
      expect(screen.getByLabelText(language.label)).toBeInTheDocument();
    });
  });

  it("renders all spoken languages", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(
      screen.getAllByRole("button", { name: /^languages$/i })[0],
    );

    SPOKEN_LANGUAGE_OPTIONS.forEach((language) => {
      expect(screen.getByLabelText(language.label)).toBeInTheDocument();
    });
  });

  it("updates the URL when a sort option is selected", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();
    const sortButtons = screen.getAllByRole("button", { name: /sort/i });

    await user.click(sortButtons[0]);
    await user.click(screen.getByRole("menuitem", { name: /highest paid/i }));

    expect(replaceMock).toHaveBeenCalledWith("/?sort=highest_paid", {
      scroll: false,
    });
  });

  it("clears sort from query params", async () => {
    params = new URLSearchParams("sort=highest_paid");
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(screen.getAllByLabelText("Clear sort")[0]);

    expect(replaceMock).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("keeps the mobile language list scrollable", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);

    await user.click(screen.getByRole("button", { name: /open languages mobile filter/i }));
    const modal = screen.getByRole("dialog", { name: "Languages" });
    const scrollContainer = modal.querySelector(".max-h-72");

    expect(scrollContainer).toBeInTheDocument();

    modalRoot.remove();
  });

  it("closes the popover on outside click and selection", async () => {
    render(<FilterBar />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: /benefits/i })[0]);
    expect(screen.getByRole("checkbox", { name: "Equity" })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("checkbox", { name: "Equity" })).toBeNull();
  });
});
