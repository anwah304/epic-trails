import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Guides from "../components/Guides";
import guideReducer from "../features/GuideSlice";


// Mock Navbar
vi.mock("../components/Navbar", () => ({
  default: () => <div>Navbar</div>,
}));


// Mock Footer
vi.mock("../components/Footer", () => ({
  default: () => <div>Footer</div>,
}));


describe("Guides Component Test...", () => {

  let store;

  beforeEach(() => {

    store = configureStore({
      reducer: {
        guide: guideReducer,
      },

      preloadedState: {
        guide: {
          guides: [
            {
              _id: "1",
              name: "Ahmed",
              specialty: "Mountain Hiking",
              phone: "12345678",
              email: "ahmed@test.com",
              image: "test.jpg",
            },
          ],
        },
      },
    });

  });

  it("Must render guide information correctly", () => {

    render(
      <Provider store={store}>
        <Guides />
      </Provider>
    );

    expect(screen.getByText("OUR GUIDES")).toBeInTheDocument();

    expect(screen.getByText("AHMED")).toBeInTheDocument();

    expect(screen.getByText("Mountain Hiking")).toBeInTheDocument();

    expect(screen.getByText("12345678")).toBeInTheDocument();

    expect(screen.getByText("ahmed@test.com")).toBeInTheDocument();

  });

});