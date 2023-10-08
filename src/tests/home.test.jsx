// src/tests/Home.spec.js
import { render, screen } from "@testing-library/react";
import { Home } from "../pages/Home";

jest.mock("../services/api", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('Home Page', () => {
  let originalLocalStorage;

  beforeEach(() => {
    // Mock do localStorage para evitar problemas com o localStorage em testes
    originalLocalStorage = { ...global.localStorage };
    global.localStorage = {
      setItem: jest.fn(),
    };
  });

  afterEach(() => {
    // Restaurar o localStorage original após cada teste
    global.localStorage = originalLocalStorage;
    jest.clearAllMocks();
  });

  it('renders Dentistas disponíveis heading', async () => {
    render(<Home />);
    const heading = await screen.findByText('Dentistas disponíveis');
    expect(heading).not.toBeNull();
  });

});
