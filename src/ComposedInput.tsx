import React, { useState, useRef } from 'react';

import CompositionGrid from './CompositionGrid';

type Props = {
    inputProps?: {}
    key: string
};

export default function ComposedInput(props: Props) {

    const [gridMode, setGridMode] = useState(false);
    const [value, setValue] = useState('');
    const [id] = useState(
      Math.floor(Math.random()*1000000).toString(36)
    );
    const input = useRef<HTMLInputElement>(null);

    const onChangeValue = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (ev.currentTarget.value != null) setValue(ev.currentTarget.value)
    }

    return <div
        onKeyUp={(ev) => {
            if (ev.keyCode === 229) {
                // if we're using our own IME, ignore this
                return;
            }
            if (ev.key === props.key && ev.altKey) {
                setGridMode(true);
                setTimeout( () => document.getElementById('compositionGrid')?.focus(), 10);
            }
        }}
    >
        {
            gridMode ? <CompositionGrid
                id='compositionGrid'
                onExit={(char) => {
                    if (input.current != null) {                    
                        const array = Array.from(value);
                        const start = input.current.selectionStart ?? 0;
                        const end = input.current.selectionEnd ?? 0;
                        console.log( start, end );
                        array.splice( start, end-start, char );
                        setValue(array.join(''));
                        setTimeout(()=> input.current?.setSelectionRange(start+1, start+1), 10);
                    }
                    setGridMode(false);
                    setTimeout( ()=>document.getElementById(id)?.focus(), 10);
                }}
            /> : null
        }
        <input
            {...props.inputProps}
            id = {id}
            value={value}
            onInput={onChangeValue}
            ref={input}
        />
        </div>;

}

ComposedInput.defaultProps = {
    key: '\\'
};