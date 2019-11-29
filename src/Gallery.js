// https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Adventurers&fields=Id,Name
import React from 'react';
import { Link } from 'react-router-dom';
import { characterList, dragonList, weaponList } from './fbx';

export class CharacterIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const wikiURL = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Adventurers&fields=Id,VariationId,FullName';
        const request = new Request(wikiURL, {
            method: 'get',
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'credentials': "include"
            },
        });
        fetch(request).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let newxIdMap = {};
                    for (let d of data.cargoquery) {
                        const id = d.title.Id;
                        const vid = parseInt(d.title.VariationId) >= 10 ? d.title.VariationId : `0${d.title.VariationId}`;
                        const n = d.title.FullName;
                        newxIdMap[`c${id}_${vid}`] = n;
                    }
                    this.setState({ idMap: newxIdMap });
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }
    findName(fn) {
        if (this.state.idMap !== undefined && this.state.idMap.hasOwnProperty(fn)) {
            return this.state.idMap[fn];
        } else {
            return fn;
        }
    };
    render() {
        return (
            <div>
                {
                    characterList.map(fn => {
                        let name = this.findName(fn);
                        if (fn.startsWith('c100007')) {
                            return (<li><Link to={`/${fn}/0`}>Notte</Link></li>)
                        }
                        return (
                            <ul style={{ float: "left", width: "15%" }} key={fn}>
                                <li><Link to={`/${fn}/0`}>{name}</Link></li>
                                <li><Link to={`/${fn}/1`}>{name} Walk</Link></li>
                                <li><Link to={`/${fn}/2`}>{name} Bob</Link></li>
                                {/* <li><Link to={`/${fn}/2`}>{fn} Dead</Link></li> */}
                            </ul>)
                    })
                }
            </div >
        )
    }
}

export class DragonIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const wikiURL = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Dragons&fields=BaseId,VariationId,FullName';
        const request = new Request(wikiURL, {
            method: 'get',
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'credentials': "include"
            },
        });
        fetch(request).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let newxIdMap = {};
                    for (let d of data.cargoquery) {
                        const id = d.title.BaseId;
                        const vid = parseInt(d.title.VariationId) >= 10 ? d.title.VariationId : `0${d.title.VariationId}`;
                        const n = d.title.FullName;
                        newxIdMap[`d${id}_${vid}`] = n;
                    }
                    this.setState({ idMap: newxIdMap });
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }
    findName(fn) {
        if (this.state.idMap === undefined) {
            return fn;
        } else if (this.state.idMap.hasOwnProperty(fn)) {
            return this.state.idMap[fn];
        } else if (fn.length > 10 && this.state.idMap.hasOwnProperty(fn.substring(0, 10))) {
            return `${this.state.idMap[fn.substring(0, 10)]}${fn.substring(10, 13)}`;
        } else {
            return fn;
        }
    }
    render() {
        return (
            <div>
                {
                    dragonList.map(fn => {
                        return (
                            <div style={{ float: "left", width: "15%" }} key={fn}>
                                <Link to={`/${fn}`}>{this.findName(fn)}</Link>
                            </div>)
                    })
                }
            </div >
        )
    }
}

export class WeaponIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const wikiURL = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Weapons&fields=BaseId,VariationId,WeaponName,Rarity,Type,ElementalType';
        const request = new Request(wikiURL, {
            method: 'get',
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'credentials': "include"
            },
        });
        fetch(request).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let newxIdMap = {};
                    for (let d of data.cargoquery) {
                        const id = d.title.BaseId;
                        const vid = parseInt(d.title.VariationId) >= 10 ? d.title.VariationId : `0${d.title.VariationId}`;
                        const wt = d.title.ElementalType === 'None' ? `${d.title.Rarity}★ ${d.title.Type}` : `${d.title.Rarity}★ ${d.title.ElementalType} ${d.title.Type}`;
                        const n = [`${d.title.WeaponName}`, wt];
                        newxIdMap[`w${id}_${vid}`] = n;
                    }
                    this.setState({ idMap: newxIdMap });
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }
    findName(fn) {
        if (this.state.idMap !== undefined && this.state.idMap.hasOwnProperty(fn)) {
            return this.state.idMap[fn];
        } else {
            return [fn, 'Unknown'];
        }
    };
    render() {
        return (
            <div>
                {
                    weaponList.map(fn => {
                        let name = this.findName(fn);
                        return (
                            <ul style={{ float: "left", width: "15%" }} key={fn}>
                                <li>{name[1]}</li>
                                <li><Link to={`/${fn}`}>{name[0]}</Link></li>
                            </ul>)
                    })
                }
            </div >
        )
    }
}