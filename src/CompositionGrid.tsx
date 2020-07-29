/** @jsx jsx */

import {useState} from 'react';
import {jsx, css} from '@emotion/core';
import compTree from './compTree.json';

type Props = {
    onExit: (char: string) => void
    id: string
}

type CompositionTree = {
    [key: string]: string | CompositionTree
};

const gridStyle = css`
    display: grid;
    grid-template-columns: 1fr 3fr 2fr 1fr;
    grid-auto-rows: auto;
    position: absolute;
    border: 1px solid black;
    background: #cccccc;
`;

const charPathStyle = css`
    height: 24px;
    font-size: 16px;
`;

const outputChar = css`
    height: 32px;
    background: #ffffff;
    font-size: 22px;
    grid-column: -1;
`;

const childMap = css`
    grid-row: 2;
`;

export default function CompositionGrid(props: Props) {
    const [char, setChar] = useState<string>('');
    const [sequence, setSequence] = useState<string[]>([]);
    const [tree, setTree] = useState<CompositionTree>(compTree);
    const [parentTree, setParentTree] = useState<CompositionTree>(compTree);

    console.log(char, sequence, tree);

    return <div 
      id={props.id}
      css={gridStyle} 
      tabIndex={-1}
      onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            props.onExit(char)
          } else if (ev.key === 'Backspace' && sequence.length > 0) {
            console.log('bksp');
            setSequence(sequence.slice(0, sequence.length - 1));
            setTree(parentTree);
          } else if (ev.key in tree) {
            console.log(ev.key, tree[ev.key]);
            if (typeof tree[ev.key] === 'string') {
                setChar( tree[ev.key] as string );
            } else if (typeof tree[ev.key] === 'object') {
                setSequence(sequence.concat([ev.key]));
                setTree( tree[ev.key] as CompositionTree );
            }
          } else if (ev.key+'+' in tree) {
                console.log('key');
                setSequence(sequence.concat([ev.key]));
                setParentTree(tree);
                setTree(tree[ev.key+'+'] as CompositionTree);
            }
          }
      }
    >
        <div id="characters">
            {sequence.map((ch) => <span css={charPathStyle}>{ch}</span>)}
            <div css={outputChar}>{char}</div>
        </div>
        <div id="children" css={childMap}>
            {
                Object.entries(tree).map(
                    ([key, value]) => {
                        if (typeof value === 'object' && '$desc' in value)
                            return <div key={key}>{key}:{value['$desc']}</div>
                        else if (typeof value === 'object') 
                            return <div key={key}>{key}</div>
                        else
                            return <div key={key}>{key}:{value}</div>
                    }
                )
            }
        </div>
    </div>;
}