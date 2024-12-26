import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound, { NotFoundProps } from "./NotFound";

describe("NotFound Component", () => {
  const defaultProps: NotFoundProps = {
    type: "repository",
    message: "The repository you are looking for does not exist.",
  };

  it("renders correctly with provided props", () => {
    render(<NotFound {...defaultProps} />);

    // Check for the main heading
    const heading = screen.getByRole("heading", {
      name: /Oops! No repository was found/i,
    });
    expect(heading).toBeInTheDocument();

    // Check for the message
    const message = screen.getByText(
      /The repository you are looking for does not exist./i
    );
    expect(message).toBeInTheDocument();

    // Check for the logo
    const logo = screen.getByAltText("GitGet logo"); 
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/GitGet-simplified.svg");
  });

  it("displays the correct type in the heading", () => {
    render(<NotFound {...defaultProps} />);
    const heading = screen.getByRole("heading", {
      name: /oops! no repository was found/i,
    });
    expect(heading).toHaveTextContent("Oops! No repository was found.");
  });

  it("displays the correct message", () => {
    render(<NotFound {...defaultProps} />);
    const message = screen.getByText(
      /the repository you are looking for does not exist./i
    );
    expect(message).toHaveTextContent(
      "The repository you are looking for does not exist."
    );
  });

  it("renders the logo image with the correct `src`", () => {
    render(<NotFound {...defaultProps} />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "/GitGet-simplified.svg");
    expect(logo).toHaveAttribute("class", "w-24 2xs:max-md:w-16");
  });

  it("renders a different heading and message for different props", () => {
    const newProps: NotFoundProps = {
      type: "user",
      message: "The user you are looking for could not be found.",
    };
    render(<NotFound {...newProps} />);

    // Check for the updated heading
    const heading = screen.getByRole("heading", {
      name: /oops! no user was found/i,
    });
    expect(heading).toHaveTextContent("Oops! No user was found.");

    // Check for the updated message
    const message = screen.getByText(
      /the user you are looking for could not be found./i
    );
    expect(message).toHaveTextContent(
      "The user you are looking for could not be found."
    );
  });
});
