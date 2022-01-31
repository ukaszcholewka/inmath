import AST from '../AST'

export interface IOptions {
    onEnter?: boolean;
}

const DEFAULT_OPTIONS: IOptions = {
    onEnter: false
}

export default class InMath {
    private static AST = AST;
    private _options: IOptions;
    
    public constructor (
        private _input: HTMLInputElement, 
        options: IOptions = {}
    ) {
        this._options = {...DEFAULT_OPTIONS, ...options}
        this._events();
    }

    private _events() {
        const { onEnter } = this._options

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

        new InMath.AST(value)
    }
}