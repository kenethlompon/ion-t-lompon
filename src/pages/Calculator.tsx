import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
  };

  const calculate = () => {
    const secondOperand = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = parseFloat(firstOperand) + secondOperand;
        break;
      case '-':
        result = parseFloat(firstOperand) - secondOperand;
        break;
      case '*':
        result = parseFloat(firstOperand) * secondOperand;
        break;
      case '/':
        result = parseFloat(firstOperand) / secondOperand;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setFirstOperand('');
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    if (firstOperand === '') {
      setFirstOperand(displayValue);
    } else if (!waitingForSecondOperand) {
      calculate();
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>

          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="calculator-container">
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <div className="row">
            <IonButton onClick={() => inputDigit('7')}>7</IonButton>
            <IonButton onClick={() => inputDigit('8')}>8</IonButton>
            <IonButton onClick={() => inputDigit('9')}>9</IonButton>
            <IonButton onClick={() => handleOperator('/')}>/</IonButton>
          </div>
          <div className="row">
            <IonButton onClick={() => inputDigit('4')}>4</IonButton>
            <IonButton onClick={() => inputDigit('5')}>5</IonButton>
            <IonButton onClick={() => inputDigit('6')}>6</IonButton>
            <IonButton onClick={() => handleOperator('*')}>*</IonButton>
          </div>
          <div className="row">
            <IonButton onClick={() => inputDigit('1')}>1</IonButton>
            <IonButton onClick={() => inputDigit('2')}>2</IonButton>
            <IonButton onClick={() => inputDigit('3')}>3</IonButton>
            <IonButton onClick={() => handleOperator('-')}>-</IonButton>
          </div>
          <div className="row">
            <IonButton onClick={() => inputDigit('0')}>0</IonButton>
            <IonButton onClick={inputDecimal}>.</IonButton>
            <IonButton onClick={clearDisplay}>C</IonButton>
            <IonButton onClick={() => handleOperator('+')}>+</IonButton>
          </div>
          <div className="row">
            <IonButton onClick={calculate}>=</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calculator;
