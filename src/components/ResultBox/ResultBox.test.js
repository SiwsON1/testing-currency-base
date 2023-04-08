import ResultBox from './ResultBox';
import { render } from "@testing-library/react";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';

  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    const testCases = [
      { amountPLN: '100.00',amountUSD:'28.57'},
      { amountPLN: '20.00',amountUSD:'5.71'},
      { amountPLN: '200.00',amountUSD:'57.14'},
      { amountPLN: '345.00',amountUSD:'98.57'},
  ];
  for (const testObj of testCases) {
  
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount = {parseFloat(testObj.amountPLN)} />);

      const resultField = screen.getByTestId('resultDiv');

      expect(resultField).toHaveTextContent(
        `PLN ${testObj.amountPLN} = $${parseFloat(testObj.amountUSD)}`
      );
      // unmount component
      cleanup();
    });
  }
  const testCases1 = [
    { amountPLN: '350.00',amountUSD:'100.00'},
    { amountPLN: '70.00',amountUSD:'20.00'},
    { amountPLN: '700.00',amountUSD:'200.00'},
    { amountPLN: '1,207.50',amountUSD:'345.00'},
];

  for (const testObj of testCases1) {
  
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount = {parseFloat(testObj.amountUSD)} />);

      const resultField = screen.getByTestId('resultDiv');

      expect(resultField).toHaveTextContent(
        `$${testObj.amountUSD} = PLN ${testObj.amountPLN}`
      );
        // unmount component
        cleanup();
    });
  }
  it('should render proper info about conversion when USD -> USD', () => {
    render(<ResultBox from="USD" to="USD" amount = {100} />);

    const resultField = screen.getByTestId('resultDiv');

    expect(resultField).toHaveTextContent('$100.00 = $100');
  });
  it('should render proper info about conversion when PLN -> PLN', () => {
    render(<ResultBox from="PLN" to="PLN" amount = {100} />);

    const resultField = screen.getByTestId('resultDiv');

    expect(resultField).toHaveTextContent('PLN 100.00 = PLN 100');
  });
  it('should render proper info when input is (-)', () => {
    render(<ResultBox from="PLN" to="USD" amount = {-100} />);

    const resultField = screen.getByTestId('resultDiv');

    expect(resultField).toHaveTextContent('Wrong value...');
  });
});