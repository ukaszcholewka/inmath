import { ASTNumberWithUnit, ASTOperator, ASTBraket, Operators, Brackets, ASTTypes, ASTBody } from '../interfaces'

export const astBraket = (value: Brackets, parent: ASTBody): ASTBraket => ({
    type: ASTTypes.BRAKET,
    value,
    body: [],
    parent
})

export const astOperator = (value: Operators): ASTOperator => ({
    type: ASTTypes.OPERATOR,
    value
})

export const astNumberWithUnit = (value: string): ASTNumberWithUnit => {
    const valueWithoutUnit = /^\d+[\.|,]?\d+|^\d+/.exec(value)![0].replace(/,/g, '.')
    const isFloat = /[\.]|[,]/g.test(value);
    const isInt = !isFloat;
    const isUnit = /[a-zA-Z]+$/.test(value)
    const unit = !isUnit ? {} : {
        unit: /[a-zA-Z]+$/.exec(value)![0]
    }

    return {
        type: ASTTypes.NUMEBR_WITH_UNIT,
        value: valueWithoutUnit,
        isFloat,
        isInt,
        isUnit,
        ...unit
    }
}

export const bracketsOpen: Brackets[] = ['(', '[', '{']
export const bracketsClose: Brackets[] = [')', ']', '}']

export const brakets: Brackets[] = [...bracketsOpen, ...bracketsClose]
export const operators: Operators[] = ['+', '-', '*', '/', '%', '^']