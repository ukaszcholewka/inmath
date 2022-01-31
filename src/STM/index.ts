export default class STM {
    private _factor = 0
    private _value = 0n;

    public constructor (value: string) {
        this._value = BigInt(value)
    }

    public get result(): string {
        return this._result()
    }

    public add = (value: string) => {
        const bInt = BigInt(value);
        this._value += bInt
        return this._result()
    }

    public subtract = (value: string) => {
        const bInt = BigInt(value);
        this._value -= bInt
        return this._result()
    }

    public multiply = (value: string) => {
        const bInt = BigInt(value);
        this._value *= bInt
        return this._result()
    }

    public divide = (value: string) => {
        const bInt = BigInt(value);
        this._value += bInt
        return this._result()
    }

    private _result = (): string => {
        return `${this._value}`
    }
}

// TODO: Factor ;/