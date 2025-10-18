import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Applications from "./Applications";
import { useApplications } from "./api/useApplications";
import { vi } from "vitest";

vi.mock("./api/useApplications");

vi.mock("./SingleApplication", () => {
  return { default: (props: any) => <div>Single: {props.application.id}</div> };
});

vi.mock("./ui/Button/Button", () => {
  return {
    Button: (props: any) => (
      <button disabled={props.disabled} onClick={props.onClick}>
        {props.children}
      </button>
    ),
  };
});

const mockedUseApplications = useApplications as unknown as any;

beforeEach(() => {
  vi.resetAllMocks();
});

test("shows loading state", () => {
  mockedUseApplications.mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    error: null,
    fetchNextPage: vi.fn(),
    isFetchingNextPage: false,
  });

  render(<Applications />);
  expect(screen.getByText(/Loading applications.../i)).toBeInTheDocument();
});

test("shows error state with message", () => {
  mockedUseApplications.mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    error: { message: "Network failure" },
    fetchNextPage: vi.fn(),
    isFetchingNextPage: false,
  });

  render(<Applications />);
  expect(
    screen.getByText(/Error loading applications: Network failure/i)
  ).toBeInTheDocument();
});

test("renders applications and calls fetchNextPage on Load More", () => {
  const fetchNextPage = vi.fn();
  mockedUseApplications.mockReturnValue({
    data: { pages: [{ items: [{ id: "1" }, { id: "2" }] }] },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage,
    isFetchingNextPage: false,
  });

  render(<Applications />);

  expect(screen.getByText("Single: 1")).toBeInTheDocument();
  expect(screen.getByText("Single: 2")).toBeInTheDocument();

  const btn = screen.getByRole("button", { name: /Load More/i });
  fireEvent.click(btn);
  expect(fetchNextPage).toHaveBeenCalled();
});

test("disables Load More when fetching next page", () => {
  mockedUseApplications.mockReturnValue({
    data: { pages: [{ items: [{ id: "1" }] }] },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: vi.fn(),
    isFetchingNextPage: true,
  });

  render(<Applications />);
  const btn = screen.getByRole("button", { name: /Load More/i });
  expect(btn).toBeDisabled();
});
