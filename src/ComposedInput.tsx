import React, {useState } from 'react';

import CompositionGrid from './CompositionGrid';

type Props = {
}

export default function ComposedInput(props: Props) {

    const [gridMode, setGridMode] = useState(false);
    const [value, setValue] = useState('');
    const [id] = useState(
      Math.floor(Math.random()*1000000).toString(36)
    );

    const onChangeValue = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (ev.currentTarget.value != null) setValue(ev.currentTarget.value)
    }

    return <div
        onKeyUp={(ev) => {
            if (ev.keyCode === 229) {
                // if we're using our own IME, ignore this
                return;
            }
            if (ev.key === '\\' && ev.altKey) {
                setGridMode(true);
                setTimeout( () => document.getElementById('compositionGrid')?.focus(), 10);
            }
        }}
    >
        {
            gridMode ? <CompositionGrid
                id='compositionGrid'
                onExit={(char) => {
                    setGridMode(false);
                    setValue(value + char);
                    setTimeout( ()=>document.getElementById(id)?.focus(), 10);
                }}
            /> : null
        }
        <input
            id = {id}
            value={value}
            onInput={onChangeValue}
        />
        </div>;

}