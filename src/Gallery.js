// https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Adventurers&fields=Id,Name
import React from 'react';
import { Link } from 'react-router-dom';
import fbxIdx from './fbx/index.json';

export function CharacterIndex() {
    return (
        <div>
            {
                Object.keys(fbxIdx.c).map(fn => {
                    let nwt = fbxIdx.c[fn];
                    let win = (nwt.win !== null && nwt.win.length > 10) ? 'wins' : 'win';
                    return (
                        <div style={{ float: "left", width: "15%", margin: 5 }} key={fn}>
                            <div>{nwt.name}</div>
                            <Link to={`/${fn}`}>{fn}</Link> <br />
                            <Link to={`/${fn}/cmn+CMN_MWM_03`}>Bob</Link> <Link to={`/${fn}/cmn+CMN_MWM_01`}>Walk</Link> <Link to={`/${fn}/cmn+CMN_MWM_02`}>Run</Link> {nwt.win !== null && <Link to={`/${fn}/${win}+${nwt.win}`}>Win</Link>}
                        </div>)
                })
            }
        </div >
    )
}

export function DragonIndex() {
    return (
        <div>
            {
                Object.keys(fbxIdx.d).map(fn => {
                    let name = fbxIdx.d[fn];
                    return (
                        <div style={{ float: "left", width: "15%" }} key={fn}>
                            <div>{name}</div>
                            <Link to={`/${fn}`}>{fn}</Link>
                        </div>)
                })
            }
        </div >
    )
}