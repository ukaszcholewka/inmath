import { ASTTypes, ASTMath, Operators, Brackets, ASTNode, ASTBody, ASTBraket } from './interfaces'
import { astBraket, astOperator, astNumberWithUnit, bracketsOpen, bracketsClose } from './constants'

export default class AST {
    private _index = 0;
    private _ast: ASTMath = {
        type: ASTTypes.MATH,
        body: [],
        parent: null
    }
    private _parent: ASTBody = this._ast

    public constructor (private _str: string) {
        this.exec()
    }

    public exec = () => {
        let i = 0

        while (this._index < this._str.length) {    
            const { type, value } = this._parsePart()

            if (type === ASTTypes.BRAKET) {
                this._parseBracket(value as Brackets)
            }

            if (type === ASTTypes.NUMEBR_WITH_UNIT) {
                this._parent.body.push(astNumberWithUnit(value))
            }

            if (type === ASTTypes.OPERATOR) {
                this._parent.body.push(astOperator(value as Operators))
            }

            if (i++ > 1337) {
                throw new Error('Stuck in infinite loop')
            }
        }

        console.log(this._ast)
    }

    private _parseBracket = (value: Brackets) => {
        if (bracketsOpen.includes(value)) {
            const node = astBraket(value, this._parent)
            this._parent.body.push(node)
            this._parent = node
            return;
        }

        if (bracketsClose.includes(value)) {
            this._parent = this._parent.parent!
            return;
        }
    }

    private _parsePartSingle = (fn: RegExp, str: string, type: ASTTypes) => {
        const fragment = fn.exec(str)!
        this._index += fragment[0].length

        return {
            type,
            value: fragment[0]
        }
    }

    private _parsePart = () => {
        const { isNumberWithOrWithoutUnit, isOperator, isBracket, isWhite } = this.rules
        const str = this._str.slice(this._index)

        if (isWhite.test(str))
            return this._parsePartSingle(isWhite, str, ASTTypes.WHITE)

        if (isNumberWithOrWithoutUnit.test(str))
            return this._parsePartSingle(isNumberWithOrWithoutUnit, str, ASTTypes.NUMEBR_WITH_UNIT)

        if (isOperator.test(str))
            return this._parsePartSingle(isOperator, str, ASTTypes.OPERATOR)

        if (isBracket.test(str))
            return this._parsePartSingle(isBracket, str, ASTTypes.BRAKET)

        throw new Error(`Error parsing value at char: ${this._index} in: \n${this._sumError()}`)
    }

    private get rules() {
        return {
            isNumberWithOrWithoutUnit: /^\d+[\.|,]?\d+[a-zA-Z]*|^\d+[a-zA-Z]*/,
            isNumber: /^\d+[\.|,]?\d+/,
            isUnit: /^[a-zA-Z]+/,
            isOperator: /^[\+\-\*\/\^\%]/,
            isBracket: /^[(){}\[\]]/,
            isWhite: /^\s+/
        }
    }

    private _sumError = () => {
        return `${this._str}\n${''.padStart(this._index, ' ')}^`
    }
}