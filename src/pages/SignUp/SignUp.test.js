import { getByTestId, render, screen } from '@testing-library/react';
import SignUp from './SignUp';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: 'localhost:8080',
  }),
}));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: () => ({
//     pathname: 'localhost:8080',
//   }),
// }));

describe('SignUp', () => {
  test('SignUp render', () => {
    render(<SignUp />);
    const signUp = screen.getByTestId('signUp');
    expect(signUp).toBeTruthy();

    const joinButton = screen.getByTestId('joinButton');
    expect(joinButton).toBeDisabled();

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();

    const email = screen.getByTestId('required-email');
    expect(email).toBeRequired();

    const firstName = screen.getByTestId('required-firstName');
    expect(firstName).toBeRequired();

    const lastName = screen.getByTestId('required-lastName');
    expect(lastName).toBeRequired();

    const username = screen.getByTestId('required-username');
    expect(username).toBeRequired();

    const password = screen.getByTestId('required-password');
    expect(password).toBeRequired();

    const confirmPassword = screen.getByTestId('required-confirmPassword');
    expect(confirmPassword).toMatchSnapshot();
    userEvent.type(confirmPassword, 'Hey');
    screen.queryByRole('');
    expect(confirmPassword).toMatchSnapshot();
  });
});
