import { IInputVariables } from 'zeebe-node';
import { addition, subtraction } from './tools';

const addOrSubtractTwoNumber = (processVariables: IInputVariables): number => {
    const xNumber = processVariables?.x;
    const yNumber = processVariables?.y;
    const action = processVariables?.action;

    if (action === 'addition') return addition(xNumber, yNumber);
    if (action === 'subtraction') return subtraction(xNumber, yNumber);
    throw new Error('action is not defined to "addition" or "subtraction"');
};

export default addOrSubtractTwoNumber;
