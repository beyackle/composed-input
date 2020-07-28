import React, {useState} from 'react';
import {css} from '@emotion/core';

import compTree from './compTree.json';

type Props = {
    onExit: (char: string) => void
    id: string
}

type CompositionTree = {
    [key: string]: string | CompositionTree
};

const gridStyle = css`
    border: 1px solid black;
    background: #cccccc;
`;

const charPathStyle = css`
    font-size: 16px;
`;

const outputChar = css`
    font-size: 24px;
`;

const childMap = css`
    display: grid;
`;

export default function CompositionGrid(props: Props) {
    const [char, setChar] = useState<string>('');
    const [sequence, setSequence] = useState<string[]>([]);
    const [tree, setTree] = useState<CompositionTree>(compTree);
    const [parentTree, setParentTree] = useState<CompositionTree>(compTree);

    return <div 
      id={props.id}
      css={gridStyle} 
      tabIndex={-1}
      onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            props.onExit(char)
          } else if (ev.key === 'Backspace' && sequence.length > 0) {
            setSequence(sequence.slice(0, sequence.length - 1));
            setTree(parentTree);
          } else if (ev.key in tree) {
            if (typeof tree[ev.key] === 'string') {
                setChar( tree[ev.key] as string );
            }
          } else if (ev.key+'+' in tree) {
                setSequence(sequence.concat([ev.key]));
                setParentTree(tree);
                setTree(tree[ev.key] as CompositionTree);
            }
          }
      }
    >
        <div id="characters">
            {sequence.map((ch) => <span css={charPathStyle}>{ch}</span>)}
            <div css={outputChar}>{char}</div>
        </div>
        <div id="children" css={childMap}>

        </div>
    </div>;
}