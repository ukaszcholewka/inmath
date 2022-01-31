import { ASTNumberWithUnit, ASTOperator, ASTBraket, Operators, Brackets, ASTTypes, ASTBody } from './interfaces'

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
    const isFloat = /[\.]|[,]/g.test(value);
    const isInt = !isFloat;
    const isUnit = /[a-zA-Z]+$/.test(value)
    const unit = !isUnit ? {} : {
        unit: /[a-zA-Z]+$/.exec(value)![0]
    }

    return {
        type: ASTTypes.NUMEBR_WITH_UNIT,
        value,
        isFloat,
        isInt,
        isUnit,
        ...unit
    }
}