import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('check SignUp render', () => {
  render(<SignUp />);
  const joinButton = screen.getByTestId('joinButton');
  expect(joinButton).toBeDisabled();
});
