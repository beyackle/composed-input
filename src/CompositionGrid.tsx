import React, {useState} from 'react';
import {css} from '@emotion/core';

import compTree from './compTree.json';

type Props = {
    onExit: (char: string) => void
    id: string
}

const gridStyle = css`
    border: 1px solid black;
`;

export default function CompositionGrid(props: Props) {
    const [sequence, setSequence] = useState<string>('🆒');

    console.log(compTree);

    return <div 
      id={props.id}
      css={gridStyle} 
      tabIndex={-1}
      onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            props.onExit(sequence);
        }
      }}>
        Composition Grid
    </div>;
}