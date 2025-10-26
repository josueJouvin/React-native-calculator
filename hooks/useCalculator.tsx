import { useEffect, useRef, useState } from "react";

enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'x',
    divide = '÷',
}

export const useCalculator = () => {
    const [formula, setFormula] = useState('0');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>(undefined);


    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number])

    useEffect(() => {
        const subResult = calculateResult();
        setPrevNumber(`${subResult}`);
    }, [formula]);

    const cleanCalculator = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');
        lastOperation.current = undefined;
    }

    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''));
        }

        setNumber('-' + number);
    }

    const deleteLast = () => {
        let currentSing = ''
        let temporalNumber = number;

        if (number.includes('-')) {
            currentSing = '-';
            temporalNumber = number.substring(1);
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSing + temporalNumber.slice(0, -1));
        }

        setNumber('0');
    }

    const setLastNumber = () => {
        result()

        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        }

        setPrevNumber(number)
        setNumber('0');
    }


    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }
    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }
    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateResult = () => {
        const [firstValue, operator, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        if (operator === Operator.add) return num1 + num2;
        if (operator === Operator.subtract) return num1 - num2;
        if (operator === Operator.multiply) return num1 * num2;
        if (operator === Operator.divide) {
            if (num2 === 0) return 'Error';
            return num1 / num2;
        }

        throw new Error('Operación no válida');
    }

    const result = () => {
        const result = calculateResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
    }

    const buildNumber = (numberString: string) => {
        if (number.includes(".") && numberString === ".") return;

        if (number.startsWith("0") || number.startsWith("-0")) {
            if (numberString === ".") {
                return setNumber(number + numberString);
            }

            if (numberString === "0" && number.includes(".")) {
                return setNumber(number + numberString);
            }

            if (numberString !== "0" && !number.includes(".")) {
                return setNumber(numberString);
            }

            if (numberString === "0" && !number.includes(".")) {
                return;
            }
        }
        setNumber(number + numberString);
    };


    return {
        formula,
        number,
        prevNumber,
        cleanCalculator,
        buildNumber,
        toggleSign,
        deleteLast,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResult,
        result
    }

}