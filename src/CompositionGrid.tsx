/** @jsx jsx */

import React, {useState} from 'react';
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
    position: absolute;
    border: 1px solid black;
    background: #cccccc;
    font-size: 16px;
`;

const rowHeader = css`
    background: #ffffff;
    border: 1px solid #444444;
`;

export default function CompositionGrid(props: Props) {
    const [sequence, setSequence] = useState<string[]>([]);
    const [tree, setTree] = useState<CompositionTree>(compTree);
    const [parentTree, setParentTree] = useState<CompositionTree>(compTree);

    const az = <React.Fragment><tr key={'az-low'}>
            <th css={rowHeader}>a-z</th>
            <td>Lowercase letters</td>
        </tr>
        <tr key={'az-up'}>
            <th css={rowHeader}>A-Z</th>
            <td>Uppercase letters</td>
        </tr></React.Fragment>;    

    return <div 
      id={props.id}
      css={gridStyle} 
      tabIndex={-1}
      onKeyUp={(ev) => {
          if (ev.key === 'Backspace' && sequence.length > 0) {
            setSequence(sequence.slice(0, sequence.length - 1));
            setTree(parentTree);
          } else if (ev.key in tree) {
            if (typeof tree[ev.key] === 'string') {
                props.onExit( tree[ev.key] as string );
            } else if (typeof tree[ev.key] === 'object') {
                setSequence(sequence.concat([ev.key]));
                setTree( tree[ev.key] as CompositionTree );
            }
          } else if (ev.key+'+' in tree) {
                setSequence(sequence.concat([ev.key]));
                setParentTree(tree);
                setTree(tree[ev.key+'+'] as CompositionTree);
            }
          }
      }
    >
        <table id="children">
            {
                Object.entries(tree).map(
                    ([key, value]) => {
                        if (key === '$desc') return null;
                        if (typeof value === 'object' && '$desc' in value) {                   
                            if (key === value['$desc']) return null;
                            return <tr key={key}>
                                <th css={rowHeader}>{key}</th>
                                <td>{value['$desc']}</td>
                            </tr>
                        } else if (typeof value === 'object') 
                            return <tr key={key}><th css={rowHeader}>{key}</th></tr>
                        else
                            return <tr key={key}><th css={rowHeader}>{key}</th><td>{value}</td></tr>
                    }
                )
            }
            {sequence.length === 0 ? az : null}
        </table>
    </div>;
}