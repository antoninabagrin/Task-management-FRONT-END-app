import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:8080',
  }),
}));

describe('SignIn', () => {
  test('SignIn render', () => {
    render(<SignIn />);
  });
});
