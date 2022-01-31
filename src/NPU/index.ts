// Node Parser Unit

import { ASTMath, ASTBody, ASTNode, ASTTypes, Operators } from '../interfaces';
import { astNumberWithUnit } from '../AST/constants'

export default class NPU {
    private static MVE: Operators[][] = [['^'], ['*', '/'], ['+', '-']]
    private _deepestParent: ASTBody | null = null;
    private _deepestParentIndex = 0

    public constructor (private _ast: ASTMath) {
        this._exec()
    }

    private _exec = () => {
        const node = this._findDeepestParent()
        this._isOperatorFirst(node)
        console.log(this._ast)
        const MVNIndex = this._findMVE(node)

        if (node.body.length === 0 || MVNIndex === null)
            node.parent?.body.filter((child) => child !== node)

        if (node.body.length === 1) {
            const index = node.parent?.body.findIndex((child) => child === node)
            node.parent!.body[index!] = astNumberWithUnit(node.body[MVNIndex!].value)
        }

        if (node.body.length === 2 || !this._isValidMathEQ(node, MVNIndex!))
            throw new Error('Non valid equation')

        // TODO: Loop this boiii
    }

    private _findDeepestParent = (ast: ASTBody = this._ast, depth = 0): ASTBody => {

        if (depth > this._deepestParentIndex) {
            this._deepestParentIndex = depth;
            this._deepestParent = ast;
        }

        ast.body.forEach((node) => {
            if (node.hasOwnProperty('body'))
                this._findDeepestParent(node as ASTBody, depth + 1)

        })

        return this._deepestParent || ast;
    }

    private _isOperatorFirst = (node: ASTBody) => {
        if (node.body[0].type === ASTTypes.OPERATOR)
            node.body.unshift(astNumberWithUnit('0'))
    }

    private _findMVE = (node: ASTBody): number | null => {

        for (let operators of NPU.MVE) {
            for (let index in node.body) {
                const { type, value } = node.body[index]
                if (type === ASTTypes.OPERATOR && operators.includes(value as Operators))
                    return parseInt(index)
            }
        }

        return null
    }

    private _isValidMathEQ = (node: ASTBody, index: number) => {
        try {
            if (
                node.body[index - 1].type === ASTTypes.NUMEBR_WITH_UNIT &&
                node.body[index + 1].type === ASTTypes.NUMEBR_WITH_UNIT
            ) return true;

            return false
        } catch {
            return false
        }
    }
} 