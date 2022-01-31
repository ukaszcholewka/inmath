export enum ASTTypes {
    MATH = 'Math',
    NUMEBR_WITH_UNIT = 'NumberWithUnit',
    NUMBER = 'Number',
    OPERATOR = 'Operator',
    BRAKET = 'Braket',
    WHITE = 'White'
}

export type Operators = '+' | '-' | '*' | '/' | '%' | '^'
export type Brackets = '(' | ')'

export interface ASTMath {
    type: ASTTypes.MATH;
    body: ASTNode[];
    parent: null
}

export interface ASTNumberWithUnit {
    type: ASTTypes.NUMEBR_WITH_UNIT;
    value: string;
    isInt: boolean;
    isFloat: boolean;
    unit?: string;
    isUnit: boolean;
}

export interface ASTOperator {
    type: ASTTypes.OPERATOR;
    value: Operators;
}

export interface ASTBraket {
    type: ASTTypes.BRAKET;
    value: Brackets;
    body: ASTNode[]
    parent: ASTBody
}

export type ASTNode = ASTNumberWithUnit | ASTOperator | ASTBraket
export type ASTBody = ASTBraket | ASTMath