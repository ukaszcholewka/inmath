import AST from '../AST'
import NPU from '../NPU'

export interface IOptions {
    onEnter?: boolean;
    onBlur?: boolean;
}

const DEFAULT_OPTIONS: IOptions = {
    onEnter: false,
    onBlur: true
}

export default class InMath {
    private static AST = AST;
    private static NPU = NPU;
    private _options: IOptions;
    
    public constructor (
        private _input: HTMLInputElement, 
        options: IOptions = {}
    ) {
        this._options = {...DEFAULT_OPTIONS, ...options}
        this._events();
    }

    private _events() {
        const { onEnter, onBlur } = this._options

        if (onBlur)
            this._input.addEventListener('blur', this._exec)
        
        if (!onEnter)
            return;
        
        this._input.addEventListener('keyup', ({ key }) => {
            if (key === 'Enter')
                this._exec() 
        })
    }

    private _exec() {
        if (!this._input)
            return;

        const { value } = this._input

        if (!value || value.trim() === '')
            return;

        const ast = new InMath.AST(value)
        const result = new InMath.NPU(ast.exec())
    }
}